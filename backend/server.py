from fastapi import FastAPI, APIRouter, UploadFile, File, Form
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import base64

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    service: Optional[str] = None
    message: Optional[str] = None
    file_names: List[str] = Field(default_factory=list)
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactResponse(BaseModel):
    success: bool
    message: str

@api_router.get("/")
async def root():
    return {"message": "Kkemi Design Studio API"}

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(
    name: str = Form(...),
    email: str = Form(...),
    phone: Optional[str] = Form(None),
    service: Optional[str] = Form(None),
    message: Optional[str] = Form(None),
    files: List[UploadFile] = File(default=[]),
):
    file_names = []
    for f in files:
        if f.filename:
            file_names.append(f.filename)

    submission = ContactSubmission(
        name=name,
        email=email,
        phone=phone,
        service=service,
        message=message,
        file_names=file_names,
    )

    doc = submission.model_dump()
    await db.contact_submissions.insert_one(doc)
    doc.pop('_id', None)

    return ContactResponse(success=True, message="Contact form submitted successfully")

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contacts():
    contacts = await db.contact_submissions.find({}, {"_id": 0}).to_list(100)
    return contacts

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
