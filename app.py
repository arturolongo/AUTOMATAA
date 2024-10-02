# app.py (Backend - FastAPI)

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel

app = FastAPI()

# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permitir el frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los headers
)

class CodeResponse(BaseModel):
    valid_codes: List[str]
    invalid_codes: List[dict]

@app.post("/cargar-archivo/", response_model=CodeResponse)
async def cargar_archivo(file: UploadFile = File(...)):
    content = await file.read()
    text = content.decode("utf-8")
    
    valid_codes = []
    invalid_codes = []
    
    for line in text.splitlines():
        if "509" in line:
            invalid_codes.append({"code": line, "error": "Segmento (30) no válido"})
        else:
            valid_codes.append(line)
    
    return {"valid_codes": valid_codes, "invalid_codes": invalid_codes}
