import { GlossaryTerm, QuizQuestion } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'backprop',
    term: 'Backpropagation',
    category: 'Deep Learning',
    definition: 'An algorithmic application of the calculus chain rule for computing gradients of loss functions with respect to all internal parameters in a computational graph.',
    mathNotation: 'dL/dw_ij = dL/da_j * da_j/dz_j * dz_j/dw_ij',
    pythonSnippet: `loss.backward()  # PyTorch reverse-mode auto-differentiation
optimizer.step() # Apply parameter updates`,
    practicalTip: 'Always call optimizer.zero_grad() before backward() in PyTorch because gradients accumulate in buffers by default.'
  },
  {
    id: 'attention',
    term: 'Self-Attention Mechanism',
    category: 'LLMs & GenAI',
    definition: 'A mathematical mechanism that calculates dynamic relational weights between every pair of positions in a sequence, creating contextual embeddings without recurrence.',
    mathNotation: 'Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) V',
    pythonSnippet: `attn_scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
attn_weights = torch.softmax(attn_scores, dim=-1)`,
    practicalTip: 'Use FlashAttention-2 or SDPA (torch.nn.functional.scaled_dot_product_attention) to replace vanilla attention with IO-aware fused GPU kernels.'
  },
  {
    id: 'rag',
    term: 'Retrieval-Augmented Generation (RAG)',
    category: 'LLMs & GenAI',
    definition: 'An architectural pattern that enhances large language model prompts by dynamically fetching relevant verified knowledge chunks from external vector indexes.',
    mathNotation: 'Score(q, d) = (u_q · v_d) / (||u_q|| ||v_d||)',
    pythonSnippet: `results = vector_db.query(query_embeddings=[query_vec], n_results=3)
context = "\\n".join([doc for doc in results['documents'][0]])`,
    practicalTip: 'Pair dense vector embeddings with sparse BM25 keyword search using Reciprocal Rank Fusion (RRF) for significantly higher retrieval recall on domain terminology.'
  },
  {
    id: 'overfitting',
    term: 'Overfitting & Generalization Gap',
    category: 'Math & Calculus',
    definition: 'The statistical pathology where a machine learning model memorizes training dataset noise and idiosyncrasies at the expense of performance on unseen test data.',
    mathNotation: 'E_{test}[Loss] >> E_{train}[Loss]',
    pythonSnippet: `model = nn.Sequential(
    nn.Linear(256, 128),
    nn.Dropout(p=0.3), # Stochastically zeros neurons to prevent co-adaptation
    nn.BatchNorm1d(128)
)`,
    practicalTip: 'Monitor both validation loss and train loss curves simultaneously. When train loss continues descending while validation loss plateaus and rebounds, apply early stopping.'
  },
  {
    id: 'quantization',
    term: 'Model Quantization (FP16 / INT8 / INT4)',
    category: 'Infrastructure & MLOps',
    definition: 'Technique that reduces numerical precision of neural network weights and activations from 32-bit floats to lower bit-widths, cutting VRAM requirements and memory bandwidth bounds.',
    mathNotation: 'q = round(x / scale) + zero_point',
    pythonSnippet: `from transformers import BitsAndBytesConfig
bnb_config = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4")`,
    practicalTip: 'Use NormalFloat4 (NF4) quantization when running large language models locally, as it preserves empirical perplexity better than uniform INT4.'
  },
  {
    id: 'iou',
    term: 'Intersection over Union (IoU)',
    category: 'Computer Vision',
    definition: 'A spatial evaluation metric quantifying overlap ratio between predicted bounding box coordinates and ground truth annotations.',
    mathNotation: 'IoU = Area(Box_A ∩ Box_B) / Area(Box_A ∪ Box_B)',
    pythonSnippet: `intersection = max(0, x2 - x1) * max(0, y2 - y1)
union = area_a + area_b - intersection
iou = intersection / union`,
    practicalTip: 'A standard evaluation threshold is IoU >= 0.5 for coarse detection, and IoU >= 0.75 for high-precision robotic placement.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why do Transformers divide Query-Key dot products by the square root of key dimension sqrt(d_k)?',
    options: [
      'To reduce matrix memory footprint in RAM',
      'To prevent the dot products from growing excessively large, which pushes softmax into vanishing gradient saturation regions',
      'To enforce causality and prevent future token look-ahead in generation',
      'To convert complex eigenvalues into real numbers'
    ],
    correctIndex: 1,
    explanation: 'When d_k is large, the variance of dot products scales with d_k. Large magnitude values push the softmax function into regions with near-zero gradients (saturation), paralyzing model training.',
    pythonRelevance: 'In torch.nn.functional.scaled_dot_product_attention, the scale parameter defaults to 1.0 / sqrt(d_k).'
  },
  {
    id: 2,
    question: 'In standard PyTorch training loops, what happens if you forget to call optimizer.zero_grad() between batches?',
    options: [
      'An immediate CUDA out-of-memory exception is raised',
      'Gradients accumulate into the parameter .grad buffers, causing updates to sum multiple batches unintentionally',
      'The learning rate is automatically multiplied by 2',
      'Model weights are reset to their initial Gaussian random states'
    ],
    correctIndex: 1,
    explanation: 'PyTorch is designed to accumulate gradients in the .grad attribute by default (which is useful for gradient accumulation across mini-batches). Without zeroing, step() applies increasingly bloated accumulated gradients.',
    pythonRelevance: 'Always write: optimizer.zero_grad(set_to_none=True) followed by loss.backward() and optimizer.step().'
  },
  {
    id: 3,
    question: 'What is the primary computational benefit of 2D Convolutional layers over Fully Connected layers on high-resolution images?',
    options: [
      'Convolutions guarantee 100% training accuracy in 1 epoch',
      'Sparse interactions and shared parameter weights across all spatial patch positions drastically reduce parameter count',
      'Convolutions bypass backpropagation entirely',
      'They only process black and white images'
    ],
    correctIndex: 1,
    explanation: 'A fully connected layer connecting a 1000x1000 RGB image to 1000 hidden nodes requires 3 billion weights! A 3x3 convolution only needs 27 weights per input channel, utilizing translation equivariance.',
    pythonRelevance: 'torch.nn.Conv2d(in_channels=3, out_channels=64, kernel_size=3, padding=1) shares the 3x3 kernel across all pixels.'
  },
  {
    id: 4,
    question: 'In the ReAct prompting pattern for Autonomous AI Agents, what does the cycle stand for?',
    options: [
      'Recursion, Activation, Testing',
      'Reasoning (Thought), Action (Tool execution), and Observation (Environment feedback)',
      'Real-time Context Optimization',
      'Regression, Classification, and Tensor reduction'
    ],
    correctIndex: 1,
    explanation: 'ReAct combines reasoning traces (Thought) and task-specific actions (e.g., executing Python, querying a database) with observations, allowing models to dynamically plan and recover from errors.',
    pythonRelevance: 'Implemented in LangGraph / LangChain via agent executor loops managing state transitions.'
  }
];
