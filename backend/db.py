from config import config
from fastapi import Depends
from sqlmodel import Field, Session, SQLModel, create_engine, select
from dbmodels import User
import uuid
import time

engine = create_engine(str(config.database_url))
SQLModel.metadata.create_all(engine)

# AddUser(username, password)
# GetUser(username)

SessionTTL = 10*60 # in seconds

def GetSessionValid(session: uuid.UUID, lastTime: float):
	cur_time = time.time()
	return (cur_time - lastTime) <= SessionTTL


class DatabaseClient:

	def AddUser(self, username, password):
		with Session(engine) as session:
			new_user = User(username = username, password = password)
			session.add(new_user)
			session.commit()

	def GetUser(self, username):
		with Session(engine) as session:
			statement = select(User).where(User.username == username)
			user = session.exec(statement).first()
			return user

	# Simply updates lastTime, TTL for session is 10 minutes
	def UpdateUserSession(self, username):
		with Session(engine) as session:
			user = self.GetUser(username)
			if user:
				user.lastTime = time.time()
				session.add(user)
				session.commit()
				session.refresh(user)
			# else:
				# TODO(Darrell): Logging System?