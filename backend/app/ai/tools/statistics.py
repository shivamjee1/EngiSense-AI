import pandas as pd

from app.analysis.statistics import generate_summary
from app.ai.tools.base import AITool


class StatisticsTool(AITool):
    name = "statistics"

    description = (
        "Calculate descriptive statistics for numeric columns "
        "in an engineering dataset."
    )

    def execute(self, df: pd.DataFrame) -> dict:
        if df.empty:
            raise ValueError("Dataset cannot be empty")

        summary = generate_summary(df)

        return {
            "rows": summary["rows"],
            "columns": summary["columns"],
            "numeric_summary": summary["numeric_summary"],
        }