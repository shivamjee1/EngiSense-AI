# EngiSense AI — System Architecture

## 1. Architecture Overview

EngiSense AI follows a modular full-stack architecture.

The system is divided into the following major layers:

1. Presentation Layer
2. API Layer
3. Application / Service Layer
4. Data Analytics Layer
5. AI / RAG Layer
6. Data Persistence Layer
7. Infrastructure Layer

High-level architecture:

```text
                         ┌─────────────────────┐
                         │       User          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │   Vite + Tailwind   │
                         └──────────┬──────────┘
                                    │
                              HTTP / REST
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    FastAPI Backend  │
                         │      REST API       │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
      ┌───────────────┐    ┌────────────────┐    ┌────────────────┐
      │ Project/Auth  │    │ Data Analytics │    │  AI / RAG      │
      │   Services    │    │    Engine      │    │    Services    │
      └───────┬───────┘    └───────┬────────┘    └───────┬────────┘
              │                    │                     │
              │                    ▼                     │
              │             ┌──────────────┐             │
              │             │Pandas / NumPy│             │
              │             │Matplotlib    │             │
              │             │Seaborn       │             │
              │             └──────────────┘             │
              │                                          │
              │                         ┌────────────────┼──────────────┐
              │                         │                │              │
              │                         ▼                ▼              ▼
              │                  ┌────────────┐   ┌────────────┐  ┌────────────┐
              │                  │ LangChain  │   │ Embeddings │  │ HF LLM     │
              │                  └─────┬──────┘   └─────┬──────┘  └────────────┘
              │                        │                │
              │                        ▼                ▼
              │                  ┌─────────────────────────┐
              │                  │     Vector Search       │
              │                  │ PostgreSQL + pgvector   │
              │                  └─────────────────────────┘
              │
              └──────────────────────┬───────────────────────┐
                                     │                       │
                                     ▼                       ▼
                              ┌──────────────┐        ┌──────────────┐
                              │ PostgreSQL   │        │ File Storage │
                              │ Application  │        │ Documents /  │
                              │ Data         │        │ Datasets     │
                              └──────────────┘        └──────────────┘