import { VideoLecture } from '../types';

export const VIDEO_LECTURES: VideoLecture[] = [
  {
    id: 'vid-transformers-matrix',
    title: 'Visualizing Self-Attention in Transformers: The Matrix Math',
    instructor: 'Dr. Elena Rostova · Principal Research Scientist',
    duration: '28:40',
    category: 'Deep Learning',
    thumbnail: '/src/assets/images/course_deep_learning_nlp_1791012110663.jpg',
    overview: 'Step frame-by-frame through token embeddings, Query/Key dot products, softmax scaling, and value aggregation with animated matrix visualizers.',
    chapters: [
      { time: '00:00', title: 'Why Recurrent Neural Networks hit a memory bottleneck' },
      { time: '05:15', title: 'Query, Key, and Value geometric interpretations' },
      { time: '13:40', title: 'Scaled Dot-Product and the sqrt(d_k) factor' },
      { time: '20:10', title: 'Multi-Head Attention: subspace specialization' },
      { time: '25:30', title: 'Writing the forward pass in PyTorch' }
    ],
    keyTakeaways: [
      'Self-attention compute complexity scales quadratically O(N^2) with context length without sparse or flash kernels.',
      'Dividing by sqrt(d_k) prevents extreme softmax gradient saturation as dot products grow large in high dimensions.',
      'Multiple attention heads allow the model to simultaneously track syntactic agreement, coreference, and semantic tone.'
    ],
    pythonCodeSample: `import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    weights = F.softmax(scores, dim=-1)
    return torch.matmul(weights, V), weights`
  },
  {
    id: 'vid-backprop-scratch',
    title: 'Backpropagation Explained with Matrix Calculus in Python',
    instructor: 'Marcus Vance · Staff AI Systems Architect',
    duration: '34:15',
    category: 'Neural Networks',
    thumbnail: '/src/assets/images/hero_ai_learning_platform_1791012095240.jpg',
    overview: 'Derive matrix gradients for dense layers from multivariate chain rule, step through backward graph traversal, and verify with finite differences.',
    chapters: [
      { time: '00:00', title: 'The Computational Graph: nodes and tensors' },
      { time: '07:20', title: 'Vector-Jacobian Products (VJPs) vs full Jacobians' },
      { time: '16:00', title: 'Deriving dW and db for Linear layers' },
      { time: '24:50', title: 'Activation derivatives: Sigmoid vs ReLU' },
      { time: '30:15', title: 'Numerical gradient checking in Python' }
    ],
    keyTakeaways: [
      'Reverse-mode automatic differentiation computes all parameter gradients in one single backward sweep O(1).',
      'Forward-mode AD is efficient when input count is much smaller than output count; reverse-mode excels for scalar loss objectives.',
      'Always perform finite-difference gradient checking when implementing custom CUDA or NumPy operations.'
    ],
    pythonCodeSample: `class LinearLayer:
    def __init__(self, in_features, out_features):
        self.W = np.random.randn(in_features, out_features) * 0.01
        self.b = np.zeros((1, out_features))
        
    def forward(self, X):
        self.X = X
        return np.dot(X, self.W) + self.b
        
    def backward(self, d_out, lr=0.01):
        dW = np.dot(self.X.T, d_out)
        db = np.sum(d_out, axis=0, keepdims=True)
        dX = np.dot(d_out, self.W.T)
        self.W -= lr * dW
        self.b -= lr * db
        return dX`
  },
  {
    id: 'vid-vision-convolutions',
    title: 'Deep Convolutions & Real-Time Object Detection Pipelines',
    instructor: 'Prof. Aisha Khan · Computer Vision Lead',
    duration: '26:10',
    category: 'Computer Vision',
    thumbnail: '/src/assets/images/course_computer_vision_1791012123617.jpg',
    overview: 'Explore feature map activations across CNN hierarchies, receptive fields, residual skip connections, and real-time bounding box regression with YOLO.',
    chapters: [
      { time: '00:00', title: 'Spatial locality and translation equivariance' },
      { time: '06:30', title: 'Filter banks: from edges to textures to semantic parts' },
      { time: '14:20', title: 'Residual networks: solving vanishing gradients' },
      { time: '19:45', title: 'One-stage detection: grid cell anchors and IoU loss' },
      { time: '23:30', title: 'Building a webcam tracker with OpenCV' }
    ],
    keyTakeaways: [
      'Convolutions drastically reduce parameters compared to fully connected layers by sharing weights across spatial locations.',
      'Residual skip connections (x + F(x)) ensure unimpeded gradient flow during backpropagation through 100+ deep layers.',
      'Non-Maximum Suppression (NMS) prunes redundant overlapping bounding boxes based on IoU thresholding.'
    ],
    pythonCodeSample: `import cv2
import numpy as np

def detect_edges_sobel(frame_gray):
    grad_x = cv2.Sobel(frame_gray, cv2.CV_64F, 1, 0, ksize=3)
    grad_y = cv2.Sobel(frame_gray, cv2.CV_64F, 0, 1, ksize=3)
    magnitude = np.sqrt(grad_x**2 + grad_y**2)
    return np.uint8(np.clip(magnitude, 0, 255))`
  },
  {
    id: 'vid-autonomous-agents',
    title: 'Building Production AI Agents: LangGraph & MCP Tools',
    instructor: 'Julian Croft · Agentic Systems Architect',
    duration: '31:50',
    category: 'Agentic AI',
    thumbnail: '/src/assets/images/course_generative_agents_1791012143558.jpg',
    overview: 'Architect multi-agent state graphs with cyclic transitions, memory checkpoints, sandboxed tool execution, and guardrail verification.',
    chapters: [
      { time: '00:00', title: 'Why single prompt chains fail in complex workflows' },
      { time: '08:15', title: 'The ReAct cycle: Thought, Action, Observation' },
      { time: '15:40', title: 'LangGraph StateMachine and conditional branching' },
      { time: '22:10', title: 'Integrating Model Context Protocol (MCP) servers' },
      { time: '28:30', title: 'Fault-tolerant error recovery and human interrupts' }
    ],
    keyTakeaways: [
      'Stateful graphs permit cyclic reasoning, allowing agents to inspect tool errors and iteratively retry code execution.',
      'Separating planning agents from tool-execution agents reduces context bloat and hallucination rates.',
      'Always enforce strict typed output schemas using Pydantic to avoid unparseable tool responses.'
    ],
    pythonCodeSample: `from langgraph.graph import StateGraph, END
from typing import TypedDict

class WorkflowState(TypedDict):
    code: str
    test_result: str
    iterations: int

def run_tests(state: WorkflowState):
    # Simulated execution
    return {"test_result": "PASSED" if state["iterations"] > 1 else "FAILED"}

def should_continue(state: WorkflowState):
    return END if state["test_result"] == "PASSED" else "repair_code"`
  }
];
