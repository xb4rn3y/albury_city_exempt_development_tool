import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ExternalLink, MapPin } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";

const ZoneCheck = () => {
  const [knowsZone, setKnowsZone] = useState<string>("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (knowsZone === "yes") {
      navigate("/lot-size-check");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 p-4">
      <div className="max-w-4xl mx-auto space-y-8 pt-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Zone Information Check
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Before we proceed, we need to know if you're familiar with your property's residential zone classification.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Do you know which Residential Zone your property is in?
            </CardTitle>
            <CardDescription>
              This information is important for determining what structures are permitted on your property.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={knowsZone} onValueChange={setKnowsZone}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes, I know my residential zone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No, I need to find out my residential zone</Label>
              </div>
            </RadioGroup>

            {knowsZone === "no" && (
              <div className="p-4 bg-muted rounded-lg space-y-4">
                <h3 className="font-semibold">How to find your residential zone:</h3>
                <ol className="space-y-2 text-sm">
                  <li>1. Visit the NSW Planning Portal Spatial Viewer</li>
                  <li>2. Enter your property address in the search box</li>
                  <li>3. Click on "Search Results"</li>
                  <li>4. View your zone under the "Land Zoning Map" tab</li>
                </ol>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => window.open("https://www.planningportal.nsw.gov.au/spatialviewer/", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open NSW Planning Portal Spatial Viewer
                </Button>
                <p className="text-xs text-muted-foreground">
                  Once you've found your zone information, come back and select "Yes" above to continue.
                </p>
              </div>
            )}

            <Button 
              onClick={handleContinue}
              disabled={knowsZone !== "yes"}
              className="w-full"
            >
              Continue to Lot Size Check
            </Button>
          </CardContent>
        </Card>

        <Disclaimer />
      </div>
    </div>
  );
};

export default ZoneCheck;
