from app.analysis.cleaner import clean_dataframe
from app.analysis.correlation import generate_correlation_matrix
from app.analysis.loader import load_csv
from app.analysis.outliers import detect_outliers
from app.analysis.statistics import generate_summary
from app.analysis.validator import validate_dataframe


def analyze_csv(file_path: str) -> dict:
    df = load_csv(file_path)

    validation = validate_dataframe(df)

    if not validation["valid"]:
        raise ValueError(
            f"Invalid dataset. Missing columns: "
            f"{validation['missing_columns']}"
        )

    cleaned_df = clean_dataframe(df)

    summary = generate_summary(cleaned_df)
    correlation = generate_correlation_matrix(cleaned_df)
    outliers = detect_outliers(cleaned_df)

    return {
        "summary": summary,
        "correlation": correlation,
        "outliers": outliers,
    }