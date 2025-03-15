import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Bell, BookMarked, Settings, Microchip } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import Dropdown from './ui/dropdown.jsx';
import { techStockOptions } from '../data/stocks.jsx'

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [sentimentData, setSentimentData] = useState([]);

  const [numStocks, setNumStocks] = useState(0);

  const handleDropdownChange = async (selectedOption) => {
    if(selectedOption){
      setSelectedStock(selectedOption.value);

      // Make request to backend for data based on category number (value)
      try {
        const response = await fetch("http://localhost:8000/api/category", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            username: sessionStorage.getItem("username"), 
            session: sessionStorage.getItem("session"),
            category: selectedOption.value }),
          });
      
          if (!response.ok) {
            throw new Error("Category request failed");
          }
        
          const responseData = await response.json();
          console.log(responseData)

          // Format responseData here for graph
          let graphData = [];
          for (let i = 0; i < responseData.length; i++) {
            let responseSlice = responseData[i];
            let numStocks = responseSlice["num_stocks"];
            let stockPrices = responseSlice["stock_prices"];
            let stockLabels = responseSlice["stock_labels"];
            let newSlice = {};

            newSlice["date"] = responseSlice["date"];
            newSlice["sentiment"] = responseSlice["avg_sentiment"];

            // Transform keys for stock prices and names into our data.
            for(let j = 0; j < numStocks; ++j){
              newSlice['price${j+1}'] = stockPrices[j];
            }

            graphData.push(newSlice);
          }

          setSentimentData(graphData);
        } 
        catch (error) {
        console.error("Error:", error);
        }
      
    }
    else {
      setSelectedStock(null)
    }
  };

  useEffect(() => {
    console.log("useEffect: selectedStock=" + selectedStock);
  }, [selectedStock]);
  
  // Mock data - replace with actual API calls
  const mockSentimentData = [
    { date: '2024-02-01', price: 150.20, sentiment: 0.75 },
    { date: '2024-02-02', price: 152.50, sentiment: 0.82 },
    { date: '2024-02-03', price: 151.30, sentiment: 0.68 },
    { date: '2024-02-04', price: 153.90, sentiment: 0.91 },
    { date: '2024-02-05', price: 155.20, sentiment: 0.88 }
  ];

  useEffect(() => {
    // Simulate data fetching
    setSentimentData(mockSentimentData);
  }, [selectedStock]);

  return (
    <div className="min-h-screen min-w-screen w-screen bg-gray-100 flex flex-col gap-4">
      
      {/* Header */}
      <div className="mb-8 flex flex-col justify-center text-center">
        <h1 className="text-3xl font-bold text-gray-800">Stock Sentiment Analyzer</h1>
        <p className="text-gray-600">Real-time market sentiment analysis dashboard</p>
      </div>

      {/* Search Stocks and Graph */}
      <div className='flex justify-center'>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Search */}
          <Card className="w-full h-full sm:place-self-center lg:place-self-end">
            <CardHeader>
              <CardTitle>Search Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
              <Microchip className="text-gray-400 mt-2" />
              <Dropdown placeholder='Tech Stocks' options={techStockOptions} className='w-full shrink' 
                        onChange={handleDropdownChange}/>
                  {/* <button className="w-full p-2 text-left bg-blue-50 rounded hover:bg-blue-100">
                    Energy Sector
                  </button> */}
              </div>
              
            </CardContent>
          </Card>

          {/* Graph */}
          <Card className='flex flex-col justify-center justify-items-center'>
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent className='w-fit h-fit'>
              <ResponsiveContainer minWidth={"500px"} width={"100%"} height={300}>
                <LineChart data={sentimentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="price1" 
                    stroke="#2106F3" 
                    name="Stock Price1"
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="price2" 
                    stroke="#2196F3" 
                    name="Stock Price2"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="sentiment" 
                    stroke="#4CAF50"
                    strokeDasharray="4"
                    name="Sentiment Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sentiment Stats */}
      <div className='flex justify-center justify-items-center gap-4 max-h-screen max-w-full'>
        <Card>
          <CardHeader>
            <CardTitle>Market Sentiment Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="py-4 px-10 bg-green-50 rounded">
                <h3 className="font-semibold">Social Media Sentiment</h3>
                <p className="text-2xl">0.82</p>
                <p className="text-sm text-gray-600">Positive trend</p>
              </div>
              <div className="py-4 px-10 bg-blue-50 rounded">
                <h3 className="font-semibold">News Sentiment</h3>
                <p className="text-2xl">0.75</p>
                <p className="text-sm text-gray-600">Neutral trend</p>
              </div>
              <div className="py-4 px-10 bg-purple-50 rounded">
                <h3 className="font-semibold">Overall Score</h3>
                <p className="text-2xl">0.78</p>
                <p className="text-sm text-gray-600">Bullish signal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;