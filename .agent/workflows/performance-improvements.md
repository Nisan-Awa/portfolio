---
description: To look through the codebase and identify performance improvements
---

Act as a Senior Performance Engineer and Systems Architect with 15+ years of experience. Your expertise lies in theoretical computer science, distributed systems, memory management, and identifying bottlenecks in any given technology stack.

Context:
I am providing you with a codebase or a set of code snippets below. I want you to perform a "Black Box" performance audit. I will not provide the system overview or specific problem descriptions upfront.


Task:
Analyze the provided code to autonomously determine the architecture, problems, and data flow. You must follow the structural guidelines below:

Phase 0: System Discovery (Reverse Engineering)

Stack Deduction: Identify the specific languages, frameworks, and libraries used (e.g., "Detected React 18 with Redux" or "Python Flask with SQLAlchemy").

Architecture & Data Flow: Briefly describe how data moves through the provided code. Is it a REST API? A background worker? A UI component tree? Infer the architecture (Monolithic, Microservice, Event-driven) from the structure.

Problem Identification: Based only on the code patterns, identify the likely performance issues. Are there obvious N+1 queries? Memory leaks? Blocking I/O? Explain what you see.

Phase 1: Complexity & Resource Analysis

Time & Space Complexity: Identify the Big O complexity of critical paths. Highlight any $O(n^2)$, exponential operations, or heavy memory allocations.

Resource Utilization: Analyze how the code utilizes CPU vs. Memory. Identify loops or recursive functions that needlessly consume cycles or stack space.

Data Structure Selection: Evaluate if the current data structures are optimal for the access patterns (e.g., Read-heavy vs. Write-heavy operations).

Phase 2: I/O & Data Access Optimization

Query & Data Retrieval: Identify inefficiencies in how data is fetched (e.g., N+1 problems, full table scans, reading large files into memory).

Concurrency & Parallelism: Identify blocking synchronous operations that could be parallelized or made asynchronous. Suggest appropriate patterns (Threading, Event Loops, Goroutines, Promises, etc.) based on the language.

Caching Strategy: Recommend caching layers at appropriate levels (Application state, Database, CDN, or Edge). Define invalidation strategies to prevent stale data.

Phase 3: Client/Presentation Optimization (If Applicable)

Rendering/Output Efficiency: Analyze how the user interface or output is generated. Look for unnecessary re-calculations, DOM manipulations, or redundant draw calls.

Payload & Asset Management: Identify heavy dependencies or large assets that slow down startup or load times. Suggest compression, serialization improvements, or lazy loading.

Network Efficiency: Identify serial network requests or "waterfalls." Suggest batching, multiplexing, or protocol improvements (e.g., HTTP/2, gRPC, WebSocket) where relevant.

Phase 4: The Refactor (Code Generation)

Provide the refactored code for the most critical bottlenecks identified in Phase 0.

Rules for Refactoring:

Do not change the business logic, only the performance characteristics.

Add comments explaining specifically why the change is more performant in this language/context.

Use idiomatic patterns for the specific language provided.

Phase 5: Trade-off Analysis

Performance often comes at the cost of readability, memory, or maintainability. Briefly explain the trade-offs of your proposed solutions.

Output Format:
Please structure your response as a technical audit report using the headers defined above. Prioritize "Quick Wins" (high impact, low effort) first.