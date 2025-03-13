import pandas as pd
from datetime import datetime

data_stock_price_by_category = [[], [], [], []]
data_stock_sent_by_category - [[], [], [], []]

# Frontend vertical slice format 
# x: date
# y: stock(s) d%, avg sentiment for category

# stocks missing dates, sentiment has full range.

# Semiconductors NVDA, INTC
# Cloud Services MSFT, AMZN, GOOGL
# AI Software TSLA, META
# Cybersecurity CRWD, PANW

stock_to_category_map = {
	"NVDA" : 1,
	"INTC" : 1,

	"MSFT" : 2,
	"AMZN" : 2,
	"GOOGLE" : 2,

	"TSLA" : 3,
	"META" : 3,

	"CRWD" : 4,
	"PANW" : 4
}

stock_to_col_idx_map = {
	"NVDA" : 2,
	"INTC" : 4,

	"MSFT" : 6,
	"AMZN" : 8,
	"GOOGLE" : 10,

	"TSLA" : 12,
	"META" : 14,

	"CRWD" : 16,
	"PANW" : 18
}

class RawSlice:
	date : Timestamp
	avg_sentiment: float
	num_stocks : int
	stock_prices : []

category_1_slice = {

}

def append_stock_data(category, val):
	arrayIdx = category - 1
	data_stock_price_by_category[arrayIdx].append(val)

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

	# Add dates to know which rows to ignore for sentiment csv
	for idx, row in df_stock.iterrows():
		date_str = row['Date'].strftime("%m-%d-%Y")
		dates.add(row['Date'])

		# We need to get a vertical "slice" for every iteration.
		# For every "change" col
		#	- get which category col belongs to (based on stock ticker)
		#	- append change col for stock into category's array for prices
		