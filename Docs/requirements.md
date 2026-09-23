# EngiSense AI — Product Requirements

## 1. Product Overview

EngiSense AI is an AI-powered engineering intelligence platform designed to help engineers analyze engineering datasets, understand technical documents, visualize data, and interact with an AI assistant using both structured engineering data and unstructured technical knowledge.

The platform combines:

- Full-stack web development
- Engineering data analytics
- Data visualization
- Generative AI
- Retrieval-Augmented Generation (RAG)
- Technical document intelligence
- Controlled AI-powered data analysis

The goal is to provide a unified platform where engineering data and engineering knowledge can be analyzed through a single interface.

---

# 2. Problem Statement

Engineering teams often work with information distributed across multiple tools and formats.

Examples include:

- CSV datasets
- Sensor measurements
- Test results
- Experimental data
- Technical manuals
- Research papers
- Datasheets
- Engineering reports
- Maintenance documents

Engineers may need to manually analyze datasets using Python tools, search through documents separately, and use different software for visualization and reporting.

EngiSense AI aims to reduce this fragmentation by providing a single platform for:

1. Dataset analysis
2. Data visualization
3. Technical document search
4. AI-assisted engineering analysis
5. Knowledge retrieval
6. Natural-language interaction with engineering information

---

# 3. Product Vision

The vision of EngiSense AI is to become an engineering-focused intelligence platform that connects:

Engineering Data + Engineering Documents + Data Analytics + Generative AI

into a unified workflow.

The platform should allow a user to upload engineering information and interact with it using both traditional analytical methods and AI-assisted natural-language queries.

---

# 4. Target Users

## 4.1 Engineering Students

Students can use EngiSense AI to:

- Analyze laboratory datasets
- Visualize experimental results
- Understand technical documents
- Ask questions about engineering concepts
- Explore engineering datasets

## 4.2 Engineers

Engineers can use the platform to:

- Analyze test data
- Identify trends
- Detect anomalies
- Explore correlations
- Search technical documentation
- Ask data-aware questions

## 4.3 Researchers

Researchers can use the platform to:

- Analyze experimental datasets
- Process technical documents
- Compare measurements
- Identify statistical relationships
- Retrieve relevant information from research documents

---

# 5. Core Use Cases

The initial platform will support the following major use cases.

### UC-01 — User Authentication

A user can:

- Register
- Login
- Logout
- Access protected resources

### UC-02 — Project Management

A user can:

- Create a project
- View projects
- Update project information
- Delete projects

### UC-03 — Dataset Upload

A user can:

- Upload engineering datasets
- View dataset metadata
- Delete datasets
- Associate datasets with projects

Initial supported format:

- CSV

Future formats may include:

- Excel
- JSON

### UC-04 — Dataset Analysis

A user can analyze an uploaded dataset and obtain:

- Dataset dimensions
- Column information
- Data types
- Missing-value information
- Duplicate information
- Descriptive statistics
- Correlation analysis
- Outlier detection

### UC-05 — Data Visualization

The system can generate visualizations such as:

- Line plots
- Bar charts
- Histograms
- Scatter plots
- Box plots
- Correlation heatmaps

### UC-06 — Technical Document Upload

A user can upload technical documents.

Initial target formats:

- PDF
- TXT
- DOCX

### UC-07 — Document Search

The system can process uploaded documents and retrieve relevant sections based on a user's query.

### UC-08 — AI Engineering Assistant

A user can ask natural-language questions about:

- Engineering documents
- Uploaded datasets
- Statistical results
- Trends
- Correlations
- Detected anomalies

### UC-09 — Data-Aware AI Analysis

The AI assistant can use controlled analytical tools to answer questions involving uploaded datasets.

Example:

> Why did the temperature increase during cycle 120?

The system may:

1. Analyze the relevant dataset
2. Calculate statistics
3. Identify related variables
4. Search relevant technical documents
5. Generate a contextual response

---

# 6. Functional Requirements

## FR-01 Authentication

The system shall provide user registration and login.

## FR-02 Authorization

The system shall restrict protected resources to authenticated users.

## FR-03 Project Management

The system shall allow users to create, read, update, and delete projects.

## FR-04 Dataset Management

The system shall allow users to upload, view, and delete datasets.

## FR-05 Dataset Validation

The system shall validate uploaded datasets before analysis.

## FR-06 Statistical Analysis

The system shall calculate basic statistical metrics for numerical dataset columns.

## FR-07 Data Quality Analysis

The system shall identify:

- Missing values
- Duplicate records
- Invalid data types where applicable

## FR-08 Correlation Analysis

The system shall calculate correlations between appropriate numerical variables.

## FR-09 Outlier Detection

The system shall provide an initial outlier detection mechanism using statistical methods such as:

- IQR
- Z-score

## FR-10 Visualization

The system shall generate appropriate charts from analyzed datasets.

## FR-11 Document Processing

The system shall extract text from supported technical documents.

## FR-12 Document Chunking

The system shall divide extracted document content into manageable chunks for retrieval.

## FR-13 Embedding Generation

The system shall generate vector embeddings for processed document chunks.

## FR-14 Semantic Retrieval

The system shall retrieve document content relevant to a user's query.

## FR-15 RAG

The system shall use retrieved document context to generate grounded AI responses.

## FR-16 AI Data Tools

The system shall provide controlled analytical tools to the AI assistant.

Initial tools include:

- Dataset Summary Tool
- Statistics Tool
- Correlation Tool
- Outlier Detection Tool
- Document Search Tool

## FR-17 Chat

The system shall allow users to interact with the AI assistant through a conversational interface.

## FR-18 Chat History

The system shall store relevant conversation history for authenticated users.

---

# 7. Non-Functional Requirements

## NFR-01 Performance

The system should provide reasonable response times for normal dataset sizes and typical document queries.

## NFR-02 Scalability

The architecture should allow additional services and processing capabilities to be introduced later.

## NFR-03 Security

The system shall:

- Hash passwords
- Protect authentication tokens
- Validate user input
- Validate uploaded files
- Protect secrets
- Restrict unauthorized access

## NFR-04 Maintainability

The backend should follow a modular architecture separating:

- API routes
- Database models
- Schemas
- Services
- Analytics
- AI functionality

## NFR-05 Reproducibility

The application should be reproducible using Docker once containerization is implemented.

## NFR-06 Reliability

The system should provide appropriate error handling and validation.

## NFR-07 Usability

The interface should provide a clear workflow for:

Upload → Analyze → Visualize → Ask AI

## NFR-08 Extensibility

The system should allow future integration of:

- Additional dataset formats
- Additional AI models
- Additional engineering tools
- IoT data
- Real-time telemetry
- Additional vector databases
- Additional analytical algorithms

---

# 8. MVP Scope

The first Minimum Viable Product will contain:

### Authentication

- Registration
- Login
- JWT-based authentication

### Projects

- Create project
- View project
- Update project
- Delete project

### Dataset

- CSV upload
- Dataset metadata
- Dataset validation

### Analytics

- Dataset summary
- Descriptive statistics
- Missing-value analysis
- Correlation analysis
- Basic outlier detection

### Visualization

- Line plot
- Histogram
- Scatter plot
- Box plot
- Correlation heatmap

### Documents

- PDF upload
- Text extraction
- Chunking
- Embeddings
- Vector search

### AI

- LangChain-based orchestration
- Hugging Face model
- RAG-based document question answering

---

# 9. Future Scope

The following features are outside the initial MVP:

- Real-time IoT telemetry
- ESP32 integration
- Live sensor dashboards
- Advanced anomaly detection
- Time-series forecasting
- Computer vision
- Multimodal AI
- Voice interface
- Advanced engineering simulation integration
- Automated engineering reports
- Cloud-scale distributed processing

These features may be considered after the core platform is stable.

---

# 10. Technology Direction

The initial technology direction is:

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

## Backend

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- Alembic

## Database

- PostgreSQL

## Data Analytics

- Pandas
- NumPy
- Matplotlib
- Seaborn

## AI

- LangChain
- Hugging Face
- Embeddings
- RAG
- Vector Search

## Engineering

- Git
- GitHub
- Docker
- Docker Compose
- GitHub Actions

---

# 11. High-Level User Workflow

The intended user workflow is:

```text
User
  ↓
Register / Login
  ↓
Create Engineering Project
  ↓
Upload Dataset / Documents
  ↓
Dataset Processing
  ↓
Data Analysis
  ↓
Visualization
  ↓
Document Processing
  ↓
Vector Search / RAG
  ↓
AI Assistant
  ↓
Data + Document Analysis
  ↓
Engineering Insight