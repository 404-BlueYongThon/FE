export function getApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
  }
  return url.replace(/\/$/, ''); // strip trailing slash
}

export function getGeminiApiKey(): string {
  const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!key) {
    throw new Error(
      'NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set'
    );
  }
  return key;
}
