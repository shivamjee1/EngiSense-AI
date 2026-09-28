import pandas as pd

from app.analysis.outliers import detect_outliers
from app.ai.tools.base import AITool


class OutlierDetectionTool(AITool):
    name = "outlier_detection"

    description = (
        "Detect statistical outliers in numeric engineering "
        "variables using the IQR method."
    )

    def execute(self, df: pd.DataFrame) -> dict:
        if df.empty:
            raise ValueError("Dataset cannot be empty")

        numeric_df = df.select_dtypes(include="number")

        if numeric_df.empty:
            raise ValueError(
                "Dataset does not contain numeric columns"
            )

        return detect_outliers(df)