# EngiSense AI — Project Roadmap

## Project Goal

Build a production-oriented engineering intelligence platform that combines:

- Engineering dataset analysis
- Technical document intelligence
- Retrieval-Augmented Generation (RAG)
- Generative AI
- Interactive visualization
- Full-stack web development
- Secure APIs
- Containerization and deployment

---

# Phase 1 — Product Planning & Architecture

### Objective
Define the product, requirements, architecture, technology stack, and development process.

### Deliverables
- Product requirements
- User personas
- Use cases
- System architecture
- Technology decisions
- Development backlog
- Definition of Done
- Project roadmap

### Status
In Progress

---

# Phase 2 — Backend Foundation

### Objective
Build the FastAPI backend and PostgreSQL foundation.

### Tasks
- Create Python virtual environment
- Configure FastAPI
- Create backend application structure
- Configure environment variables
- Setup PostgreSQL
- Configure SQLAlchemy
- Configure Alembic
- Create initial database models
- Create database migrations
- Add health-check endpoint
- Test database connectivity

### Status
Not Started

---

# Phase 3 — REST API & Authentication

### Objective
Build secure APIs and user authentication.

### Tasks
- User registration
- Password hashing
- JWT authentication
- Login
- Current-user endpoint
- Project CRUD APIs
- Dataset metadata APIs
- API validation
- Error handling
- Authentication tests

### Status
Not Started

---

# Phase 4 — Engineering Data Analytics

### Objective
Build the engineering dataset analysis engine.

### Tasks
- CSV upload
- Dataset validation
- Data cleaning
- Pandas-based analysis
- NumPy numerical analysis
- Descriptive statistics
- Correlation analysis
- Outlier detection
- Engineering metrics
- Matplotlib visualizations
- Seaborn visualizations
- Analysis result storage

### Status
Not Started

---

# Phase 5 — React Frontend

### Objective
Build the main web application interface.

### Tasks
- Setup React with Vite
- Configure Tailwind CSS
- Configure React Router
- Configure Axios
- Authentication UI
- Dashboard
- Project management UI
- Dataset upload UI
- Dataset analysis UI
- Charts and visualization UI
- API integration
- Loading/error states

### Status
Not Started

---

# Phase 6 — Document Intelligence & RAG

### Objective
Allow users to upload engineering documents and ask questions about them.

### Tasks
- PDF upload
- PDF text extraction
- Text cleaning
- Document chunking
- Embedding generation
- Vector storage
- Semantic search
- Retriever implementation
- LangChain integration
- Hugging Face model integration
- RAG pipeline
- Source/context tracking

### Status
Not Started

---

# Phase 7 — Data-Aware Generative AI

### Objective
Connect the AI assistant with controlled engineering analysis tools.

### Tasks
- AI chat interface
- Dataset summary tool
- Statistics tool
- Correlation tool
- Outlier detection tool
- Document search tool
- Tool orchestration
- Data + document reasoning
- Grounded AI responses
- Chat history

### Status
Not Started

---

# Phase 8 — Docker & Production Engineering

### Objective
Make the application reproducible and containerized.

### Tasks
- Backend Dockerfile
- Frontend Dockerfile
- PostgreSQL container
- Docker Compose
- Environment configuration
- Production configuration
- Service networking
- Health checks
- Persistent database storage
- Container testing

### Status
Not Started

---

# Phase 9 — Testing, Security & CI/CD

### Objective
Prepare the application for reliable development and deployment.

### Tasks
- Unit tests
- API integration tests
- Database tests
- Frontend tests
- RAG pipeline tests
- Authentication/security testing
- Input validation
- File upload security
- CORS configuration
- Rate limiting
- Secret management
- Ruff
- Black
- ESLint
- GitHub Actions CI
- Automated test pipeline

### Status
Not Started

---

# Phase 10 — Deployment & Final Release

### Objective
Deploy EngiSense AI as a production-style application.

### Tasks
- Production environment
- Backend deployment
- Frontend deployment
- PostgreSQL deployment
- HTTPS
- Domain configuration
- Reverse proxy
- Monitoring/logging
- Final security review
- Performance testing
- Documentation
- Demo preparation

### Status
Not Started

---

# Final Product Flow

```text
User
  ↓
React Frontend
  ↓
FastAPI API
  ↓
Authentication / Projects
  ↓
Dataset & Document Services
  ↓
┌───────────────────────┐
│                       │
│  Data Analytics       │
│  Pandas + NumPy       │
│  Matplotlib + Seaborn │
│                       │
└───────────┬───────────┘
            │
            ↓
┌────────────────────────────┐
│                            │
│   AI / RAG Layer           │
│   LangChain                │
│   Hugging Face             │
│   Embeddings + Vector DB   │
│                            │
└────────────┬───────────────┘
             ↓
      Engineering AI
        Assistant