from fastapi import APIRouter

router = APIRouter()

@router.post('/register')
def register_the_election():
    return "hi"

@router.post('/apply_as_candidate')
def apply_as_candiate():
    pass

@router.get('/candidates')
def get_election_candiates():
    return "working..."

@router.post('/vote')
def vote():
    pass