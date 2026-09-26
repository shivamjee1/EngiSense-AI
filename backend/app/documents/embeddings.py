from sentence_transformers import SentenceTransformer


MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"


class EmbeddingService:
    _model = None

    def __init__(self):
        if EmbeddingService._model is None:
            EmbeddingService._model = SentenceTransformer(MODEL_NAME)

        self.model = EmbeddingService._model

    def generate_embedding(self, text: str) -> list[float]:
        if not text or not text.strip():
            raise ValueError("Cannot generate embedding for empty text")

        embedding = self.model.encode(
            text,
            normalize_embeddings=True,
        )

        return embedding.tolist()

    def generate_embeddings(
        self,
        texts: list[str],
    ) -> list[list[float]]:
        if not texts:
            raise ValueError("Cannot generate embeddings for empty text list")

        if any(not text or not text.strip() for text in texts):
            raise ValueError("Cannot generate embeddings for empty text")

        embeddings = self.model.encode(
            texts,
            normalize_embeddings=True,
        )

        return embeddings.tolist()