from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_user_id
from supabase_client import supabase

router = APIRouter()

@router.get('/details')
def get_faculty_details(id : str = Depends(get_user_id)):

    user_details = dict(supabase.table('Faculty').select("*").eq("id", id).execute())

    if user_details['count'] != 0:
        return user_details
    else :
        raise HTTPException(status_code=404, detail="User details not found, may be access token is incorrect or failed.")
