def build_rag_prompt(
    question: str,
    context: str,
) -> str:
    if not question or not question.strip():
        raise ValueError("Question cannot be empty")

    if not context or not context.strip():
        raise ValueError("Context cannot be empty")

    return f"""You are EngiSense AI, an engineering intelligence assistant.

Answer the user's question using only the provided document context.

If the answer cannot be found in the context, clearly state that the information is not available in the provided documents.

Do not invent facts.

Document Context:
----------------
{context}
----------------

User Question:
{question}

Answer:
"""