import { GoogleGenerativeAI } from '@google/generative-ai';

import type { SymptomCheckResult } from '@/types/symptomCheck';
import { getFriendlyGeminiError, isInvalidApiKeyError } from '@/utils/geminiErrors';

// gemini-2.5-flash works on the current API; older 1.5 models often return 404.
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'] as const;

export type AnalyzeSymptomsResponse = {
  result: SymptomCheckResult;
  usedOfflineFallback: boolean;
};

function getApiKey(): string {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Gemini API key is missing. Add EXPO_PUBLIC_GEMINI_API_KEY to your .env file.',
    );
  }

  return apiKey;
}

function buildPrompt(symptoms: string): string {
  return `You are a helpful assistant for a healthcare app. The user shared symptoms.

Respond with ONLY valid JSON (no markdown, no extra text) in this exact format:
{
  "possibleCauses": ["cause 1", "cause 2", "cause 3"],
  "recommendedSpecialist": "specialist name",
  "basicPrecautions": ["precaution 1", "precaution 2", "precaution 3"]
}

Rules:
- Keep answers general and educational, not a diagnosis.
- Use simple language a patient can understand.
- recommendedSpecialist should be one type like "General Physician", "Cardiologist", etc.

User symptoms: ${symptoms}`;
}

function extractJson(text: string): string {
  const cleaned = text.replace(/```json|```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');

  if (start !== -1 && end !== -1 && end > start) {
    return cleaned.slice(start, end + 1);
  }

  return cleaned;
}

function parseGeminiResponse(text: string): SymptomCheckResult {
  const parsed = JSON.parse(extractJson(text)) as SymptomCheckResult;

  if (!parsed.possibleCauses || !parsed.recommendedSpecialist || !parsed.basicPrecautions) {
    throw new Error('Unexpected response format from Gemini.');
  }

  return {
    possibleCauses: parsed.possibleCauses,
    recommendedSpecialist: parsed.recommendedSpecialist,
    basicPrecautions: parsed.basicPrecautions,
  };
}

function getOfflineFallback(symptoms: string): SymptomCheckResult {
  const lower = symptoms.toLowerCase();

  let specialist = 'General Physician';
  if (/(chest|heart|palpitation)/.test(lower)) specialist = 'Cardiologist';
  else if (/(headache|migraine|dizzy|numb)/.test(lower)) specialist = 'Neurologist';
  else if (/(rash|skin|itch)/.test(lower)) specialist = 'Dermatologist';
  else if (/(cough|throat|ear|nose)/.test(lower)) specialist = 'ENT Specialist';
  else if (/(child|baby|infant)/.test(lower)) specialist = 'Pediatrician';

  const possibleCauses = [
    'Symptoms can have many causes, including stress, infection, or dehydration',
    'Lifestyle factors such as sleep, diet, and activity may play a role',
    'A healthcare provider should evaluate persistent or worsening symptoms',
  ];

  if (/(fever|temperature|chills)/.test(lower)) {
    possibleCauses[0] = 'Fever is often linked to viral or bacterial infections';
    possibleCauses[1] = 'Dehydration, fatigue, or recent travel may contribute';
  }

  return {
    possibleCauses,
    recommendedSpecialist: specialist,
    basicPrecautions: [
      'Rest and drink plenty of fluids',
      'Track temperature and symptoms twice daily',
      'Seek urgent care if fever is very high, lasts more than 3 days, or worsens',
    ],
  };
}

async function requestFromModel(
  modelName: string,
  symptoms: string,
): Promise<SymptomCheckResult> {
  const genAI = new GoogleGenerativeAI(getApiKey());
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 512,
    },
  });

  const result = await model.generateContent(buildPrompt(symptoms));
  const responseText = result.response.text();

  return parseGeminiResponse(responseText);
}

export async function analyzeSymptoms(symptoms: string): Promise<AnalyzeSymptomsResponse> {
  for (const modelName of GEMINI_MODELS) {
    try {
      const result = await requestFromModel(modelName, symptoms);
      return { result, usedOfflineFallback: false };
    } catch (error) {
      if (isInvalidApiKeyError(error)) {
        throw new Error(getFriendlyGeminiError(error));
      }
    }
  }

  return {
    result: getOfflineFallback(symptoms),
    usedOfflineFallback: true,
  };
}
