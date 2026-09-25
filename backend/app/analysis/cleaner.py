import pandas as pd


def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    cleaned_df = df.copy()

    cleaned_df = cleaned_df.drop_duplicates()
    cleaned_df = cleaned_df.dropna(how="all")

    return cleaned_df