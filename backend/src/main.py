#Copy and paste your work, or start typing.
#Example code for pulling data from yahoo.

import pandas as pd
import yfinance as yf
import pickle
import requests
import lxml
import bs4 as bs
from datetime import datetime
from firebase import firebase
from requests.exceptions import HTTPError, ConnectionError
import pickle
import sys

# this section is for hacker news api

# returns a list of the top 500 story ids on hn
def get_top_story_ids(conn):
        while True:
            try:
                item = conn.get('/v0', 'beststories')
                break
            except HTTPError:
                print("HTTPError! Retrying!")
            except ConnectionError:
                print("ConnectionError! Retrying!")
        return item

def fetch_stories(conn, f):

    print("Getting story IDs")
    story_ids = get_top_story_ids(conn)
    for i in range(5):
    # for id in story_ids:
        try:
            # gets the contents of each story (news link, author, date, kids, etc)
            story = conn.get('/v0/item', story_ids[i])
            print(story) # printing to see all the contents but the tons of numbers arent necessary
            if story is not None:
                # loops over the kids (comments) and prints the text of each comment
                kids = story['kids']
                for k in kids:
                    kid = conn.get('/v0/item', k)
                    print(kid['text'])
        except HTTPError:
            print("HTTPError! Retrying!")
        except ConnectionError:
            print("ConnectionError! Retrying!")
   
    """
    # save every 100 stories
    if (i % 100 == 0): 
        with open(f, 'wb') as af: 
            pickle.dump(stories, af) 
        print("Last dumped story ", i-1, ' Total stories', len(stories))
    with open(f, 'wb') as af: 
        pickle.dump(stories, af) 
    return stories
    """


HN_BASE = "https://hacker-news.firebaseio.com"

hn_firebase_conn = firebase.FirebaseApplication(HN_BASE)

f = 'stories_2016.pickle'
fetch_stories(hn_firebase_conn, f)

sys.exit(0)

# below here is for the yahhoo finance api to get stock ticker info

# Define the S&P 500 tickers
# For demonstration purposes, using a small subset of tickers. Replace with the full list of S&P 500 tickers.
tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN']
"""
resp = requests.get('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')        
soup = bs.BeautifulSoup(resp.text,'lxml')        
table = soup.find('table', {'class': 'wikitable sortable'})        

tickers = []

for row in table.findAll('tr')[1:]:
    ticker = row.findAll('td')[0].text
    tickers.append(ticker)

with open("sp500tickers.pickle", "wb") as f:
    pickle.dump(tickers, f)
print(tickers)
"""
# Define the time period
end_date = datetime.now().strftime('%Y-%m-%d')
start_date = (datetime.now() - pd.DateOffset(years=1)).strftime('%Y-%m-%d')

# get a hacker news story for a certain day
# determine the stock ticker for that story
# calculate its sentiment
# get the stock price for each day from the day of the story +/- 3 days
# calculate the stock price change and see if it correlates to sentiment

end_date = '2024-07-05'
start_date = '2019-01-01'

# Initialize an empty list to collect data
all_data = []

# Pull data for each ticker
for ticker in tickers:
    stock_data = yf.download(ticker, start=start_date, end=end_date)
    stock_data['Name'] = ticker
    all_data.append(stock_data)
    print('***')
    print(stock_data)
    print('***')

# Concatenate all data into a single DataFrame
data2 = pd.concat(all_data).reset_index()

# Save the DataFrame to a CSV file
data2.to_csv('2019-2024-stock-data.csv', index=False)
#print(data2.head())
#print("Data successfully pulled and saved to 2013-2019-stock-data.csv")