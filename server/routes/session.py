from fastapi import APIRouter, HTTPException, Header
from classModels import User, Student, Faculty, LoginDetails, TokenRequest
from supabase_client import supabase
from typing import Annotated

router = APIRouter()

@router.post('/signup')
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

@router.post('/signin')
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

@router.post('/signout')
def signout(tokens : Annotated[TokenRequest, Header()]):
    try:
        response = supabase.auth.sign_out(tokens.access_token)

        if response.get("error"):
            raise HTTPException(status_code=400, detail="Signout failed")

        return {"message": "User signout successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))