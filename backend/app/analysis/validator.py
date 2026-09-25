import pandas as pd


REQUIRED_COLUMNS = [
    "cycle",
    "temperature_c",
    "voltage_v",
    "current_a",
    "pressure_kpa",
    "vibration_mm_s",
]


def validate_dataframe(df: pd.DataFrame) -> dict:
    missing_columns = [
        column for column in REQUIRED_COLUMNS
        if column not in df.columns
    ]

    if missing_columns:
        return {
            "valid": False,
            "missing_columns": missing_columns,
        }

    return {
        "valid": True,
        "missing_columns": [],
    }