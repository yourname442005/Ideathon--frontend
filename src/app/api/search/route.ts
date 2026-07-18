import { NextRequest, NextResponse } from "next/server";

const SAMPLE_PAPERS = [
  {
    id: "p1",
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    institution: "Google Brain",
    year: "2017",
    journal: "NeurIPS",
    abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    citations: 124500,
    tags: ["Deep Learning", "NLP", "Transformers", "Attention"],
    pdfUrl: "#",
    doi: "10.48550/arXiv.1706.03762",
  },
  {
    id: "p2",
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Hu et al.",
    institution: "Microsoft Corporation",
    year: "2021",
    journal: "ICLR",
    abstract: "An important paradigm of natural language processing consists of large-scale pre-training on general domain data and adaptation to particular tasks or domains. As we pre-train larger models, full fine-tuning, which retrains all model parameters, becomes less feasible. We propose Low-Rank Adaptation (LoRA), which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture, greatly reducing the number of trainable parameters.",
    citations: 4500,
    tags: ["LLM", "Parameter-Efficient", "Fine-Tuning", "Optimization"],
    pdfUrl: "#",
    doi: "10.48550/arXiv.2106.09685",
  },
  {
    id: "p3",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: "Lewis et al.",
    institution: "Meta AI",
    year: "2020",
    journal: "NeurIPS",
    abstract: "Large pre-trained language models have been shown to store implicit knowledge in their parameters, and achieve state-of-the-art results when fine-tuned on downstream NLP tasks. However, their ability to access and precisely manipulate knowledge is still limited, and hence on knowledge-intensive tasks, their performance lags behind task-specific architectures. We explore Retrieval-Augmented Generation (RAG) models which combine pre-trained parametric and non-parametric memory.",
    citations: 5800,
    tags: ["RAG", "Information Retrieval", "Knowledge Graph", "NLP"],
    pdfUrl: "#",
    doi: "10.48550/arXiv.2005.11401",
  },
  {
    id: "p4",
    title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
    authors: "Rafailov et al.",
    institution: "Stanford University",
    year: "2023",
    journal: "NeurIPS",
    abstract: "While large-scale auto-regressive language models learn extremely well, aligning them with human preferences remains an outstanding challenge. Existing reinforcement learning from human feedback (RLHF) methods rely on training a reward model and then optimizing the policy using PPO, which is complex and unstable. We present Direct Preference Optimization (DPO), a stable, simple, and computationally lightweight algorithm that optimizes language models directly on preferences.",
    citations: 2100,
    tags: ["Alignment", "RLHF", "DPO", "Optimization"],
    pdfUrl: "#",
    doi: "10.48550/arXiv.2305.18290",
  },
  {
    id: "p5",
    title: "Graph Neural Networks: A Review of Methods and Applications",
    authors: "Zhou et al.",
    institution: "Tsinghua University",
    year: "2020",
    journal: "AI Open",
    abstract: "Graphs are extremely general data structures that capture relationships among entities. Recently, there has been a surge of research interest in Graph Neural Networks (GNNs). GNNs extend deep learning methods to non-Euclidean graph data, achieving major breakthroughs in node classification, link prediction, and graph representation. We comprehensively survey current state-of-the-art models and outline future directions.",
    citations: 8900,
    tags: ["Graph Neural Networks", "Representation Learning", "Data Mining"],
    pdfUrl: "#",
    doi: "10.1016/j.aiopen.2021.01.001",
  }
];

const SUGGESTED_PROMPTS = [
  "How does LoRA reduce training parameters in Transformer architectures?",
  "Explain the core mathematical difference between DPO and traditional RLHF",
  "Design a hybrid architecture combining GNNs with RAG systems",
  "Show a timeline of self-attention advancements in sequence transduction",
];

const DEFAULT_GRAPH = {
  nodes: [
    { id: "Attention", group: 1, val: 20 },
    { id: "Transformers", group: 1, val: 18 },
    { id: "LLMs", group: 2, val: 25 },
    { id: "LoRA", group: 2, val: 15 },
    { id: "RAG", group: 3, val: 16 },
    { id: "GNNs", group: 4, val: 14 },
    { id: "Alignment", group: 5, val: 15 },
    { id: "DPO", group: 5, val: 12 },
  ],
  links: [
    { source: "Attention", target: "Transformers", value: 5 },
    { source: "Transformers", target: "LLMs", value: 8 },
    { source: "LLMs", target: "LoRA", value: 6 },
    { source: "LLMs", target: "RAG", value: 5 },
    { source: "LLMs", target: "Alignment", value: 4 },
    { source: "Alignment", target: "DPO", value: 6 },
    { source: "Transformers", target: "GNNs", value: 2 },
  ],
};

export async function POST(request: NextRequest) {
  const { query = "", mode = "semantic" } = await request.json();

  const searchTerms = query.toLowerCase().split(/\s+/);
  let matchedPapers = SAMPLE_PAPERS;

  if (query.trim()) {
    matchedPapers = SAMPLE_PAPERS.map((paper) => {
      let score = 0;
      const titleLower = paper.title.toLowerCase();
      const abstractLower = paper.abstract.toLowerCase();
      const authorsLower = paper.authors.toLowerCase();
      const tagsLower = paper.tags.join(" ").toLowerCase();

      searchTerms.forEach((term: string) => {
        if (titleLower.includes(term)) score += 10;
        if (abstractLower.includes(term)) score += 5;
        if (tagsLower.includes(term)) score += 8;
        if (authorsLower.includes(term)) score += 6;
      });

      return { paper, score };
    })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.paper);

    if (matchedPapers.length === 0) {
      matchedPapers = SAMPLE_PAPERS.slice(0, 2);
    }
  }

  let aiReasoning = "Matches are calculated using standard cosine similarity of document TF-IDF vectors against the query token embeddings.";
  let confidenceScore = 85;
  let recommendedPrompts = SUGGESTED_PROMPTS.slice(0, 3);

  if (query.toLowerCase().includes("lora") || query.toLowerCase().includes("tuning")) {
    aiReasoning = "High similarity detected within PEFT parameters. The selected matrix decompositions allow stable fine-tuning gradients while freezing underlying weights.";
    confidenceScore = 96;
    recommendedPrompts = [
      "What are the latency tradeoffs of LoRA during online inference?",
      "How does LoRA perform compared to prefix tuning in 70B parameters?",
      "Explain direct weight injection of LoRA matrices"
    ];
  } else if (query.toLowerCase().includes("rag") || query.toLowerCase().includes("retrieval")) {
    aiReasoning = "Excellent semantic match on multi-step knowledge retrievers. Combining non-parametric storage (Vector DBs) with parametric text models resolves temporal data limitations.";
    confidenceScore = 92;
    recommendedPrompts = [
      "Explain Hierarchical Navigable Small World (HNSW) graph search in RAG",
      "How do you evaluate RAG chunk alignment using Ragas frameworks?",
      "Compare sparse retrievers (BM25) vs dense passage retrievers (DPR)"
    ];
  }

  return NextResponse.json({
    papers: matchedPapers,
    reasoning: aiReasoning,
    confidenceScore,
    suggestedPrompts: recommendedPrompts,
    graph: DEFAULT_GRAPH,
  });
}
