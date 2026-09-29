from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "EngiSense AI"
    APP_VERSION: str = "0.1.0"
    ENVIRONMENT: str = "development"

    DATABASE_URL: str

    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    HF_TOKEN: str | None = None
    LLM_MODEL: str = "openai/gpt-oss-120b"

    SUPABASE_URL: str
    SUPABASE_SECRET_KEY: str
    SUPABASE_STORAGE_BUCKET: str = "engisense-documents"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()