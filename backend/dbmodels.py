from sqlmodel import Field, Session, SQLModel, create_engine, select

# password is raw-text for now. VERY INSECURE
class User(SQLModel, table=True):
    username: str = Field(index=True, primary_key=True)
    password: str = Field()
