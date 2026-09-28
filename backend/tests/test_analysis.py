import pandas as pd

from app.analysis.statistics import generate_summary
from app.analysis.correlation import generate_correlation_matrix
from app.analysis.outliers import detect_outliers


def test_generate_summary():
    df = pd.DataFrame(
        {
            "temperature": [20, 25, 30],
            "voltage": [12, 12, 12],
        }
    )

    result = generate_summary(df)

    assert result["rows"] == 3
    assert result["columns"] == 2
    assert "temperature" in result["column_names"]
    assert "voltage" in result["column_names"]


def test_generate_correlation_matrix():
    df = pd.DataFrame(
        {
            "temperature": [20, 25, 30],
            "voltage": [10, 20, 30],
        }
    )

    result = generate_correlation_matrix(df)

    assert "temperature" in result
    assert "voltage" in result
    assert result["temperature"]["temperature"] == 1.0


def test_detect_outliers():
    df = pd.DataFrame(
        {
            "temperature": [20, 21, 22, 23, 100],
        }
    )

    result = detect_outliers(df)

    assert "temperature" in result
    assert result["temperature"]["outlier_count"] == 1
    assert 100 in result["temperature"]["outlier_values"]