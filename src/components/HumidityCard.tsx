
import { Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface HumidityCardProps {
  humidity: number;
  timestamp: string;
}

const HumidityCard = ({ humidity, timestamp }: HumidityCardProps) => {
  // Determine humidity level description and color
  const getHumidityInfo = (value: number): { label: string; color: string } => {
    if (value < 30) return { label: "Low", color: "text-amber-500" };
    if (value > 70) return { label: "High", color: "text-blue-600" };
    return { label: "Optimal", color: "text-green-500" };
  };

  const { label, color } = getHumidityInfo(humidity);

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl font-semibold text-gray-700">Humidity</CardTitle>
        <Droplets className="h-5 w-5 text-air-teal" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold my-4 flex items-end">
            <span className={color}>{humidity}</span>
            <span className="text-2xl ml-1 text-gray-500">%</span>
          </div>
          
          <div className="w-full mb-2">
            <Progress value={humidity} className="h-2" />
          </div>
          
          <div className="flex justify-between w-full text-xs text-gray-500 mb-4">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
          
          <div className="w-full p-2 rounded-md bg-gray-50 border mb-4">
            <span className="text-sm flex justify-center">
              Status: <span className={`font-medium ml-1 ${color}`}>{label}</span>
            </span>
          </div>
          
          <div className="w-full">
            <span className="text-sm text-gray-500">Last updated: {timestamp}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HumidityCard;
