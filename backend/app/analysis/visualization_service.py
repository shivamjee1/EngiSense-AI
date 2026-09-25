from pathlib import Path

from app.analysis.cleaner import clean_dataframe
from app.analysis.heatmap import generate_correlation_heatmap
from app.analysis.loader import load_csv
from app.analysis.visualization import generate_trend_chart


def generate_engineering_charts(file_path: str) -> dict:
    df = load_csv(file_path)
    df = clean_dataframe(df)

    output_dir = Path("data/charts")
    output_dir.mkdir(parents=True, exist_ok=True)

    temperature_chart = generate_trend_chart(
        df,
        "cycle",
        "temperature_c",
        str(output_dir / "temperature_trend.png"),
    )

    current_chart = generate_trend_chart(
        df,
        "cycle",
        "current_a",
        str(output_dir / "current_trend.png"),
    )

    voltage_chart = generate_trend_chart(
        df,
        "cycle",
        "voltage_v",
        str(output_dir / "voltage_trend.png"),
    )

    correlation_heatmap = generate_correlation_heatmap(
        df,
        str(output_dir / "correlation_heatmap.png"),
    )

    return {
        "temperature": temperature_chart,
        "current": current_chart,
        "voltage": voltage_chart,
        "correlation_heatmap": correlation_heatmap,
    }