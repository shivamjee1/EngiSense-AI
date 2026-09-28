from pathlib import Path

import pandas as pd

from app.models.dataset import Dataset


class AIDatasetLoader:
    @staticmethod
    def load(dataset: Dataset) -> pd.DataFrame:
        file_path = Path(dataset.file_path)

        if not file_path.is_file():
            raise FileNotFoundError(
                f"Dataset file not found: {dataset.file_path}"
            )

        if dataset.file_type.lower() != "csv":
            raise ValueError(
                f"Unsupported dataset type: {dataset.file_type}"
            )

        df = pd.read_csv(file_path)

        if df.empty:
            raise ValueError("Dataset is empty")

        return df