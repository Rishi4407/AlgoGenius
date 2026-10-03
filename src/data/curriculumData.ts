import { LearningTrack } from '../types';

export const CURRICULUM_TRACKS: LearningTrack[] = [
  {
    id: 'deep-learning-nlp',
    title: 'Deep Learning & Transformer Architectures',
    kicker: 'Track 01 · Core Neural Foundations',
    level: 'Intermediate',
    duration: '8 Weeks · 24 Interactive Labs',
    modulesCount: 6,
    description: 'Deconstruct modern foundation models from raw matrix multiplications to multi-head self-attention, backpropagation calculus, and PyTorch training loops.',
    image: '/src/assets/images/course_deep_learning_nlp_1791012110663.jpg',
    coreLibraries: ['PyTorch', 'Hugging Face', 'NumPy', 'Einops'],
    mathFormulas: [
      {
        name: 'Scaled Dot-Product Attention',
        formula: 'Attention(Q, K, V) = softmax(Q · K^T / sqrt(d_k)) · V',
        description: 'Projects tokens into query, key, value spaces to compute contextual pairwise affinities.'
      },
      {
        name: 'Cross-Entropy Loss',
        formula: 'L = -sum(y_i · log(p_i))',
        description: 'Measures divergence between predicted probability distributions and true one-hot targets.'
      },
      {
        name: 'AdamW Optimization',
        formula: 'theta_{t+1} = theta_t - (alpha / (sqrt(v_t) + eps)) · m_t - lambda · theta_t',
        description: 'Adaptive learning rate moment estimations with decoupled L2 weight decay regularization.'
      }
    ],
    syllabus: [
      {
        title: 'Tensors, Autograd & Computational Graphs',
        topics: ['Tensor strides and memory allocation', 'Reverse-mode automatic differentiation', 'Custom PyTorch autograd.Function'],
        pythonFocus: 'torch.autograd, torch.nn.Parameter, forward/backward passes'
      },
      {
        title: 'Self-Attention & Multi-Head Transformers',
        topics: ['Query/Key/Value matrix projections', 'Causal masking for autoregressive generation', 'FlashAttention concepts'],
        pythonFocus: 'Custom TransformerBlock in PyTorch with Einsum'
      },
      {
        title: 'Quantization & Parameter-Efficient Fine-Tuning (PEFT)',
        topics: ['LoRA (Low-Rank Adaptation) math', '4-bit and 8-bit NF4 weight quantization', 'Instruction alignment (DPO & RLHF)'],
        pythonFocus: 'peft, bitsandbytes, trl (Transformer Reinforcement Learning)'
      }
    ],
    capstoneProject: {
      title: 'Custom Mini-Transformer GPT Trained on TinyStories',
      description: 'Build an end-to-end decoder-only transformer from scratch in PyTorch, tokenize a real dataset using BPE, and train with mixed-precision FP16 on GPU.',
      pythonStack: 'Python 3.11+, PyTorch 2.3, Hugging Face Tokenizers, Wandb'
    }
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision & Spatial Intelligence',
    kicker: 'Track 02 · Visual AI Systems',
    level: 'Intermediate',
    duration: '6 Weeks · 18 Interactive Labs',
    modulesCount: 5,
    description: 'Master image convolution filters, deep convolutional backbones (ResNet, ConvNeXt), real-time YOLO object detection, and Latent Diffusion models.',
    image: '/src/assets/images/course_computer_vision_1791012123617.jpg',
    coreLibraries: ['OpenCV', 'Torchvision', 'Albumentations', 'Diffusers'],
    mathFormulas: [
      {
        name: '2D Discrete Convolution',
        formula: '(I * K)(x, y) = sum_m sum_n I(x-m, y-n) · K(m, n)',
        description: 'Slides spatial kernels across pixel arrays to extract edges, gradients, and semantic textures.'
      },
      {
        name: 'Intersection over Union (IoU)',
        formula: 'IoU = Area(B_p cap B_g) / Area(B_p cup B_g)',
        description: 'Quantifies bounding box spatial overlap for object detection evaluation.'
      },
      {
        name: 'Diffusion Denoising Objective',
        formula: 'L_{simple} = E_{t, x_0, eps}[||eps - eps_theta(x_t, t)||^2]',
        description: 'Trains a U-Net to predict Gaussian noise added at timestep t along a forward Markov schedule.'
      }
    ],
    syllabus: [
      {
        title: 'Image Kernels & Feature Extraction',
        topics: ['Sobel, Laplacian, and Gaussian spatial filters', 'Histogram of Oriented Gradients (HOG)', 'Convolutional arithmetic (strides, padding, dilation)'],
        pythonFocus: 'cv2, numpy matrix convolution, torch.nn.Conv2d'
      },
      {
        title: 'Modern Object Detection & Instance Segmentation',
        topics: ['Anchor-free detectors vs YOLO architectures', 'Non-Maximum Suppression (NMS)', 'Feature Pyramid Networks (FPN)'],
        pythonFocus: 'ultralytics YOLO, torchvision.ops.nms'
      },
      {
        title: 'Generative Latent Diffusion & ControlNet',
        topics: ['Variational Autoencoders (VAEs)', 'Classifier-free guidance math', 'Cross-attention text conditioning'],
        pythonFocus: 'diffusers, torch.cuda.amp'
      }
    ],
    capstoneProject: {
      title: 'Real-Time Edge Detection & Multi-Object Visual Tracker',
      description: 'Implement a real-time video inference pipeline tracking multiple objects across camera frames with DeepSORT and custom feature extraction.',
      pythonStack: 'Python 3.11, OpenCV, PyTorch, Ultralytics YOLOv10'
    }
  },
  {
    id: 'generative-agents',
    title: 'Autonomous AI Agents & RAG Architectures',
    kicker: 'Track 03 · Modern Applied AI',
    level: 'Advanced',
    duration: '7 Weeks · 20 Interactive Labs',
    modulesCount: 5,
    description: 'Engineer production-grade LLM orchestrations, semantic vector indexing, multi-agent debate protocols, and function-calling feedback loops.',
    image: '/src/assets/images/course_generative_agents_1791012143558.jpg',
    coreLibraries: ['LangGraph', 'LlamaIndex', 'ChromaDB', 'Pydantic'],
    mathFormulas: [
      {
        name: 'Cosine Similarity',
        formula: 'cos(u, v) = (u · v) / (||u|| · ||v||)',
        description: 'Calculates the directional cosine angle between dense embedding vectors in hyperdimensional semantic space.'
      },
      {
        name: 'Reciprocal Rank Fusion (RRF)',
        formula: 'RRF_Score(d) = sum_{m in M} 1 / (k + rank_m(d))',
        description: 'Combines sparse BM25 keyword rankings with dense semantic vector searches without score normalization bias.'
      },
      {
        name: 'ReAct Loop State Transition',
        formula: 'State_{t+1} = Transition(State_t, Action_t, Observation_t)',
        description: 'Formulates cyclic Thought -> Action -> Tool Observation -> Synthesis reasoning loops.'
      }
    ],
    syllabus: [
      {
        title: 'Dense Embeddings & Vector Databases',
        topics: ['Sentence transformers and embedding spaces', 'HNSW (Hierarchical Navigable Small World) indexing', 'Hybrid search and cross-encoder re-ranking'],
        pythonFocus: 'sentence-transformers, chromadb, qdrant-client'
      },
      {
        title: 'Advanced Retrieval-Augmented Generation (RAG)',
        topics: ['Contextual chunking strategies', 'Parent document retrieval and query expansion', 'Hallucination detection with RAGAS'],
        pythonFocus: 'llama-index, pydantic structured output validation'
      },
      {
        title: 'Multi-Agent Systems & Tool Orchestration',
        topics: ['ReAct framework state machines', 'Model Context Protocol (MCP) tool integration', 'Cyclic graphs with human-in-the-loop'],
        pythonFocus: 'langgraph, pydantic-ai, asyncio streaming'
      }
    ],
    capstoneProject: {
      title: 'Autonomous Research & Code Debugging Agent',
      description: 'Build an autonomous multi-agent system that executes Python scripts in an isolated sandbox, reads terminal tracebacks, queries documentation, and iteratively repairs code.',
      pythonStack: 'Python 3.11+, LangGraph, ChromaDB, OpenAI/Gemini SDK'
    }
  },
  {
    id: 'python-math-foundations',
    title: 'Python for AI: Vector Math & Computational Calculus',
    kicker: 'Track 04 · Foundational Prerequisites',
    level: 'Foundations',
    duration: '4 Weeks · 16 Interactive Labs',
    modulesCount: 4,
    description: 'Transform theoretical math into vectorized NumPy implementations: eigenvalues, matrix decompositions, gradient vectors, and optimization landscapes.',
    image: '/src/assets/images/hero_ai_learning_platform_1791012095240.jpg',
    coreLibraries: ['NumPy', 'SciPy', 'Matplotlib', 'SymPy'],
    mathFormulas: [
      {
        name: 'Gradient Vector',
        formula: 'grad f(x) = [df/dx_1, df/dx_2, ..., df/dx_n]^T',
        description: 'Points in the direction of greatest rate of increase of a scalar-valued multivariable function.'
      },
      {
        name: 'Singular Value Decomposition (SVD)',
        formula: 'A = U · Sigma · V^T',
        description: 'Factorizes any real matrix into orthogonal rotations and diagonal singular scale values.'
      },
      {
        name: 'Multivariate Normal Distribution',
        formula: 'p(x) = (2*pi)^(-k/2) * |Sigma|^(-1/2) * exp(-1/2 * (x-mu)^T * Sigma^(-1) * (x-mu))',
        description: 'Underpins Gaussian mixture models, variational inference, and probabilistic representations.'
      }
    ],
    syllabus: [
      {
        title: 'Vectorized Operations & Broadcasting',
        topics: ['Broadcasting semantics and contiguous memory buffers', 'Vector outer products and matrix multiplications', 'Benchmarking loop vs vectorized latency'],
        pythonFocus: 'numpy.ndarray, np.einsum, memory profiling'
      },
      {
        title: 'Linear Algebra for Machine Learning',
        topics: ['Orthogonality and Gram-Schmidt process', 'Eigenvalues, eigenvectors, and Principal Component Analysis (PCA)', 'Matrix norms (Frobenius, L1, L2)'],
        pythonFocus: 'scipy.linalg, numpy.linalg.svd'
      },
      {
        title: 'Calculus & Convex Optimization',
        topics: ['Jacobian and Hessian matrices', 'Stochastic Gradient Descent vs Newton-Raphson methods', 'Constrained optimization and Lagrange multipliers'],
        pythonFocus: 'scipy.optimize.minimize, automatic numerical differentiation'
      }
    ],
    capstoneProject: {
      title: 'Pure-NumPy Deep Learning Framework from Scratch',
      description: 'Implement linear layers, convolutional layers, Adam optimizer, cross-entropy loss, and autograd node backprop without importing PyTorch or TensorFlow.',
      pythonStack: 'Python 3.11, Pure NumPy, Matplotlib, Jupyter'
    }
  },
  {
    id: 'classical-ml-pipelines',
    title: 'Machine Learning & Production Feature Pipelines',
    kicker: 'Track 05 · Empirical Statistical Models',
    level: 'Foundations',
    duration: '5 Weeks · 15 Interactive Labs',
    modulesCount: 4,
    description: 'Master ensemble learning (XGBoost, LightGBM), statistical feature engineering, bias-variance tradeoff, cross-validation, and production serialization.',
    image: '/src/assets/images/course_deep_learning_nlp_1791012110663.jpg',
    coreLibraries: ['Scikit-Learn', 'XGBoost', 'LightGBM', 'Polars'],
    mathFormulas: [
      {
        name: 'Bias-Variance Decomposition',
        formula: 'E[(y - f_hat(x))^2] = Bias(f_hat(x))^2 + Var(f_hat(x)) + sigma^2',
        description: 'Splits expected generalization error into model underfitting, sensitivity to noise, and irreducible error.'
      },
      {
        name: 'Gradient Boosting Residual Update',
        formula: 'r_{im} = - [d L(y_i, f(x_i)) / d f(x_i)]_{f = f_{m-1}}',
        description: 'Trains successive decision trees to fit pseudo-residuals of the previous ensemble stage.'
      }
    ],
    syllabus: [
      {
        title: 'Exploratory Data Analysis & Blazing-Fast Pipelines',
        topics: ['Target encoding and high-cardinality handling', 'Handling skewed features with Power Transforms', 'Fast tabular manipulation with Polars'],
        pythonFocus: 'polars, sklearn.compose.ColumnTransformer'
      },
      {
        title: 'Tree Ensembles & Gradient Boosting',
        topics: ['Random Forest bagging mechanics', 'Histogram-based gradient boosting algorithms', 'SHAP (Shapley Additive Explanations) interpretability'],
        pythonFocus: 'xgboost, lightgbm, shap'
      }
    ],
    capstoneProject: {
      title: 'High-Frequency Financial Churn & Fraud Prediction System',
      description: 'Build an end-to-end classification pipeline with automated feature selection, hyperparameter tuning via Optuna, and explainability dashboards.',
      pythonStack: 'Python 3.11, Scikit-learn, LightGBM, Optuna, Polars'
    }
  }
];
