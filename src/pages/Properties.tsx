import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building, MapPin, ChevronRight } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";

interface Property {
  id: string;
  address: string;
  type: string;
  zone: string;
  description: string;
  icon: React.ReactNode;
}

const sampleProperties: Property[] = [
  {
    id: "1",
    address: "Urban Standard Lot (> 300m²)",
    type: "Residential",
    zone: "R1 / R2 / R3 / R4",
    description: "Standard urban residential lot greater than 300m²",
    icon: <Home className="h-6 w-6" />
  },
  {
    id: "2",
    address: "Rural/Large Lot Residential (> 300m²)",
    type: "Residential",
    zone: "R5 / RU1 / RU2 / RU3 / RU4 / RU5 / RU6",
    description: "Large lot residential or rural property greater than 300m²",
    icon: <Building className="h-6 w-6" />
  },
  {
    id: "3",
    address: "Small Lots (< 300m²) - Residential",
    type: "Residential",
    zone: "R1 / R2 / R3 / R4",
    description: "Small residential lot less than 300m²",
    icon: <Home className="h-6 w-6" />
  },
  {
    id: "4",
    address: "Small Lots (< 300m²) - Rural",
    type: "Rural",
    zone: "R5 / RU1 / RU2 / RU3 / RU4 / RU5 / RU6",
    description: "Small rural lot less than 300m²",
    icon: <MapPin className="h-6 w-6" />
  }
];

const Properties = () => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePropertySelect = (propertyId: string) => {
    setSelectedProperty(propertyId);
  };

  const handleContinue = () => {
    if (selectedProperty) {
      navigate(`/structure/${selectedProperty}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Select Your Property
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your property from our sample database to check if your proposed development qualifies as exempt development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          {sampleProperties.map((property, index) => (
            <Card
              key={property.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-card hover:scale-105 ${
                selectedProperty === property.id 
                  ? 'ring-2 ring-primary shadow-hero' 
                  : 'hover:shadow-lg'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handlePropertySelect(property.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {property.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-sans">{property.address}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {property.type} • {property.zone}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {property.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="hero"
            size="lg"
            onClick={handleContinue}
            disabled={!selectedProperty}
            className="min-w-40"
          >
            Continue to Structure Details
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <Disclaimer />
      </div>
    </div>
  );
};

export default Properties;
