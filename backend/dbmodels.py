from sqlmodel import Field, Session, SQLModel, create_engine, select
import uuid
import time

# password is raw-text for now. VERY INSECURE
class User(SQLModel, table=True):
    username: str = Field(index=True, primary_key=True)
    password: str = Field()
    session: uuid.UUID = Field(default_factory=uuid.uuid4) # For sessions-lite
    lastTime: float = Field(default=time.time())
