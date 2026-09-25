import pandas as pd


def generate_correlation_matrix(df: pd.DataFrame) -> dict:
    numeric_df = df.select_dtypes(include="number")

    correlation = numeric_df.corr()

    return correlation.round(3).to_dict()