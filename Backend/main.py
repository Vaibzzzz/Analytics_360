from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

import pandas as pd
from chart_utils import generate_chart_data
from schema_cache import cache_dataframe, get_dataframe
from models import ChartRequest, ChartResponse, SchemaField

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # In production, use specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    try:
        df = pd.read_csv(file.file)
        cache_dataframe(df)
        schema = [{"name": col, "dtype": str(df[col].dtype)} for col in df.columns]
        return schema
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process file: {str(e)}")


@app.get("/schema", response_model=List[SchemaField])
def get_schema():
    try:
        df = get_dataframe()
        return [{"name": col, "dtype": str(df[col].dtype)} for col in df.columns]
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to get schema: {str(e)}")


@app.post("/chart", response_model=ChartResponse)
def chart(req: ChartRequest):
    try:
        print("Chart request received:", req)
        df = get_dataframe()
        return generate_chart_data(df, req)
    except Exception as e:
        print("Chart error:", str(e))
        raise HTTPException(status_code=400, detail=str(e))
