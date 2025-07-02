import pandas as pd

_cached_df = None

def cache_dataframe(df: pd.DataFrame):
    global _cached_df
    _cached_df = df

def get_dataframe() -> pd.DataFrame:
    if _cached_df is None:
        raise ValueError("No dataframe cached")
    return _cached_df
