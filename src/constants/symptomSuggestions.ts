export const SYMPTOM_SUGGESTIONS = [
  'Fever',
  'Headache',
  'Cough',
  'Chest pain',
  'Anxiety',
] as const;

export type SymptomSuggestion = (typeof SYMPTOM_SUGGESTIONS)[number];

export function suggestionToMessage(suggestion: SymptomSuggestion): string {
  return `I have ${suggestion.toLowerCase()}`;
}
