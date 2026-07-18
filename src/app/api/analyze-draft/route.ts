import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title = "", abstract = "", venue = "NeurIPS 2026", authors = "" } = await request.json();

  let predictedScore = 8;
  let titleReview = "The title is highly relevant and descriptive. Integrating structural representations with optimization targets is highly sought-after in contemporary conference tracks.";
  let executiveCritique = "The proposed methodology addresses a critical bottleneck. However, the abstract could benefit from a clearer definition of the baseline models used for comparative speedups and parameter scaling constraints.";
  let suggestedKeywords = ["Gradient Fine-Tuning", "Parameter Adaptation", "Optimization Bounds"];
  let peerQuestions = [
    "What specific empirical baselines are used to validate the convergence speedup assertions?",
    "How does the computational complexity scale with infinite sequence layers?",
    "Does this linear projection maintain precision bounds under extreme low-resource fine-tuning scenarios?"
  ];
  let clarityRating = "Good";

  const contentLower = `${title} ${abstract}`.toLowerCase();
  if (contentLower.includes("lora") || contentLower.includes("peft") || contentLower.includes("adapter")) {
    predictedScore = 9;
    titleReview = "Excellent choice of keywords in title. LoRA and PEFT alignments represent highly saturated and cited directions, giving your manuscript strong baseline visibility.";
    executiveCritique = "The abstract represents a sophisticated understanding of low-rank optimization. Be sure to highlight the comparative wall-clock time saved vs conventional LoRA sweeps to ensure acceptance.";
    suggestedKeywords = ["Low-Rank Adaptation", "PEFT Convergence", "Gradient Projections"];
    peerQuestions = [
      "How do the learned adapters behave under deep quantization bounds?",
      "Have you tested convergence on non-transformer sequence architectures?",
      "Is there a secondary alignment phase necessary for preference tasks?"
    ];
    clarityRating = "Excellent";
  } else if (contentLower.includes("rag") || contentLower.includes("retriev") || contentLower.includes("vector")) {
    predictedScore = 8;
    titleReview = "Clear title targeting. The reference to retrieval frameworks directly aligns with active track directions.";
    executiveCritique = "The abstract outlines a solid architectural flow for semantic indexing. We highly recommend specifying whether the indexing employs flat vectors or hierarchical graphs early in the draft.";
    suggestedKeywords = ["Dense Retrievers", "Context Compression", "Semantic Indexing"];
    peerQuestions = [
      "What is the average retrieval overhead latency during high-density multi-hop queries?",
      "How does chunk-level noise influence the reasoning convergence?",
      "Could this index architecture scale dynamically without rebuilding vectors?"
    ];
    clarityRating = "Good";
  } else if (contentLower.includes("dpo") || contentLower.includes("preference") || contentLower.includes("alignment")) {
    predictedScore = 9;
    titleReview = "Strong title focusing on preference alignment. DPO remains a top-priority research direction for NeurIPS reviewers.";
    executiveCritique = "The abstract presents a well-structured approach to preference optimization. Consider adding quantitative comparison with PPO baselines to strengthen the acceptance case.";
    suggestedKeywords = ["Preference Optimization", "RLHF Alternative", "Reward Modeling"];
    peerQuestions = [
      "How does the algorithm handle distributional shift during preference learning?",
      "What are the theoretical bounds on regret compared to PPO?",
      "Have you evaluated on multi-objective preference scenarios?"
    ];
    clarityRating = "Excellent";
  }

  return NextResponse.json({
    predictedScore,
    titleReview,
    executiveCritique,
    suggestedKeywords,
    peerQuestions,
    clarityRating,
  });
}
