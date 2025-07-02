from pydantic import BaseModel
from typing import List, Literal, Optional, Union

class Filter(BaseModel):
    field: str
    operator: Literal["equals", "in", "gt", "lt"]
    value: Union[str, int, float, List[Union[str, int, float]]]

class ChartRequest(BaseModel):
    xField: str
    yField: str
    aggregation: Literal["sum", "avg", "count"]
    chartType: Literal["bar", "line", "pie", "scatter"] = "bar"
    filters: Optional[List[Filter]] = []
class SchemaField(BaseModel):
    name: str
    dtype: str

class ChartResponse(BaseModel):
    xAxis: List[str]
    yAxis: List[float]
    series: List[dict]
