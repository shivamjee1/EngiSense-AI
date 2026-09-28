import pandas as pd

from app.analysis.correlation import generate_correlation_matrix
from app.ai.tools.base import AITool


class CorrelationTool(AITool):
    name = "correlation"

    description = (
        "Calculate the Pearson correlation matrix between "
        "numeric variables in an engineering dataset."
    )

    def execute(self, df: pd.DataFrame) -> dict:
        if df.empty:
            raise ValueError("Dataset cannot be empty")

        numeric_df = df.select_dtypes(include="number")

        if numeric_df.empty:
            raise ValueError(
                "Dataset does not contain numeric columns"
            )

        return generate_correlation_matrix(df)