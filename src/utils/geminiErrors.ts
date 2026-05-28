export function isQuotaError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('429') ||
    message.includes('quota') ||
    message.includes('QuotaFailure') ||
    message.includes('RESOURCE_EXHAUSTED')
  );
}

export function isInvalidApiKeyError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('401') ||
    message.includes('403') ||
    message.includes('API key not valid') ||
    message.includes('API_KEY_INVALID')
  );
}

/** Errors where we should try the next Gemini model instead of stopping. */
export function isRetryableError(error: unknown): boolean {
  if (isInvalidApiKeyError(error)) {
    return false;
  }

  const message = error instanceof Error ? error.message : String(error);

  return (
    isQuotaError(error) ||
    message.includes('404') ||
    message.includes('not found') ||
    message.includes('NOT_FOUND') ||
    message.includes('Unexpected response format') ||
    message.includes('JSON')
  );
}

/** Turns raw Gemini SDK errors into short, user-friendly messages. */
export function getFriendlyGeminiError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);

  if (raw.includes('EXPO_PUBLIC_GEMINI') || raw.includes('API key is missing')) {
    return 'API key is not set. Add EXPO_PUBLIC_GEMINI_API_KEY to your .env file and restart Expo.';
  }

  if (isInvalidApiKeyError(error)) {
    return 'Your Gemini API key is invalid. Check the key in Google AI Studio and update .env.';
  }

  if (isQuotaError(error)) {
    return 'The AI assistant has reached its usage limit. Please try again later or check your Google AI Studio plan.';
  }

  if (raw.includes('Failed to fetch') || raw.includes('Network request failed')) {
    return 'Network error. Check your connection and try again.';
  }

  if (raw.length > 160 || raw.includes('@type') || raw.includes('google.rpc')) {
    return 'Unable to reach the AI assistant right now. Please try again in a moment.';
  }

  return 'Something went wrong. Please try again.';
}
