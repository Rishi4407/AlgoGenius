import { PythonLabTemplate } from '../types';

export const PYTHON_LAB_TEMPLATES: PythonLabTemplate[] = [
  {
    id: 'backprop-neural-net',
    title: 'Multi-Layer Perceptron & Backpropagation',
    category: 'Neural Networks',
    description: 'Implement forward propagation, loss calculation, and analytical gradient descent in pure vectorized Python.',
    initialCode: `# AlgoGenius Neural Sandbox
# Multi-Layer Perceptron (MLP) trained with Gradient Descent

import numpy as np

def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-np.clip(z, -250, 250)))

def sigmoid_derivative(a):
    return a * (1.0 - a)

# Dataset: Non-linear XOR Problem
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=np.float32)
y = np.array([[0], [1], [1], [0]], dtype=np.float32)

# Network Architecture: 2 inputs -> 4 hidden -> 1 output
np.random.seed(42)
W1 = np.random.randn(2, 4) * np.sqrt(2.0 / 2) # He initialization
b1 = np.zeros((1, 4))
W2 = np.random.randn(4, 1) * np.sqrt(2.0 / 4)
b2 = np.zeros((1, 1))

learning_rate = 0.5
epochs = 500

print(f"[Init] Weights W1 shape: {W1.shape}, W2 shape: {W2.shape}")
print(f"[Init] Training for {epochs} epochs with learning_rate={learning_rate}...")

history_loss = []
for epoch in range(1, epochs + 1):
    # 1. Forward Pass
    Z1 = np.dot(X, W1) + b1
    A1 = sigmoid(Z1)
    Z2 = np.dot(A1, W2) + b2
    A2 = sigmoid(Z2) # Final prediction probabilities
    
    # 2. Binary Cross-Entropy Loss
    loss = -np.mean(y * np.log(A2 + 1e-12) + (1 - y) * np.log(1 - A2 + 1e-12))
    history_loss.append(loss)
    
    # 3. Backward Pass (Analytical Gradients)
    dZ2 = A2 - y
    dW2 = np.dot(A1.T, dZ2) / len(X)
    db2 = np.sum(dZ2, axis=0, keepdims=True) / len(X)
    
    dA1 = np.dot(dZ2, W2.T)
    dZ1 = dA1 * sigmoid_derivative(A1)
    dW1 = np.dot(X.T, dZ1) / len(X)
    db1 = np.sum(dZ1, axis=0, keepdims=True) / len(X)
    
    # 4. Gradient Descent Update
    W2 -= learning_rate * dW2
    b2 -= learning_rate * db2
    W1 -= learning_rate * dW1
    b1 -= learning_rate * db1
    
    if epoch % 100 == 0 or epoch == epochs:
        acc = np.mean((A2 > 0.5) == y) * 100
        print(f"Epoch {epoch:4d} | BCE Loss: {loss:.5f} | Accuracy: {acc:5.1f}%")

print("\\n[Inference Test on XOR Gates]:")
for sample, target, pred in zip(X, y, A2):
    print(f"Input: {sample.tolist()} -> Target: {int(target[0])} | Predicted: {pred[0]:.4f} [{'MATCH' if (pred[0] > 0.5) == target[0] else 'FAIL'}]")
`,
    parameters: [
      {
        name: 'learningRate',
        label: 'Learning Rate (alpha)',
        type: 'slider',
        min: 0.05,
        max: 1.0,
        step: 0.05,
        defaultValue: 0.5,
        unit: 'eta'
      },
      {
        name: 'epochs',
        label: 'Training Epochs',
        type: 'slider',
        min: 100,
        max: 1000,
        step: 50,
        defaultValue: 500,
        unit: 'cycles'
      },
      {
        name: 'activation',
        label: 'Activation Function',
        type: 'select',
        defaultValue: 'sigmoid',
        options: [
          { label: 'Sigmoid Logistic', value: 'sigmoid' },
          { label: 'Hyperbolic Tangent (Tanh)', value: 'tanh' },
          { label: 'Rectified Linear (ReLU)', value: 'relu' }
        ]
      }
    ],
    expectedMetrics: [
      { label: 'Final Loss', unit: 'BCE', key: 'finalLoss' },
      { label: 'Classification Accuracy', unit: '%', key: 'accuracy' },
      { label: 'Gradient Norm', unit: '||g||', key: 'gradNorm' }
    ]
  },
  {
    id: 'self-attention-transformer',
    title: 'Transformer Scaled Dot-Product Attention',
    category: 'Transformers & LLMs',
    description: 'Calculate Q, K, V projections and compute pairwise token attention weights with causal masking.',
    initialCode: `# AlgoGenius Transformer Studio
# Scaled Dot-Product Attention (Vaswani et al.)

import numpy as np

def softmax(x, axis=-1):
    e_x = np.exp(x - np.max(x, axis=axis, keepdims=True))
    return e_x / np.sum(e_x, axis=axis, keepdims=True)

# Tokens: ["The", "neural", "network", "learned", "representations"]
tokens = ["The", "neural", "network", "learned", "representations"]
seq_len = len(tokens)
d_model = 8  # Embedding dimension
d_k = 4      # Attention head key dimension

np.random.seed(1337)
# Simulated token embeddings (Seq_Len x D_Model)
X = np.random.randn(seq_len, d_model)

# Projection weight matrices
W_q = np.random.randn(d_model, d_k) * 0.5
W_k = np.random.randn(d_model, d_k) * 0.5
W_v = np.random.randn(d_model, d_k) * 0.5

# Step 1: Project into Query, Key, Value subspaces
Q = np.dot(X, W_q)
K = np.dot(X, W_k)
V = np.dot(X, W_v)

# Step 2: Compute scaled dot products: Q · K^T / sqrt(d_k)
scale = np.sqrt(d_k)
raw_scores = np.dot(Q, K.T) / scale

# Step 3: Softmax normalization to derive attention probabilities
attention_weights = softmax(raw_scores, axis=-1)

# Step 4: Multiply by Values to get contextualized output
context = np.dot(attention_weights, V)

print(f"Sequence Length: {seq_len} tokens | Attention Head Dimension: {d_k}")
print("\\n[Self-Attention Matrix Heatmap (Row: Query -> Col: Key)]:")
header = "Token      | " + " | ".join([f"{t[:4]:>4}" for t in tokens])
print(header)
print("-" * len(header))
for i, token in enumerate(tokens):
    row_str = " | ".join([f"{val:4.2f}" for val in attention_weights[i]])
    print(f"{token:<10} | {row_str}")

print(f"\\nContext Representation Matrix Shape: {context.shape}")
print(f"Token 'network' top attended token: {tokens[np.argmax(attention_weights[2])]}")
`,
    parameters: [
      {
        name: 'd_k',
        label: 'Head Dimension (d_k)',
        type: 'slider',
        min: 4,
        max: 16,
        step: 2,
        defaultValue: 8,
        unit: 'dims'
      },
      {
        name: 'temperature',
        label: 'Softmax Temperature',
        type: 'slider',
        min: 0.2,
        max: 2.0,
        step: 0.1,
        defaultValue: 1.0,
        unit: 'T'
      },
      {
        name: 'causalMask',
        label: 'Causal Masking (Autoregressive)',
        type: 'select',
        defaultValue: 'false',
        options: [
          { label: 'Bidirectional (Encoder - BERT)', value: 'false' },
          { label: 'Causal Look-Ahead Mask (Decoder - GPT)', value: 'true' }
        ]
      }
    ],
    expectedMetrics: [
      { label: 'Attention Entropy', unit: 'nats', key: 'entropy' },
      { label: 'Max Token Affinity', unit: 'weight', key: 'maxAffinity' },
      { label: 'Effective Context Depth', unit: 'layers', key: 'depth' }
    ]
  },
  {
    id: 'rag-vector-similarity',
    title: 'Vector Embeddings & Semantic RAG Search',
    category: 'Agentic AI',
    description: 'Index documents into dense vector space, compute cosine similarity, and retrieve optimal context chunks.',
    initialCode: `# AlgoGenius Semantic Retrieval Lab
# RAG (Retrieval-Augmented Generation) Vector Engine

import numpy as np

knowledge_corpus = [
    "Gradient descent updates model weights proportionally to negative error gradient.",
    "Transformers rely on multi-head self-attention without recurrent recurrence.",
    "Convolutional layers preserve spatial hierarchies using translation invariant kernels.",
    "Vector databases like Chroma and Qdrant store high-dimensional embeddings for RAG.",
    "Autonomous agents maintain short-term memory through conversational context windows."
]

def cosine_similarity(v1, v2):
    dot = np.dot(v1, v2)
    norm = np.linalg.norm(v1) * np.linalg.norm(v2)
    return dot / (norm + 1e-12)

# Simulated 128-dimensional embedding projector
np.random.seed(77)
vocab_dim = 64
corpus_embeddings = np.random.randn(len(knowledge_corpus), vocab_dim)
corpus_embeddings /= np.linalg.norm(corpus_embeddings, axis=1, keepdims=True)

query = "How do autonomous LLM agents manage memory?"
# Query embedding with semantic alignment towards document 4
query_embedding = corpus_embeddings[4] * 0.85 + np.random.randn(vocab_dim) * 0.15
query_embedding /= np.linalg.norm(query_embedding)

print(f"Query: '{query}'")
print(f"Corpus Size: {len(knowledge_corpus)} documentation chunks")
print("-" * 65)

# Calculate similarity ranking
scores = []
for idx, doc in enumerate(knowledge_corpus):
    score = cosine_similarity(query_embedding, corpus_embeddings[idx])
    scores.append((idx, score, doc))

# Rank descending
scores.sort(key=lambda x: x[1], reverse=True)

print("Top Semantic Matches:")
for rank, (idx, score, doc) in enumerate(scores, 1):
    indicator = " [TOP MATCH]" if rank == 1 else ""
    print(f"Rank {rank} | Cosine Score: {score:.4f} | Doc #{idx}: {doc}{indicator}")
`,
    parameters: [
      {
        name: 'topK',
        label: 'Top-K Retrieved Chunks',
        type: 'slider',
        min: 1,
        max: 5,
        step: 1,
        defaultValue: 3,
        unit: 'chunks'
      },
      {
        name: 'similarityThreshold',
        label: 'Minimum Similarity Cutoff',
        type: 'slider',
        min: 0.1,
        max: 0.9,
        step: 0.05,
        defaultValue: 0.45,
        unit: 'score'
      }
    ],
    expectedMetrics: [
      { label: 'Top Similarity', unit: 'cos(theta)', key: 'topScore' },
      { label: 'Retrieved Tokens', unit: 'tokens', key: 'tokenCount' },
      { label: 'Search Latency', unit: 'ms', key: 'latency' }
    ]
  },
  {
    id: 'kmeans-clustering',
    title: 'K-Means Unsupervised Clustering Algorithm',
    category: 'Machine Learning',
    description: 'Iterative Lloyd optimization partitioning continuous data points into K coherent cluster centroids.',
    initialCode: `# AlgoGenius Unsupervised Machine Learning
# K-Means Clustering Algorithm from scratch

import numpy as np

# Generate 3 synthetic feature clusters
np.random.seed(42)
c1 = np.random.randn(30, 2) + np.array([2.0, 2.0])
c2 = np.random.randn(30, 2) + np.array([-2.0, -1.0])
c3 = np.random.randn(30, 2) + np.array([1.5, -2.5])
X = np.vstack([c1, c2, c3])

K = 3
max_iters = 10

# Initialize centroids randomly from points
initial_idx = np.random.choice(len(X), K, replace=False)
centroids = X[initial_idx].copy()

print(f"Data samples: {len(X)} | Feature dimensions: 2 | Clusters K: {K}")
print(f"Initial Centroids:\\n{centroids}")

for iteration in range(1, max_iters + 1):
    # Step 1: Assign each point to the nearest centroid (Euclidean Distance)
    distances = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)
    labels = np.argmin(distances, axis=1)
    
    # Step 2: Compute new centroid locations as cluster means
    new_centroids = np.array([X[labels == k].mean(axis=0) if np.any(labels == k) else centroids[k] for k in range(K)])
    
    # Check convergence
    shift = np.linalg.norm(new_centroids - centroids)
    inertia = np.sum(np.min(distances, axis=1)**2)
    centroids = new_centroids
    
    print(f"Iteration {iteration:2d} | Centroid Displacement: {shift:.4f} | WCSS Inertia: {inertia:.2f}")
    if shift < 1e-4:
        print(f"--> Converged at iteration {iteration}!")
        break

print(f"\\nFinal Cluster Distribution: {[np.sum(labels == k) for k in range(K)]} points per centroid.")
`,
    parameters: [
      {
        name: 'kClusters',
        label: 'Number of Clusters (K)',
        type: 'slider',
        min: 2,
        max: 5,
        step: 1,
        defaultValue: 3,
        unit: 'clusters'
      },
      {
        name: 'maxIterations',
        label: 'Max Iterations',
        type: 'slider',
        min: 5,
        max: 30,
        step: 5,
        defaultValue: 10,
        unit: 'iters'
      }
    ],
    expectedMetrics: [
      { label: 'Inertia (WCSS)', unit: 'disp', key: 'inertia' },
      { label: 'Convergence Steps', unit: 'iters', key: 'steps' },
      { label: 'Silhouette Score', unit: 'coef', key: 'silhouette' }
    ]
  },
  {
    id: 'convolution-edge-filter',
    title: 'Convolutional Kernels & Feature Edge Filters',
    category: 'Computer Vision',
    description: 'Convolve spatial 3x3 matrices with pixel matrices to compute image gradients and edge magnitudes.',
    initialCode: `# AlgoGenius Vision Signal Processing
# 2D Spatial Convolution & Sobel Gradient Magnitude

import numpy as np

# Synthetic 8x8 greyscale image patch with diagonal edge
image = np.array([
    [10, 10, 10, 10, 90, 90, 90, 90],
    [10, 10, 10, 10, 90, 90, 90, 90],
    [10, 10, 10, 90, 90, 90, 90, 90],
    [10, 10, 90, 90, 90, 90, 90, 90],
    [10, 90, 90, 90, 90, 90, 90, 90],
    [90, 90, 90, 90, 90, 90, 90, 90],
    [90, 90, 90, 90, 90, 90, 90, 90],
    [90, 90, 90, 90, 90, 90, 90, 90]
], dtype=np.float32)

# Sobel Horizontal (G_x) and Vertical (G_y) Kernels
sobel_x = np.array([
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
], dtype=np.float32)

sobel_y = np.array([
    [-1, -2, -1],
    [ 0,  0,  0],
    [ 1,  2,  1]
], dtype=np.float32)

def conv2d(input_mat, kernel):
    h, w = input_mat.shape
    kh, kw = kernel.shape
    out_h, out_w = h - kh + 1, w - kw + 1
    output = np.zeros((out_h, out_w))
    
    for r in range(out_h):
        for c in range(out_w):
            patch = input_mat[r:r+kh, c:c+kw]
            output[r, c] = np.sum(patch * kernel)
    return output

G_x = conv2d(image, sobel_x)
G_y = conv2d(image, sobel_y)
magnitude = np.sqrt(G_x**2 + G_y**2)

print("Original Image (8x8):\\n", image.astype(int))
print("\\nEdge Gradient Magnitude Map (6x6):")
for row in magnitude:
    print(" ".join([f"{val:5.0f}" for val in row]))

print(f"\\nPeak Gradient Detected: {np.max(magnitude):.1f} at pixel coordinates.")
`,
    parameters: [
      {
        name: 'kernelType',
        label: 'Kernel Operator',
        type: 'select',
        defaultValue: 'sobel',
        options: [
          { label: 'Sobel Gradient Filter', value: 'sobel' },
          { label: 'Laplacian 2nd Derivative', value: 'laplacian' },
          { label: 'Gaussian Blur 3x3', value: 'gaussian' }
        ]
      },
      {
        name: 'threshold',
        label: 'Edge Binary Threshold',
        type: 'slider',
        min: 50,
        max: 300,
        step: 25,
        defaultValue: 150,
        unit: 'px'
      }
    ],
    expectedMetrics: [
      { label: 'Peak Gradient', unit: 'mag', key: 'peakGradient' },
      { label: 'Active Edge Pixels', unit: 'px', key: 'activeEdges' },
      { label: 'Kernel Flops', unit: 'ops', key: 'flops' }
    ]
  }
];
