import { Paper, Project, Note, Task, Collection, Researcher, FeedItem, NotificationItem } from "./types";

export const INITIAL_PAPERS: Paper[] = [
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
    saved: true,
    bookmarked: false,
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
    saved: true,
    bookmarked: true,
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
    saved: false,
    bookmarked: false,
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
    saved: false,
    bookmarked: false,
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
    saved: false,
    bookmarked: false,
  }
];

export const INITIAL_PROJECTS: Project[] = [
  { id: "pj1", name: "Transformers for Gene Mapping", description: "Applying attention matrix vectors to model biological sequence transcripts.", progress: 68, members: ["Dr. Chen", "Dr. Vance", "You"], papersCount: 4, tasksCount: 3, lastActive: "2 hours ago" },
  { id: "pj2", name: "PEFT LLM Adaptations", description: "Assessing stability bounds of Low-Rank decomposition across large foundational weights.", progress: 85, members: ["Dr. Rivera", "Dr. Chen"], papersCount: 3, tasksCount: 5, lastActive: "Yesterday" }
];

export const INITIAL_NOTES: Note[] = [
  { id: "n1", title: "LoRA Rank Sweeps Notes", content: "Empirical evaluations suggest Rank=8 matrix decomposition prevents gradient saturation during high epoch runs compared to full Rank=16 overrides.", author: "Dr. Sarah Chen", updatedAt: "Today, 11:30 AM" },
  { id: "n2", title: "RAG Evaluation parameters", content: "Local Vector DB retrievals must leverage HNSW indices to maintain sub-12ms latency on dense document blocks.", author: "You", updatedAt: "Yesterday" }
];

export const INITIAL_TASKS: Task[] = [
  { id: "t1", projectId: "pj1", title: "Formulate GNN lookup matrix bounds", status: "todo", assignee: "Dr. Vance", dueDate: "July 20" },
  { id: "t2", projectId: "pj2", title: "Run Rank=8 LoRA LLaMA weights convergence sweep", status: "in-progress", assignee: "Dr. Chen", dueDate: "July 17" },
  { id: "t3", projectId: "pj2", title: "Draft preference model methodology for review", status: "done", assignee: "You", dueDate: "July 12" }
];

export const INITIAL_COLLECTIONS: Collection[] = [
  { id: "c1", name: "Transformers & Attention", description: "Essential foundation papers detailing sequence transduction.", papersCount: 2, isShared: true, isPinned: true, color: "#8B5CF6" },
  { id: "c2", name: "PEFT Adaptation", description: "Efficient parameter fine-tuning on large models.", papersCount: 1, isShared: false, isPinned: true, color: "#3B82F6" }
];

export const INITIAL_RESEARCHERS: Researcher[] = [
  { id: "r1", name: "Dr. Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", institution: "Stanford AI Labs", field: "Transformers & Optimization", followers: 48900, publications: 85, isFollowing: true, bio: "Principal Investigator at Stanford. Researching scalable sequence models and human alignment bounds." },
  { id: "r2", name: "Dr. James Vance", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", institution: "MIT Research Labs", field: "Graph Representation Learning", followers: 12500, publications: 42, isFollowing: true, bio: "Assistant Professor at MIT. Mapping complex relational graphs to deep Transformer systems." },
  { id: "r3", name: "Dr. Marc Andre", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", institution: "Tsinghua Department of Computer Science", field: "Information Retrieval Systems", followers: 29100, publications: 67, isFollowing: false, bio: "Focusing on sparse vs dense vector databases, HNSW index calculations, and real-time retrieval." }
];

export const INITIAL_FEED: FeedItem[] = [
  {
    id: "f1",
    author: {
      name: "Dr. Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      institution: "Stanford University AI Labs",
    },
    action: "published a new discussion note",
    time: "2 hours ago",
    title: "Bridging the gap between RAG context length limits and multi-hop reasoning",
    content: "We just ran a series of benchmarking tests comparing vector similarity lookups to structured graph pathways. The results suggest that semantic search alone misses cross-document structural context. Combining Graph Neural Networks with standard RAG models decreases hallucination rates by up to 34% on complex queries.",
    likes: 42,
    comments: [
      { author: "Marc Andre", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", content: "Very interesting find! How does retrieval latency scale with dense graphs?" }
    ],
    paperId: "p3",
  },
  {
    id: "f2",
    author: {
      name: "Dr. James Vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      institution: "MIT Department Lead",
    },
    action: "shared a workspace citation list",
    time: "5 hours ago",
    title: "Essential readings on PEFT and Direct Alignment for LLM deployment",
    content: "Curated a workspace folder covering Direct Preference Optimization (DPO) alongside parameter-efficient techniques. For resource-constrained teams, combining LoRA with a simple DPO loss function offers a highly stable fine-tuning cycle with near-zero state deviations.",
    likes: 29,
    comments: [],
    paperId: "p2",
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", type: "mention", sender: "Dr. Sarah Chen", content: "tagged you in a comment on 'Retrieval-Augmented Generation'", time: "2 hours ago", read: false },
  { id: "n2", type: "invite", sender: "MIT Research Labs", content: "invited you to collaborate on the 'PEFT Architectures' project", time: "1 day ago", read: false },
  { id: "n3", type: "paper_update", sender: "System Update", content: "'Attention Is All You Need' was cited by 1,200 new publications today", time: "1 day ago", read: true },
  { id: "n4", type: "comment", sender: "Marc Andre", content: "replied to your note on 'LoRA LLM adaptation'", time: "2 days ago", read: true },
];
