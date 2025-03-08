from dotenv import load_dotenv
import os

class Config:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Config, cls).__new__(cls)
            load_dotenv()  # Load environment variables from .env
        return cls._instance

    @property
    def database_url(self):
        return os.getenv("POSTGRES_URL")

    @property
    def stock_api_key(self):
        return os.getenv("STOCK_API_KEY")


# Singleton instance
config = Config()