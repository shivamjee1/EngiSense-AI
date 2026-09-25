import matplotlib.pyplot as plt
import pandas as pd


def generate_trend_chart(
    df: pd.DataFrame,
    x_column: str,
    y_column: str,
    output_path: str,
) -> str:
    plt.figure(figsize=(10, 5))

    plt.plot(
        df[x_column],
        df[y_column],
        marker="o",
    )

    plt.xlabel(x_column)
    plt.ylabel(y_column)
    plt.title(f"{y_column} vs {x_column}")
    plt.grid(True)

    plt.tight_layout()
    plt.savefig(output_path)
    plt.close()

    return output_path