import { RoadmapMilestone } from '../types';

export const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    id: 'm1-python-math',
    phaseId: 1,
    phaseName: 'Phase 1: Python Data Stack & Mathematical Core',
    durationWeeks: 4,
    title: 'Numerical Vectorization & Multivariable Calculus',
    summary: 'Master the high-performance Python ecosystem (NumPy, SciPy, Matplotlib) and bridge continuous mathematics with discrete arrays.',
    skills: ['Broadcasting semantics', 'Matrix factorizations (SVD, Eigen)', 'Gradient vectors & chain rule', 'Vectorized benchmark profiling'],
    pythonLibraries: ['numpy', 'scipy', 'matplotlib', 'sympy'],
    deliverables: [
      'Pure-Python linear regression optimizer using analytic normal equation',
      'Numerical gradient checker comparing central difference against analytical derivatives',
      '2D/3D loss landscape visualizer using Matplotlib'
    ],
    projectStarter: {
      name: 'vector_math_engine.py',
      description: 'Zero-dependency matrix operations and automatic numerical differentiation engine.',
      snippet: `import numpy as np

def numerical_gradient(f, x, eps=1e-5):
    """Computes symmetric finite-difference gradient vector."""
    grad = np.zeros_like(x)
    it = np.nditer(x, flags=['multi_index'], op_flags=['readwrite'])
    while not it.finished:
        idx = it.multi_index
        orig_val = x[idx]
        x[idx] = orig_val + eps
        f_plus = f(x)
        x[idx] = orig_val - eps
        f_minus = f(x)
        grad[idx] = (f_plus - f_minus) / (2.0 * eps)
        x[idx] = orig_val
        it.iternext()
    return grad`
    }
  },
  {
    id: 'm2-statistical-ml',
    phaseId: 2,
    phaseName: 'Phase 2: Statistical Modeling & Feature Pipelines',
    durationWeeks: 4,
    title: 'Ensemble Learning, Regularization & Cross-Validation',
    summary: 'Build robust tabular intelligence pipelines with Scikit-learn, XGBoost, and LightGBM with leak-free preprocessing.',
    skills: ['Stratified K-Fold CV', 'L1/L2 Ridge & Lasso shrinkage', 'Histogram gradient boosting', 'SHAP feature attribution'],
    pythonLibraries: ['scikit-learn', 'xgboost', 'lightgbm', 'polars', 'shap'],
    deliverables: [
      'Production Scikit-learn Pipeline with custom Transformers and ColumnTransformer',
      'Bayesian hyperparameter optimization study using Optuna',
      'SHAP summary and partial dependence explainability report'
    ],
    projectStarter: {
      name: 'tabular_pipeline.py',
      description: 'End-to-end classification pipeline with Optuna hyperparameter optimization.',
      snippet: `from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import RobustScaler, OneHotEncoder
from sklearn.ensemble import HistGradientBoostingClassifier

preprocessor = ColumnTransformer(
    transformers=[
        ('num', RobustScaler(), ['feature_1', 'feature_2']),
        ('cat', OneHotEncoder(handle_unknown='ignore'), ['category'])
    ]
)

pipeline = Pipeline([
    ('prep', preprocessor),
    ('model', HistGradientBoostingClassifier(learning_rate=0.08, max_iter=200))
])`
    }
  },
  {
    id: 'm3-deep-learning-pytorch',
    phaseId: 3,
    phaseName: 'Phase 3: Deep Neural Architectures & PyTorch Mastery',
    durationWeeks: 6,
    title: 'Tensors, Autograd, CNNs & Transformer Foundations',
    summary: 'Transition to GPU-accelerated computing with PyTorch, writing custom torch.nn.Modules, loss functions, and mixed-precision loops.',
    skills: ['PyTorch autograd mechanics', 'Convolutional backbones & residual connections', 'Multi-head self-attention math', 'Distributed training basics'],
    pythonLibraries: ['torch', 'torchvision', 'torchaudio', 'timm', 'einops'],
    deliverables: [
      'Multi-class ResNet classifier trained on CIFAR-10 with data augmentations',
      'Character-level autoregressive GPT from scratch in 200 lines of PyTorch',
      'Custom loss function with gradient clipping and cosine annealing lr scheduler'
    ],
    projectStarter: {
      name: 'custom_attention_layer.py',
      description: 'Clean PyTorch multi-head self-attention module using torch.einsum.',
      snippet: `import torch
import torch.nn as nn
from einops import rearrange

class SelfAttention(nn.Module):
    def __init__(self, d_model=256, n_heads=8):
        super().__init__()
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_k = d_model // n_heads
        self.qkv = nn.Linear(d_model, d_model * 3, bias=False)
        self.out_proj = nn.Linear(d_model, d_model)
        
    def forward(self, x):
        B, N, C = x.shape
        qkv = self.qkv(x)
        q, k, v = rearrange(qkv, 'b n (h d qkv) -> qkv b h n d', h=self.n_heads, qkv=3)
        scores = torch.einsum('b h i d, b h j d -> b h i j', q, k) / (self.d_k ** 0.5)
        attn = torch.softmax(scores, dim=-1)
        out = torch.einsum('b h i j, b h j d -> b h i d', attn, v)
        out = rearrange(out, 'b h n d -> b n (h d)')
        return self.out_proj(out)`
    }
  },
  {
    id: 'm4-genai-agents-mlops',
    phaseId: 4,
    phaseName: 'Phase 4: Production LLMs, Multi-Agent Systems & MLOps',
    durationWeeks: 6,
    title: 'Autonomous Reasoning Loops, RAG & Model Deployment',
    summary: 'Construct resilient enterprise AI applications with LangGraph, vector search engines, structured output schemas, and FastAPI services.',
    skills: ['ReAct agent architecture', 'Hybrid semantic & lexical search', 'Pydantic structured output validation', 'FastAPI async model serving'],
    pythonLibraries: ['langgraph', 'chromadb', 'fastapi', 'pydantic', 'peft'],
    deliverables: [
      'Autonomous Python coding agent capable of multi-step tool execution and test validation',
      'Hybrid RAG system with Reciprocal Rank Fusion and cross-encoder re-ranking',
      'Containerized high-throughput inference API with Docker and streaming SSE'
    ],
    projectStarter: {
      name: 'agentic_executor.py',
      description: 'Autonomous tool-calling loop with typed Pydantic state.',
      snippet: `from pydantic import BaseModel, Field
from typing import List, Dict, Any

class AgentState(BaseModel):
    task: str
    thoughts: List[str] = Field(default_factory=list)
    tool_calls: List[Dict[str, Any]] = Field(default_factory=list)
    completed: bool = False
    final_output: str = ""

def execute_reasoning_step(state: AgentState) -> AgentState:
    # State-transition function evaluated by LangGraph orchestrator
    print(f"[Agent Step] Current task: {state.task}")
    return state`
    }
  }
];
