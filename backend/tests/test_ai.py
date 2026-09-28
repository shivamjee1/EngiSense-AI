import pandas as pd

from app.ai.tools.dataset_summary import DatasetSummaryTool
from app.ai.tools.statistics import StatisticsTool
from app.ai.tools.correlation import CorrelationTool
from app.ai.tools.outlier_detection import OutlierDetectionTool


def create_test_dataframe():
    return pd.DataFrame(
        {
            "temperature": [20, 21, 22, 23, 24],
            "voltage": [11.8, 11.9, 12.0, 12.1, 12.2],
            "current": [1.0, 1.1, 1.2, 1.1, 1.0],
        }
    )


def test_dataset_summary_tool():
    df = create_test_dataframe()

    tool = DatasetSummaryTool()
    result = tool.execute(df)

    assert isinstance(result, dict)
    assert result["rows"] == 5
    assert result["columns"] == 3
    assert "temperature" in result["column_names"]
    assert "voltage" in result["column_names"]
    assert "current" in result["column_names"]


def test_statistics_tool():
    df = create_test_dataframe()

    tool = StatisticsTool()
    result = tool.execute(df)

    assert isinstance(result, dict)
    assert result["rows"] == 5
    assert result["columns"] == 3
    assert "numeric_summary" in result


def test_correlation_tool():
    df = create_test_dataframe()

    tool = CorrelationTool()
    result = tool.execute(df)

    assert isinstance(result, dict)
    assert "temperature" in result
    assert "voltage" in result
    assert "current" in result
    assert result["temperature"]["temperature"] == 1.0


def test_outlier_detection_tool():
    df = create_test_dataframe()

    tool = OutlierDetectionTool()
    result = tool.execute(df)

    assert isinstance(result, dict)
    assert "temperature" in result
    assert "voltage" in result
    assert "current" in result