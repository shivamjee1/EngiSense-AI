import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd


def generate_correlation_heatmap(
    df: pd.DataFrame,
    output_path: str,
) -> str:
    numeric_df = df.select_dtypes(include="number")
    correlation = numeric_df.corr()

    plt.figure(figsize=(10, 7))

    sns.heatmap(
        correlation,
        annot=True,
        fmt=".2f",
        cmap="coolwarm",
        center=0,
    )

    plt.title("Engineering Parameter Correlation")
    plt.tight_layout()
    plt.savefig(output_path)
    plt.close()

    return output_path