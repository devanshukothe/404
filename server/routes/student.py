from fastapi import APIRouter, Depends
from dependencies import get_user_email
from supabase_client import supabase

router = APIRouter()

@router.get('/details')
def get_student_details(email : str = Depends(get_user_email)):

    user_details = dict(supabase.table('Student').select("*").is_("email", email).execute())
    return user_details
