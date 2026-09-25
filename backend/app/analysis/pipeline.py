from app.analysis.cleaner import clean_dataframe
from app.analysis.correlation import generate_correlation_matrix
from app.analysis.loader import load_csv
from app.analysis.outliers import detect_outliers
from app.analysis.statistics import generate_summary
from app.analysis.validator import validate_dataframe
from app.analysis.visualization_service import (
    generate_engineering_charts,
)


def analyze_csv(
    file_path: str,
    chart_directory: str,
    chart_url_prefix: str,
) -> dict:

    df = load_csv(file_path)

    validation = validate_dataframe(df)

    if not validation["valid"]:
        raise ValueError(
            "Invalid dataset. "
            f"Missing columns: "
            f"{validation['missing_columns']}"
        )

    cleaned_df = clean_dataframe(df)

    summary = generate_summary(
        cleaned_df
    )

    correlation = (
        generate_correlation_matrix(
            cleaned_df
        )
    )

    outliers = detect_outliers(
        cleaned_df
    )

    generate_engineering_charts(
        file_path,
        chart_directory,
    )

    chart_urls = {
        "temperature": (
            f"{chart_url_prefix}/"
            "temperature_trend.png"
        ),
        "current": (
            f"{chart_url_prefix}/"
            "current_trend.png"
        ),
        "voltage": (
            f"{chart_url_prefix}/"
            "voltage_trend.png"
        ),
        "correlation_heatmap": (
            f"{chart_url_prefix}/"
            "correlation_heatmap.png"
        ),
    }

    return {
        "summary": summary,
        "correlation": correlation,
        "outliers": outliers,
        "charts": chart_urls,
    }