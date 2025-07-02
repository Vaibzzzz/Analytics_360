import pandas as pd
from models import ChartRequest, ChartResponse

def apply_filters(df: pd.DataFrame, filters: list):
    for f in filters:
        if f.operator == "equals":
            df = df[df[f.field] == f.value]
        elif f.operator == "in":
            df = df[df[f.field].isin(f.value)]
        elif f.operator == "gt":
            df = df[df[f.field] > f.value]
        elif f.operator == "lt":
            df = df[df[f.field] < f.value]
    return df

def generate_chart_data(df: pd.DataFrame, req: ChartRequest) -> ChartResponse:
    df = apply_filters(df, req.filters or [])

    if req.aggregation == "sum":
        grouped = df.groupby(req.xField)[req.yField].sum().reset_index()
    elif req.aggregation == "avg":
        grouped = df.groupby(req.xField)[req.yField].mean().reset_index()
    elif req.aggregation == "count":
        grouped = df.groupby(req.xField)[req.yField].count().reset_index()
    else:
        raise ValueError("Invalid aggregation")

    chart_type = req.chartType

    # Pie chart requires name-value format
    if chart_type == "pie":
        series = [{
            "type": "pie",
            "data": [
                {"name": str(x), "value": y}
                for x, y in zip(grouped[req.xField], grouped[req.yField])
            ],
        }]
    else:
        series = [{
            "type": chart_type,
            "data": grouped[req.yField].tolist(),
        }]

    return ChartResponse(
        xAxis=grouped[req.xField].astype(str).tolist(),
        yAxis=grouped[req.yField].tolist(),
        series=series
    )
