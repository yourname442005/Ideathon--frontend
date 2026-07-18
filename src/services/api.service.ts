import { API_CONFIG } from '@/config/app.config';
import { Paper } from '@/lib/types';

interface SearchResponse {
  papers: Paper[];
  reasoning: string;
  confidenceScore: number;
  suggestedPrompts: string[];
  graph: {
    nodes: Array<{ id: string; group: number; val: number }>;
    links: Array<{ source: string; target: string; value: number }>;
  };
}

interface SummaryResponse {
  summary: string;
  contributions: string[];
  methodology: string;
  limitations: string;
}

interface InsightsResponse {
  insight: string;
  trajectory: string;
  primaryResearchers: string[];
}

interface DraftAnalysisResponse {
  predictedScore: number;
  titleReview: string;
  executiveCritique: string;
  suggestedKeywords: string[];
  peerQuestions: string[];
  clarityRating: string;
}

interface ChatResponse {
  reply: string;
}

async function apiPost<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function searchPapers(query: string, mode: string): Promise<SearchResponse> {
  return apiPost<SearchResponse>(API_CONFIG.endpoints.search, { query, mode });
}

export async function summarizePaper(title: string, abstract: string): Promise<SummaryResponse> {
  return apiPost<SummaryResponse>(API_CONFIG.endpoints.summarize, { title, abstract });
}

export async function generateInsights(topic: string): Promise<InsightsResponse> {
  return apiPost<InsightsResponse>(API_CONFIG.endpoints.generateInsights, { topic });
}

export async function analyzeDraft(
  title: string,
  abstract: string,
  venue: string,
  authors: string
): Promise<DraftAnalysisResponse> {
  return apiPost<DraftAnalysisResponse>(API_CONFIG.endpoints.analyzeDraft, {
    title,
    abstract,
    venue,
    authors,
  });
}

export async function sendChatMessage(
  messages: Array<{ sender: string; content: string; role: string }>
): Promise<ChatResponse> {
  return apiPost<ChatResponse>(API_CONFIG.endpoints.chatAssistant, { messages });
}
