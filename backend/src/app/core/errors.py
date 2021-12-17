class ErrorCode:
    INVALID_INPUT = 'INVALID_INPUT'


invalid_input = {
    "message": "Invalid input data",
    "code": ErrorCode.INVALID_INPUT
}

def create_http_exception_detail(message: str, code: int = 0, info: dict = None) -> dict:
    return {
        "code": code,
        "message": message,
        "info": info
    }