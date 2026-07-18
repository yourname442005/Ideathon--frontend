import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { messages = [] } = await request.json();

  let reply = "Integrating LoRA with DPO allows you to fine-tune pre-trained models on specialized human feedback directly, completely bypassing the unstable PPO actor-critic loop. Let's draft a pipeline config for your collaborative team workspace!";

  if (messages.length > 0) {
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";

    if (lastMessage.includes("lora") || lastMessage.includes("rank")) {
      reply = "LoRA (Low-Rank Adaptation) injects trainable rank decomposition matrices into each layer of the Transformer architecture. The key insight is that weight updates during fine-tuning have a low intrinsic rank. By setting rank r=8 with alpha=16, you can achieve comparable performance to full fine-tuning while reducing trainable parameters by over 90%. For your pipeline, I recommend starting with r=8 on query and value projections, then scaling to r=16 if convergence plateaus.";
    } else if (lastMessage.includes("rag") || lastMessage.includes("retrieval")) {
      reply = "For your RAG pipeline, I recommend implementing a hybrid retrieval strategy: combine BM25 sparse retrieval with dense passage retrieval (DPR) using a fine-tuned E5 or BGE embeddings model. Store vectors in a HNSW-indexed database (Pinecone or Qdrant). For the generation phase, use a context window of 4K tokens with a sliding window approach for documents exceeding this limit. This architecture should maintain sub-15ms retrieval latency while maximizing relevance.";
    } else if (lastMessage.includes("dpo") || lastMessage.includes("preference")) {
      reply = "Direct Preference Optimization eliminates the need for a separate reward model by directly optimizing the policy on preference data. The loss function is: L_DPO = -E[log sigmoid(beta * (log(pi(y_w|x)/pi_ref(y_w|x)) - log(pi(y_l|x)/pi_ref(y_l|x))))]. For your implementation, I recommend beta=0.1 for initial training, then annealing to 0.01 for fine-grained alignment. Use a dataset of at least 10K preference pairs for stable convergence.";
    } else if (lastMessage.includes("gnn") || lastMessage.includes("graph")) {
      reply = "For integrating GNNs with your research workspace, consider a Graph Attention Network (GAT) architecture to model relationships between papers, researchers, and concepts. Use message passing with 2-3 layers to capture multi-hop connections. The attention mechanism will naturally weight the most relevant connections. I can help you set up the PyTorch Geometric implementation and define the heterogeneous graph schema.";
    } else if (lastMessage.includes("task") || lastMessage.includes("pipeline") || lastMessage.includes("workflow")) {
      reply = "For your research pipeline, I recommend the following workflow: (1) Literature discovery through semantic search, (2) Paper summarization and key extraction, (3) Knowledge graph construction linking related concepts, (4) Experimental design based on identified gaps, (5) Results validation against established benchmarks. I can help you set up automated monitoring for each stage using our workspace tools.";
    } else {
      reply = "That's an excellent research question. Based on current literature trends and citation analysis, I'd recommend focusing on the intersection of parameter-efficient methods and alignment techniques. The convergence of LoRA-based fine-tuning with DPO optimization represents one of the most promising directions for scalable AI development in 2026. Let me know if you'd like me to elaborate on any specific aspect.";
    }
  }

  return NextResponse.json({ reply });
}
