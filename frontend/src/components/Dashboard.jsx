import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Bell, BookMarked, Settings, Microchip } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import Dropdown from './ui/dropdown.jsx';
import { techStockOptions } from '../data/stocks.jsx'

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [manualStockInput, setManualStockInput] = useState(null);
  const [sentimentData, setSentimentData] = useState([]);

  const handleDropdownChange = (selectedOption) => {
    if(selectedOption){
      setSelectedStock(selectedOption.value);
    }
    else {
      setSelectedStock(null)
    }
  };

  const manualStockInputChanged = (e) => {
    setManualStockInput(e.target.value);
  }

  const onGoButtonClicked = () => {
    setSelectedStock(manualStockInput);
  };

  useEffect(() => {
    console.log("useEffect: selectedStock=" + selectedStock);
  }, [selectedStock]);
  
  // Mock data - replace with actual API calls
  const mockSentimentData = [
    { date: '02-01', price1: 150.20, price2: 140.20, price3: 130.20, sentiment: 0.5 },
    { date: '02-02', price1: 152.50, price2: 142.50, price3: 131.50, sentiment: 0.2 },
    { date: '02-03', price1: 151.30, price2: 141.30, price3: 134.30, sentiment: 0.8 },
    { date: '02-04', price1: 153.90, price2: 143.90, price3: 137.90, sentiment: 0.4 },
    { date: '02-05', price1: 155.20, price2: 145.20, price3: 132.20, sentiment: 0.7 }
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
                <Search className="text-gray-400" />
                <input 
                  type="text"
                  placeholder="Enter stock ticker..."
                  className="w-full p-2 border rounded bg-gray-200 text-gray-800"
                  onChange={manualStockInputChanged}
                />
                <button 
                  className='p-2 px-4 border rounded bg-violet-500 hover:bg-violet-600 text-white'
                  onClick={onGoButtonClicked}>
                    Go
                  </button>
              </div>
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
                  <YAxis yAxisId="right" orientation="right" domain={[-1, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="price1" 
                    stroke="#2196AD" 
                    name="Stock Price Change1"
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="price2" 
                    stroke="#2106F7" 
                    name="Stock Price Change2"
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="price3" 
                    stroke="#F100F3" 
                    name="Stock Price Change2"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="sentiment" 
                    stroke="#4CAF50" 
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