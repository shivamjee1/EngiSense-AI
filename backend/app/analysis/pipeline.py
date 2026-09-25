from app.analysis.cleaner import clean_dataframe
from app.analysis.loader import load_csv
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

    return summary