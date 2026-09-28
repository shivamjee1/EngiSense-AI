from app.ai.tools.base import AITool
from app.ai.tools.correlation import CorrelationTool
from app.ai.tools.dataset_summary import DatasetSummaryTool
from app.ai.tools.outlier_detection import OutlierDetectionTool
from app.ai.tools.statistics import StatisticsTool


AI_TOOLS: dict[str, type[AITool]] = {
    "dataset_summary": DatasetSummaryTool,
    "statistics": StatisticsTool,
    "correlation": CorrelationTool,
    "outlier_detection": OutlierDetectionTool,
}


def get_tool(tool_name: str) -> AITool:
    tool_class = AI_TOOLS.get(tool_name)

    if tool_class is None:
        raise ValueError(
            f"Unknown AI tool: {tool_name}"
        )

    return tool_class()


def get_available_tools() -> list[dict]:
    return [
        {
            "name": tool_class.name,
            "description": tool_class.description,
        }
        for tool_class in AI_TOOLS.values()
    ]