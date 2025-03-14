import pandas as pd
from datetime import datetime
from dataclasses import dataclass, field
from typing import List

# Frontend vertical slice format 
# x: date
# y: stock(s) d%, avg sentiment for category

# stocks missing dates, sentiment has full range.

# Semiconductors NVDA, INTC
# Cloud Services MSFT, AMZN, GOOGL
# AI Software TSLA, META
# Cybersecurity CRWD, PANW

stock_data_map = {
	"NVDA"   : {"col": 2,  "cat": 1},
	"INTC"   : {"col": 4,  "cat": 1},

	"MSFT"   : {"col": 6,  "cat": 2},
	"AMZN"   : {"col": 8,  "cat": 2},
	"GOOGLE" : {"col": 10, "cat": 2},

	"TSLA"   : {"col": 12, "cat": 3},
	"META"   : {"col": 14, "cat": 3},

	"CRWD"   : {"col": 16, "cat": 4},
	"PANW"   : {"col": 18, "cat": 4}
}

@dataclass
class RawSlice:
	date : pd.Timestamp = None
	avg_sentiment: float = 0.0
	num_stocks : int = 0
	stock_prices : List[float] = field(default_factory=list) # Max 3 stocks per category
	stock_labels : List[str] = field(default_factory=list)

def print_slice(e : RawSlice):
	print("Raw Slice")
	print("\tnum_stocks: " + str(e.num_stocks))
	for i in range(0, len(e.stock_prices)):
		print("\t" + e.stock_labels[i] + ": " + str(e.stock_prices[i]))

raw_slices = [[], [], [], []]

def print_category_slices():
	
	for cat_slices in raw_slices: # loop category
		stock_names = cat_slices[0].stock_labels
		prices = [[], [], []]
		
		# loop individual slices in category, build per-stock prices arrays
		for i in range(0, len(cat_slices)): 
			s = cat_slices[i]
			prices[si % s.num_stocks] = s.stock_prices[si]
			si += 1

		print("Date: " + str(cat_slices[0].date))
		for i in range(0, cat_slices[0].num_stocks):
			print("\t" + stock_names[i] + ": " + str(prices[i]))

def initialize_data():
	# Read both files
	df_stock = pd.read_csv('backend/RealStockPriceandPerctChange.csv')
	df_sent = pd.read_csv('backend/Cleaned_Stock_Sentiment_Data.csv')

	dates = set()

	# Sort stock csv by date
	# sentinments csv is already sorted correctly
	df_stock['Date'] = pd.to_datetime(df_stock.Date, format = "%m/%d/%Y")
	df_stock.sort_values(by='Date', ascending = True, inplace = True)
	
	# Process categories one at a time (stock prices)
	# stocks csv has less dates, use it as dates validity as well.

	# Add dates to know which rows to ignore for sentiment csv
	for idx, row in df_stock.iterrows():
		date_str = row['Date'].strftime("%m-%d-%Y")
		dates.add(row['Date'])

		new_slice = RawSlice()

		# We need to get a vertical "slice" for every iteration.
		last_cat = None
		slice_array_idx = 0
		for index, (stock, data) in enumerate(stock_data_map.items(), start=0):
			category = data['cat']
			date = row['Date']
			slice_array_idx = category - 1

			# Save slice and start new one if date is different
			if (not last_cat and category > 1) or (last_cat and last_cat != category):
				print("arr idx: " + str(slice_array_idx))
				raw_slices[slice_array_idx].append(new_slice)
				new_slice = RawSlice()
			last_cat = category
			
			new_slice.num_stocks += 1
			new_slice.stock_prices.append(row.iloc[data['col']])
			new_slice.stock_labels.append(stock)
			
		raw_slices[slice_array_idx].append(new_slice) # Last slice

	print(raw_slices)