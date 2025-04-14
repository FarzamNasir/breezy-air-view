
import { Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TemperatureCardProps {
  temperature: number;
  unit: "C" | "F";
  timestamp: string;
  onToggleUnit: () => void;
}

const TemperatureCard = ({
  temperature,
  unit,
  timestamp,
  onToggleUnit,
}: TemperatureCardProps) => {
  // Determine color based on temperature range
  const getTemperatureColor = (temp: number, unit: string): string => {
    const tempC = unit === "F" ? (temp - 32) * 5/9 : temp;
    
    if (tempC < 18) return "text-blue-500";
    if (tempC > 26) return "text-red-500";
    return "text-green-500";
  };

  const tempColor = getTemperatureColor(temperature, unit);

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl font-semibold text-gray-700">Temperature</CardTitle>
        <Thermometer className="h-5 w-5 text-air-blue" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold my-4 flex items-end">
            <span className={tempColor}>{temperature}</span>
            <span className="text-2xl ml-1 text-gray-500">°{unit}</span>
          </div>
          
          <div className="w-full bg-gray-100 h-1 rounded-full mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 via-green-500 to-red-500 h-1 rounded-full" 
              style={{ width: '100%' }}
            />
          </div>
          
          <div className="flex justify-between w-full text-xs text-gray-500 mb-4">
            <span>Cool</span>
            <span>Ideal</span>
            <span>Warm</span>
          </div>
          
          <div className="flex justify-between w-full">
            <span className="text-sm text-gray-500">Last updated: {timestamp}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onToggleUnit}
              className="text-xs"
            >
              Switch to °{unit === "C" ? "F" : "C"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureCard;
