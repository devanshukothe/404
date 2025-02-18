from typing import Annotated
from classModels import TokenRequest
from fastapi import Header, HTTPException
from supabase_client import supabase

def get_user_email(tokens : Annotated[TokenRequest, Header()]):
    responce = supabase.auth.get_user(tokens.access_token)
    if responce.user :
        return responce.user.email

    else :
        raise HTTPException(status_code=404, detail="User details not found, may be access token is incorrect or failed.")  
