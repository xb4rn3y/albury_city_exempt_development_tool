import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ExternalLink, Ruler } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";

const LotSizeCheck = () => {
  const [knowsLotSize, setKnowsLotSize] = useState<string>("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (knowsLotSize === "yes") {
      navigate("/properties");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 p-4">
      <div className="max-w-4xl mx-auto space-y-8 pt-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Lot Size Information Check
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We also need to know if you're familiar with your property's lot size to provide accurate guidance.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              Do you know your property's lot size?
            </CardTitle>
            <CardDescription>
              Lot size is important for determining setback requirements and permitted structures.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={knowsLotSize} onValueChange={setKnowsLotSize}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes, I know my lot size</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No, I need to find out my lot size</Label>
              </div>
            </RadioGroup>

            {knowsLotSize === "no" && (
              <div className="p-4 bg-muted rounded-lg space-y-4">
                <h3 className="font-semibold">How to find your lot size:</h3>
                <ol className="space-y-2 text-sm">
                  <li><strong>Search for the Property:</strong> Use the search function to find your property by address or lot number.</li>
                  <li><strong>Measure the Area:</strong> Select the measurement tool, click and drag to outline the property boundary, and the area will be displayed in the map tools menu.</li>
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
                  Once you've found your lot size information, come back and select "Yes" above to continue.
                </p>
              </div>
            )}

            <Button 
              onClick={handleContinue}
              disabled={knowsLotSize !== "yes"}
              className="w-full"
            >
              Continue to Property Selection
            </Button>
          </CardContent>
        </Card>

        <Disclaimer />
      </div>
    </div>
  );
};

export default LotSizeCheck;
