import pandas as pd

from app.analysis.statistics import generate_summary
from app.ai.tools.base import AITool


class DatasetSummaryTool(AITool):
    name = "dataset_summary"

    description = (
        "Generate a structural summary of an engineering dataset, "
        "including row count, column count, column names, and "
        "numeric statistical summary."
    )

    def execute(self, df: pd.DataFrame) -> dict:
        if df.empty:
            raise ValueError("Dataset cannot be empty")

        return generate_summary(df)