
import { useState, useEffect } from "react";

type TemperatureUnit = "C" | "F";

interface ReadingData {
  temperature: number;
  humidity: number;
  timestamp: string;
}

interface HistoricalData {
  time: string;
  temperature: number;
  humidity: number;
}

const generateMockHistoricalData = (): HistoricalData[] => {
  const data: HistoricalData[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: Math.round((22 + Math.sin(i / 3) * 3) * 10) / 10,
      humidity: Math.round((50 + Math.cos(i / 2) * 15) * 10) / 10
    });
  }
  
  return data;
};

export function useMockData(refreshInterval = 5000) {
  const [currentReading, setCurrentReading] = useState<ReadingData>({
    temperature: 24.5,
    humidity: 45,
    timestamp: new Date().toLocaleTimeString(),
  });

  const [historicalData, setHistoricalData] = useState<HistoricalData[]>(
    generateMockHistoricalData()
  );

  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("C");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTemp = 22 + Math.random() * 6;
      const newHumidity = 40 + Math.random() * 20;
      
      setCurrentReading({
        temperature: Math.round(newTemp * 10) / 10,
        humidity: Math.round(newHumidity * 10) / 10,
        timestamp: new Date().toLocaleTimeString(),
      });
      
      setHistoricalData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temperature: Math.round(newTemp * 10) / 10,
          humidity: Math.round(newHumidity * 10) / 10
        });
        return newData;
      });
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  const convertTemperature = (temp: number, toUnit: TemperatureUnit): number => {
    if (toUnit === "F") {
      return Math.round((temp * 9/5 + 32) * 10) / 10;
    }
    return temp;
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === "C" ? "F" : "C");
  };

  const getDisplayTemperature = (temp: number): number => {
    return convertTemperature(temp, temperatureUnit);
  };

  return {
    currentReading,
    historicalData,
    temperatureUnit,
    toggleTemperatureUnit,
    getDisplayTemperature,
  };
}
