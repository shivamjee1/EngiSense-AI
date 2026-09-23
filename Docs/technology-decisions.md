# EngiSense AI — Technology Decisions

## 1. Frontend

### React
Used to build the interactive web application.

### Vite
Used as the React development and build tool.

### Tailwind CSS
Used for responsive UI styling.

### React Router
Used for frontend navigation.

### Axios
Used for communication between React and FastAPI.

---

## 2. Backend

### Python
Primary backend and AI/data-analysis language.

### FastAPI
Used to build REST APIs and backend services.

### Uvicorn
Used as the ASGI server for FastAPI.

### Pydantic
Used for request and response validation.

### SQLAlchemy
Used as the ORM for PostgreSQL.

### Alembic
Used for database migrations.

---

## 3. Database

### PostgreSQL

Used for:

- Users
- Projects
- Dataset metadata
- Document metadata
- Analysis results
- Chat sessions
- Chat messages

### pgvector

Planned for storing and searching document embeddings within PostgreSQL.

The final vector-storage decision can be revised if project scale requires a dedicated vector database.

---

## 4. Data Analytics

### Pandas

Used for:

- Dataset loading
- Data cleaning
- Data transformation
- Statistical analysis

### NumPy

Used for numerical operations and calculations.

### Matplotlib

Used for generating charts.

### Seaborn

Used for statistical visualizations.

---

## 5. Generative AI

### Hugging Face

Used to access suitable open-source/open-weight models for:

- Text generation
- Embeddings

The exact models will be selected during Phase 6 based on performance, hardware requirements, context length, and licensing.

### LangChain

Used as the orchestration framework for:

- LLM interaction
- Retrievers
- RAG pipelines
- AI tools
- Prompt workflows

---

## 6. Authentication

The initial authentication architecture will use:

- JWT
- Secure password hashing
- FastAPI authentication dependencies

Authentication will be implemented in Phase 3.

---

## 7. API Documentation

FastAPI's built-in OpenAPI documentation will be used.

Development endpoints:

```text
/docs
/redoc