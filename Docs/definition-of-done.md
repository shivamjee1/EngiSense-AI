# EngiSense AI — Definition of Done

A feature, task, or development phase is considered **Done** only when it satisfies the required implementation, testing, documentation, and Git standards.

## 1. Feature-Level Definition of Done

A feature is Done when:

- [ ] Requirements are clearly understood
- [ ] Implementation is complete
- [ ] Code follows the project structure
- [ ] Input validation is implemented where required
- [ ] Error handling is implemented
- [ ] Feature has been tested
- [ ] Bugs found during testing are fixed
- [ ] Documentation is updated
- [ ] No secrets or sensitive data are committed
- [ ] Git status is clean after commit

---

## 2. Backend Definition of Done

Backend features must:

- [ ] Follow FastAPI project structure
- [ ] Use Pydantic schemas where required
- [ ] Use SQLAlchemy for database access
- [ ] Use environment variables for configuration
- [ ] Validate incoming requests
- [ ] Return appropriate HTTP status codes
- [ ] Handle expected errors
- [ ] Include tests where applicable
- [ ] Appear correctly in FastAPI OpenAPI documentation

---

## 3. Database Definition of Done

Database changes must:

- [ ] Have an appropriate SQLAlchemy model
- [ ] Use Alembic migrations
- [ ] Apply successfully to a fresh database
- [ ] Preserve required relationships and constraints
- [ ] Avoid hard-coded credentials
- [ ] Be tested with the application

---

## 4. Data Analytics Definition of Done

Analytics features must:

- [ ] Validate uploaded data
- [ ] Handle missing values appropriately
- [ ] Handle invalid data appropriately
- [ ] Produce reproducible results
- [ ] Use Pandas/NumPy where appropriate
- [ ] Generate required visualizations
- [ ] Handle analysis errors safely
- [ ] Return results through the API

---

## 5. AI / RAG Definition of Done

AI features must:

- [ ] Have a clearly defined purpose
- [ ] Use controlled inputs and tools
- [ ] Retrieve relevant context
- [ ] Avoid unrestricted system/database access
- [ ] Provide grounded responses where applicable
- [ ] Handle missing context
- [ ] Handle model/API failures
- [ ] Be tested with representative queries
- [ ] Track relevant sources/context where applicable

---

## 6. Frontend Definition of Done

Frontend features must:

- [ ] Follow the React project structure
- [ ] Provide a usable interface
- [ ] Handle loading states
- [ ] Handle API errors
- [ ] Validate user input
- [ ] Work with the backend API
- [ ] Avoid exposing secrets
- [ ] Be tested for the expected user flow

---

## 7. Security Definition of Done

Security-sensitive features must:

- [ ] Never commit passwords or API keys
- [ ] Use `.env` for local secrets
- [ ] Provide required variables through `.env.example`
- [ ] Validate uploaded files
- [ ] Validate user input
- [ ] Protect authenticated endpoints
- [ ] Use secure password hashing
- [ ] Apply appropriate authorization checks
- [ ] Avoid unrestricted AI tool access

---

## 8. Git Definition of Done

Before merging a feature:

- [ ] Changes are committed with a meaningful commit message
- [ ] No secrets are committed
- [ ] `.env` is ignored
- [ ] `.venv` is ignored
- [ ] `node_modules` is ignored
- [ ] Build artifacts are ignored
- [ ] Temporary files are ignored
- [ ] Tests pass
- [ ] Git working tree is clean

---

## 9. Phase-Level Definition of Done

A project phase is complete only when:

- [ ] All planned tasks are implemented
- [ ] Required tests pass
- [ ] Known critical bugs are resolved
- [ ] Documentation is updated
- [ ] Git history contains the completed work
- [ ] Repository is clean
- [ ] Phase output has been reviewed
- [ ] No unfinished critical dependency blocks the next phase

---

## 10. Release Definition of Done

EngiSense AI is ready for release when:

- [ ] Core MVP features work end-to-end
- [ ] Authentication works
- [ ] Dataset analysis works
- [ ] Document RAG works
- [ ] AI assistant works with controlled tools
- [ ] Frontend and backend integrate correctly
- [ ] Database migrations work
- [ ] Automated tests pass
- [ ] Security checks are completed
- [ ] Docker deployment works
- [ ] CI/CD pipeline works
- [ ] Production configuration is documented
- [ ] User documentation is available