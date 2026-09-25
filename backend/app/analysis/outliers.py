import pandas as pd


def detect_outliers(df: pd.DataFrame) -> dict:
    numeric_df = df.select_dtypes(include="number")

    outliers = {}

    for column in numeric_df.columns:
        series = numeric_df[column]

        q1 = series.quantile(0.25)
        q3 = series.quantile(0.75)
        iqr = q3 - q1

        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr

        column_outliers = series[
            (series < lower_bound) | (series > upper_bound)
        ]

        outliers[column] = {
            "count": int(len(column_outliers)),
            "values": column_outliers.tolist(),
        }

    return outliers