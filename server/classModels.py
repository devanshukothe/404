from pydantic import BaseModel

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

class TokenRequest(BaseModel):
    access_token : str
    refresh_token : str