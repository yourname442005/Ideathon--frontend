# API Reference

All API routes are located under `src/app/api/` and use Next.js Route Handlers. All endpoints accept POST requests with JSON bodies and return JSON responses. These are **mock endpoints** that return hardcoded data — no real AI or external services are called.

---

## POST /api/search

**File:** `src/app/api/search/route.ts`
**Purpose:** Semantic search across papers with AI reasoning

### Request

```json
{
  "query": "string — search query (natural language)",
  "mode": "semantic | deep | mapping — search mode"
}
```

### Response

```json
{
  "papers": [
    {
      "id": "string",
      "title": "string",
      "authors": "string",
      "institution": "string",
      "year": "string",
      "journal": "string",
      "abstract": "string",
      "citations": "number",
      "tags": ["string"],
      "pdfUrl": "string",
      "doi": "string"
    }
  ],
  "reasoning": "string — AI explanation of why these papers match",
  "confidenceScore": "number — 0-100 alignment score",
  "suggestedPrompts": ["string — follow-up query suggestions"],
  "graph": {
    "nodes": [
      { "id": "string", "group": "number", "val": "number" }
    ],
    "links": [
      { "source": "string", "target": "string", "value": "number" }
    ]
  }
}
```

### Behavior

- Tokenizes query into lowercase terms
- Scores papers based on term matches in title (+10), tags (+8), authors (+6), abstract (+5)
- Returns papers sorted by score, filtered to score > 0
- Falls back to first 2 papers if no matches
- Returns keyword-specific reasoning for LoRA/PEFT and RAG queries
- Returns a fixed concept graph with 8 nodes and 7 links

### Mock Data

5 papers available: Attention Is All You Need, LoRA, RAG, DPO, GNN Review

---

## POST /api/summarize

**File:** `src/app/api/summarize/route.ts`
**Purpose:** Generate AI summary of a paper

### Request

```json
{
  "title": "string — paper title",
  "abstract": "string — paper abstract"
}
```

### Response

```json
{
  "summary": "string — synthesized paper summary",
  "contributions": ["string — key contribution 1", "string — key contribution 2"],
  "methodology": "string — methodology description",
  "limitations": "string — known gaps and limitations"
}
```

### Behavior

- Ignores input parameters
- Returns fixed mock data regardless of title/abstract
- Summary is generic academic-style text
- Always returns 3 contributions

---

## POST /api/generate-insights

**File:** `src/app/api/generate-insights/route.ts`
**Purpose:** Generate AI insights about a research topic

### Request

```json
{
  "topic": "string — research topic name"
}
```

### Response

```json
{
  "insight": "string — topic analysis insight",
  "trajectory": "string — growth trajectory prediction",
  "primaryResearchers": ["string — researcher 1", "string — researcher 2"]
}
```

### Behavior

- Keyword matching on topic (case-insensitive):
  - **LoRA/PEFT/Adapter**: Returns PEFT-specific insight with 240% growth
  - **RAG/Retrieval**: Returns RAG-specific insight with 310% growth
  - **DPO/Preference/Alignment**: Returns DPO-specific insight with 60% complexity reduction
  - **GNN/Graph**: Returns GNN-specific insight with 45% growth
  - **Default**: Generic deep learning insight with 180% growth

### Keyword Triggers

| Keywords | Topic |
|----------|-------|
| `lora`, `peft`, `adapter` | Parameter-Efficient Fine-Tuning |
| `rag`, `retriev` | Retrieval-Augmented Generation |
| `dpo`, `preference`, `alignment` | Direct Preference Optimization |
| `gnn`, `graph` | Graph Neural Networks |

---

## POST /api/analyze-draft

**File:** `src/app/api/analyze-draft/route.ts`
**Purpose:** AI pre-review analysis of a manuscript draft

### Request

```json
{
  "title": "string — manuscript title",
  "abstract": "string — manuscript abstract",
  "venue": "string — target conference/journal",
  "authors": "string — comma-separated author names"
}
```

### Response

```json
{
  "predictedScore": "number — predicted acceptance score (1-10)",
  "titleReview": "string — evaluation of the title",
  "executiveCritique": "string — abstract critique",
  "suggestedKeywords": ["string — recommended keyword 1"],
  "peerQuestions": ["string — predicted reviewer question 1"],
  "clarityRating": "Good | Excellent"
}
```

### Behavior

- Keyword matching on combined title + abstract (case-insensitive):
  - **LoRA/PEFT/Adapter**: Score 9, Excellent clarity, LoRA-specific questions
  - **RAG/Retrieval/Vector**: Score 8, Good clarity, RAG-specific questions
  - **DPO/Preference/Alignment**: Score 9, Excellent clarity, DPO-specific questions
  - **Default**: Score 8, Good clarity, generic questions

---

## POST /api/chat-assistant

**File:** `src/app/api/chat-assistant/route.ts`
**Purpose:** AI chat assistant for collaborative research

### Request

```json
{
  "messages": [
    {
      "id": "string",
      "sender": "string",
      "avatar": "string",
      "role": "user | ai | team",
      "content": "string",
      "timestamp": "string"
    }
  ]
}
```

### Response

```json
{
  "reply": "string — AI assistant response"
}
```

### Behavior

- Examines the last message content (case-insensitive):
  - **LoRA/Rank**: Detailed LoRA explanation with rank r=8 recommendation
  - **RAG/Retrieval**: RAG pipeline architecture advice
  - **DPO/Preference**: DPO loss function explanation with beta recommendations
  - **GNN/Graph**: GAT architecture integration advice
  - **Task/Pipeline/Workflow**: Research workflow recommendations
  - **Default**: General research direction advice

---

## Error Handling

All API routes use basic error handling:
- Missing required fields fall back to defaults
- No authentication or rate limiting
- No actual AI calls — all responses are mocked
- Client-side errors are caught silently in components

### Client-Side Error Pattern

```typescript
try {
  const response = await fetch("/api/endpoint", { ... });
  const data = await response.json();
  // Use data
} catch {
  // Silent failure — component remains in previous state
}
```

---

## Future API Changes

When integrating a real backend:

1. Replace mock routes with proxy to external API
2. Add authentication headers
3. Add error response handling with proper status codes
4. Add loading states with AbortController for cancellation
5. Add retry logic with exponential backoff
6. Add response caching with SWR/React Query
