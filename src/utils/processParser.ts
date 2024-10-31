interface ParsedStep {
  type: 'terminus' | 'process' | 'decision' | 'deliverable';
  text: string;
}

export function parseProcessText(text: string): ParsedStep[] {
  const steps: ParsedStep[] = [];
  const sentences = text.split(/[.!?]/).filter(s => s.trim());

  // Always start with terminus
  steps.push({ type: 'terminus', text: 'Start' });

  sentences.forEach((sentence) => {
    const lower = sentence.toLowerCase().trim();
    
    // Enhanced keyword detection
    if (lower.match(/\b(if|when|check|verify|validate|determine|assess)\b/)) {
      steps.push({ type: 'decision', text: sentence.trim() });
    } else if (lower.match(/\b(output|deliver|generate|produce|create|report)\b/)) {
      steps.push({ type: 'deliverable', text: sentence.trim() });
    } else if (lower.match(/\b(end|finish|complete|terminate)\b/)) {
      steps.push({ type: 'terminus', text: 'End process' });
    } else if (lower.length > 0) {
      steps.push({ type: 'process', text: sentence.trim() });
    }
  });

  // Ensure we end with terminus if not already present
  if (steps[steps.length - 1].type !== 'terminus') {
    steps.push({ type: 'terminus', text: 'End process' });
  }

  return steps;
}