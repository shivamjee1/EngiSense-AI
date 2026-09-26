from app.models.document_chunk import DocumentChunk


def build_rag_context(
    chunks: list[DocumentChunk],
    max_characters: int = 8000,
) -> str:
    if not chunks:
        raise ValueError("Cannot build context from empty chunks")

    if max_characters <= 0:
        raise ValueError("max_characters must be greater than 0")

    context_parts = []
    current_length = 0

    for chunk in chunks:
        chunk_text = chunk.content.strip()

        if not chunk_text:
            continue

        formatted_chunk = (
            f"[Document Chunk {chunk.chunk_index}]\n"
            f"{chunk_text}"
        )

        additional_length = len(formatted_chunk)

        if current_length + additional_length > max_characters:
            break

        context_parts.append(formatted_chunk)
        current_length += additional_length + 2

    if not context_parts:
        raise ValueError("No usable content found in chunks")

    return "\n\n".join(context_parts)