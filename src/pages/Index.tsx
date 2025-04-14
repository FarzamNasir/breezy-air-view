
import { useMockData } from "@/hooks/useMockData";
import Navbar from "@/components/Navbar";
import TemperatureCard from "@/components/TemperatureCard";
import HumidityCard from "@/components/HumidityCard";
import DataChart from "@/components/DataChart";

const Dashboard = () => {
  const {
    currentReading,
    historicalData,
    temperatureUnit,
    toggleTemperatureUnit,
    getDisplayTemperature
  } = useMockData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Air Monitoring Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Real-time temperature and humidity monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <TemperatureCard
            temperature={getDisplayTemperature(currentReading.temperature)}
            unit={temperatureUnit}
            timestamp={currentReading.timestamp}
            onToggleUnit={toggleTemperatureUnit}
          />
          <HumidityCard
            humidity={currentReading.humidity}
            timestamp={currentReading.timestamp}
          />
        </div>

        <div className="mb-8">
          <DataChart 
            data={historicalData} 
            temperatureUnit={temperatureUnit} 
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
