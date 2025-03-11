import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Bell, BookMarked, Settings, Microchip } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import Dropdown from './ui/dropdown.jsx';
import { techStockOptions } from '../data/stocks.jsx'

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [sentimentData, setSentimentData] = useState([]);

  const handleDropdownChange = (selectedOption) => {
    if(selectedOption){
      setSelectedStock(selectedOption.value);
    }
    else {
      setSelectedStock(null)
    }
  };
  
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
    <div className="w-screen h-screen bg-gray-100 flex flex-col gap-4 grid grid-cols-1">
      
      {/* Header */}
      <div className="mb-8 flex flex-col justify-center text-center">
        <h1 className="text-3xl font-bold text-gray-800">Stock Sentiment Analyzer</h1>
        <p className="text-gray-600">Real-time market sentiment analysis dashboard</p>
      </div>

      {/* Search Stocks and Graph */}
      <div className="flex justify-center justify-items-center gap-4">
        {/* Search and Groups Panel */}
        <Card className="">
          <CardHeader>
            <CardTitle>Search Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="text-gray-400" />
              <input 
                type="text"
                placeholder="Enter stock symbol..."
                className="w-64 p-2 border rounded bg-gray-200 text-gray-800"
              />
            </div>
            <div className="flex items-center space-x-2 mb-4">
            <Microchip className="text-gray-400 mt-2" />
            <Dropdown placeholder='Tech Stocks' options={techStockOptions} className='w-64' 
                      onChange={handleDropdownChange}/>
                {/* <button className="w-full p-2 text-left bg-blue-50 rounded hover:bg-blue-100">
                  Energy Sector
                </button> */}
            </div>
            
          </CardContent>
        </Card>

        {/* Main Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
          <LineChart data={sentimentData} width={600} height={300}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="price" 
                stroke="#2196F3" 
                name="Stock Price"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="sentiment" 
                stroke="#4CAF50" 
                name="Sentiment Score"
              />
            </LineChart>
          </CardContent>
        </Card>
      </div>

        {/* Sentiment Stats */}
        <div className='flex justify-center justify-items-center gap-4 max-h-fit'>
          <Card>
            <CardHeader>
              <CardTitle>Market Sentiment Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded">
                  <h3 className="font-semibold">Social Media Sentiment</h3>
                  <p className="text-2xl">0.82</p>
                  <p className="text-sm text-gray-600">Positive trend</p>
                </div>
                <div className="p-4 bg-blue-50 rounded">
                  <h3 className="font-semibold">News Sentiment</h3>
                  <p className="text-2xl">0.75</p>
                  <p className="text-sm text-gray-600">Neutral trend</p>
                </div>
                <div className="p-4 bg-purple-50 rounded">
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