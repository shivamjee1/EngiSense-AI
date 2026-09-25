import pandas as pd


REQUIRED_COLUMNS = [
    "cycle",
    "temperature_c",
    "voltage_v",
    "current_a",
    "pressure_kpa",
    "vibration_mm_s",
]


def validate_engineering_dataset(df: pd.DataFrame) -> dict:
    missing_columns = [
        column
        for column in REQUIRED_COLUMNS
        if column not in df.columns
    ]

    if missing_columns:
        return {
            "valid": False,
            "errors": [
                f"Missing required columns: {missing_columns}"
            ],
        }

    if df.empty:
        return {
            "valid": False,
            "errors": ["Dataset contains no rows"],
        }

    numeric_columns = [
        "cycle",
        "temperature_c",
        "voltage_v",
        "current_a",
        "pressure_kpa",
        "vibration_mm_s",
    ]

    errors = []

    for column in numeric_columns:
        if not pd.api.types.is_numeric_dtype(df[column]):
            errors.append(
                f"Column '{column}' must contain numeric values"
            )

    return {
        "valid": len(errors) == 0,
        "errors": errors,
    }