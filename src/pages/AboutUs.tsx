
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Gauge, Droplets, Clock, CloudSun } from "lucide-react";

const AboutUs = () => {
  const features = [
    {
      icon: <Gauge className="h-8 w-8 text-air-blue" />,
      title: "Real-Time Monitoring",
      description: "View temperature and humidity readings as they happen with automatic updates."
    },
    {
      icon: <CloudSun className="h-8 w-8 text-air-blue" />,
      title: "Weather Conditions",
      description: "Monitor indoor and outdoor environmental conditions with our advanced sensors."
    },
    {
      icon: <Clock className="h-8 w-8 text-air-teal" />,
      title: "Historical Data",
      description: "Access historical data through interactive charts to track patterns and trends."
    },
    {
      icon: <Droplets className="h-8 w-8 text-air-teal" />,
      title: "Humidity Analysis",
      description: "Get detailed humidity analysis with comfort level indicators and recommendations."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About AirMonitor</h1>
            <p className="text-lg text-gray-600">
              Monitoring the air quality of your environment, simplified.
            </p>
          </div>

          <Card className="mb-10 shadow-md animate-fade-in">
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  At AirMonitor, we're dedicated to providing accurate, real-time environmental monitoring solutions that help you maintain optimal comfort and health in your spaces.
                </p>
                <p className="text-gray-600 mb-4">
                  Our intelligent monitoring system tracks temperature and humidity levels, giving you insights into your air quality and helping you make informed decisions about your environment.
                </p>
                <p className="text-gray-600">
                  Whether you're monitoring a home, office, greenhouse, or server room, AirMonitor provides the data you need in a clear, intuitive interface.
                </p>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow animate-fade-in">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-gray-50">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-8 shadow-md animate-fade-in">
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  Have questions about AirMonitor? We're here to help!
                </p>
                <p className="text-gray-600">
                  Email us at <a href="mailto:info@airmonitor.com" className="text-air-blue hover:underline">info@airmonitor.com</a> or call us at <span className="text-gray-700 font-medium">(555) 123-4567</span>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
