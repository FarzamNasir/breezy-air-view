
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Code, Terminal, Loader2 } from "lucide-react";

const Editor = () => {
  const [code, setCode] = useState<string>(
`// Write your code here
function calculateHeatIndex(temperature, humidity) {
  // A simplified heat index calculation
  return (
    temperature + 
    (humidity / 100) * 10
  );
}

// Example usage
const result = calculateHeatIndex(25, 60);
console.log("Heat index:", result);`
  );
  
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleUpdateCode = () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      try {
        // Capture console.log output
        const originalConsoleLog = console.log;
        let logs: string[] = [];
        
        console.log = (...args) => {
          logs.push(args.map(arg => String(arg)).join(' '));
        };
        
        // Execute the code in a try-catch block
        try {
          // eslint-disable-next-line no-new-func
          new Function(code)();
        } catch (error) {
          logs.push(`Error: ${error.message}`);
        }
        
        // Restore original console.log
        console.log = originalConsoleLog;
        
        // Update output
        setOutput(logs.join('\n'));
        toast.success("Code executed successfully!");
      } catch (error) {
        setOutput(`Error executing code: ${error.message}`);
        toast.error("Error executing code");
      } finally {
        setIsProcessing(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Code Editor</h1>
          <p className="text-gray-600 mt-2">
            Write and run JavaScript code to process air monitoring data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-md animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-700">
                <Code className="h-5 w-5 mr-2 text-air-blue" />
                Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={code}
                onChange={handleCodeChange}
                className="font-mono text-sm h-[400px] code-editor"
                placeholder="Write your JavaScript code here..."
              />
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={handleUpdateCode} 
                  disabled={isProcessing}
                  className="bg-air-blue hover:bg-air-blue/90"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    "Run Code"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-700">
                <Terminal className="h-5 w-5 mr-2 text-air-teal" />
                Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-md h-[400px] overflow-auto whitespace-pre-wrap">
                {output || "// Output will appear here after running your code"}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 shadow-md animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">Code Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-md border">
                <h3 className="font-medium mb-2">Temperature Conversion</h3>
                <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

const tempC = 25;
console.log(tempC + "°C is " + 
  celsiusToFahrenheit(tempC) + "°F");`}
                </pre>
              </div>
              <div className="p-4 bg-gray-50 rounded-md border">
                <h3 className="font-medium mb-2">Dew Point Calculation</h3>
                <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`function calculateDewPoint(temp, humidity) {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temp) / (b + temp)) + 
    Math.log(humidity / 100);
  return (b * alpha) / (a - alpha);
}

console.log("Dew point: " + 
  calculateDewPoint(25, 60).toFixed(1) + "°C");`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Editor;
