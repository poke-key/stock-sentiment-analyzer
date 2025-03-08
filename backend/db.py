from config import config
from fastapi import Depends
from sqlmodel import Field, Session, SQLModel, create_engine, select
from dbmodels import User

engine = create_engine(str(config.database_url))
SQLModel.metadata.create_all(engine)

# AddUser(username, password)
# GetUser(username)

def get_session():
    with Session(engine) as session:
        yield session

class DatabaseClient:

	def AddUser(self, username, password, session: Session = Depends(get_session)):
		new_user = User(name = username, password = password)
		session.add(new_user)
		session.commit()

	def GetUser(self, username, session: Session = Depends(get_session)):
		statement = select(User).where(User.username == username)
		user = session.exec(statement).first()
		return user