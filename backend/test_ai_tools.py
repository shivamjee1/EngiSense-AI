import pandas as pd

from app.ai.registry import get_available_tools, get_tool


df = pd.DataFrame(
    {
        "temperature_c": [70, 72, 71, 95, 73],
        "voltage_v": [3.3, 3.31, 3.29, 3.8, 3.3],
        "current_a": [1.2, 1.3, 1.25, 2.1, 1.22],
    }
)


print("\nAVAILABLE TOOLS")
print("================")

for tool in get_available_tools():
    print(tool)


print("\nDATASET SUMMARY")
print("================")

summary_tool = get_tool("dataset_summary")
print(summary_tool.execute(df=df))


print("\nSTATISTICS")
print("================")

statistics_tool = get_tool("statistics")
print(statistics_tool.execute(df=df))


print("\nCORRELATION")
print("================")

correlation_tool = get_tool("correlation")
print(correlation_tool.execute(df=df))


print("\nOUTLIERS")
print("================")

outlier_tool = get_tool("outlier_detection")
print(outlier_tool.execute(df=df))