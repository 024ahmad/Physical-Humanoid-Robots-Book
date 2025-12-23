from fastapi import HTTPException
import logging

def handle_api_key_validation():
    """
    Utility function to verify API keys are accessible
    """
    import os
    from app.config.settings import REQUIRED_ENV_VARS

    missing_keys = []
    for var in REQUIRED_ENV_VARS:
        if not os.getenv(var):
            missing_keys.append(var)

    if missing_keys:
        raise ValueError(f"The following required environment variables are not set: {', '.join(missing_keys)}")

    # Log that verification was successful
    logging.info("All required API keys are properly configured")
    return True

def handle_error(error_msg: str, status_code: int = 500):
    """
    Generic error handler
    """
    logging.error(error_msg)
    raise HTTPException(status_code=status_code, detail=error_msg)