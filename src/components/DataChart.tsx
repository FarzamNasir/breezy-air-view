
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataChartProps {
  data: Array<{
    time: string;
    temperature: number;
    humidity: number;
  }>;
  temperatureUnit: "C" | "F";
}

const DataChart = ({ data, temperatureUnit }: DataChartProps) => {
  // Convert temperature if needed
  const chartData = data.map(item => ({
    ...item,
    temperature: temperatureUnit === "F" 
      ? Math.round((item.temperature * 9/5 + 32) * 10) / 10 
      : item.temperature
  }));

  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700">24-Hour Readings</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }} 
              interval="preserveStartEnd"
              tickMargin={10}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              domain={['auto', 'auto']}
              tick={{ fontSize: 12 }}
              tickMargin={10}
              label={{ 
                value: `Temperature (°${temperatureUnit})`, 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fontSize: 12, fill: '#0EA5E9' }
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              tickMargin={10}
              label={{ 
                value: 'Humidity (%)', 
                angle: 90, 
                position: 'insideRight',
                style: { textAnchor: 'middle', fontSize: 12, fill: '#0D9488' }
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '6px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f0f0'
              }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              name={`Temperature (°${temperatureUnit})`}
              stroke="#0EA5E9"
              dot={false}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              name="Humidity (%)"
              stroke="#0D9488"
              dot={false}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DataChart;
