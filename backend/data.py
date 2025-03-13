import pandas as pd
from datetime import datetime

data_category_1 = []
data_category_2 = []
data_category_3 = []
data_category_4 = []
data = []

# Frontend vertical slice format 
# x: date
# y: stock(s) d%, avg sentiment for category

# stocks missing dates, sentiment has full range.

# Semiconductors NVDA, INTC
# Cloud Services MSFT, AMZN
# AI Software TSLA, META)
# Cybersecurity CRWD, PANW

def initialize_data():
	# Read both files
	df_stock = pd.read_csv('backend/RealStockPriceandPerctChange.csv')
	df_sent = pd.read_csv('backend/Cleaned_Stock_Sentiment_Data.csv')

	dates = set()

	# Sort stock csv by date
	# sentinments csv is already sorted correctly
	print(df_stock) 
	df_stock['Date'] = pd.to_datetime(df_stock.Date, format = "%m/%d/%Y")
	df_stock.sort_values(by='Date', ascending = True, inplace = True)
	print(df_stock) 
	
	# Process categories one at a time (stock prices)
	# stocks csv has less dates, use it as dates validity as well.

	# Category 1
	for idx, row in df_stock.iterrows():
		print("New Date: " + row['Date'])
		dates.add(row['Date'])

