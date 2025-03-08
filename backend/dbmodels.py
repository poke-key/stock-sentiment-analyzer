from sqlmodel import Field, Session, SQLModel, create_engine, select

# password is raw-text for now. VERY INSECURE
class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    password: str = Field(index=True)
