export type SymptomCheckResult = {
  possibleCauses: string[];
  recommendedSpecialist: string;
  basicPrecautions: string[];
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text?: string;
  result?: SymptomCheckResult;
  isLoading?: boolean;
  error?: string;
  offlineNotice?: string;
};
