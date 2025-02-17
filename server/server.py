from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from os import getenv
from supabase import create_client, Client
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

SECRET_KEY = getenv('SECRET_KEY')
ALGORITHM = getenv('ALGORITHM')
supabase_url = getenv('SUPABASE_URL')
supabase_key = getenv('SUPABASE_KEY')

supabase: Client = create_client(supabase_url, supabase_key)

class User(BaseModel):
    role: str
    data: dict

class Student(BaseModel):
    branch: str
    club: str
    collegeRegNo: str
    email: str
    fullName: str
    parentEmail: str
    parentPhone: int
    position: str
    profilePhoto: str
    year: str
    password: str

class Faculty(BaseModel):
    collegeId: str
    department: str
    desgination: str
    email: str
    fullName: str
    phone: int
    profilePhoto: str
    password: str

class LoginDetails(BaseModel):
    email : str
    password : str

server = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "http://192.168.1.138:5173"
]

server.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@server.get('/')
def home():
    return "Hello world!"

@server.post('/signup')
def signup(user: User):
    
    if user.role == "student":
        validated_user = Student(**user.data)
    elif user.role == "faculty":
        validated_user = Faculty(**user.data)
    else:
        raise HTTPException(status_code=400, detail="Invalid role. Must be 'student' or 'faculty'.")

    response = supabase.auth.sign_up({
        "email": validated_user.email,
        "password": validated_user.password
    })

    supabase.table(user.role.capitalize()).insert(dict(validated_user)).execute()

    if response and response.user:
        return {"status": "Successfully signed up"}
    
    raise HTTPException(status_code=400, detail="Signup failed. Email may already be in use.")

@server.post('/signin')
def signin(user : LoginDetails):
    responce = supabase.auth.sign_in_with_password({
        "email" : user.email,
        "password" : user.password
    })

    if responce.session :
        return {
            "access_token" : responce.session.access_token,
            "refresh_token" : responce.session.refresh_token
        }
    else :
        raise HTTPException(status_code=400, detail="Signin failed. Email may not be verifed yet.")