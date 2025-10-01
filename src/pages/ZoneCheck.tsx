import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ExternalLink, MapPin } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";
import { InlineHelp } from "@/components/InlineHelp";
import { FAQSection } from "@/components/FAQSection";

const ZoneCheck = () => {
  const [knowsZone, setKnowsZone] = useState<string>("");
  const navigate = useNavigate();

  const zoneFAQs = [
    {
      question: "What is a residential zone?",
      answer: "A residential zone is a classification that determines what types of buildings and activities are allowed on your property. Different zones (R1, R2, R3, etc.) have different requirements."
    },
    {
      question: "Why is my zone important?",
      answer: "Your zone determines setback requirements, building heights, and what structures qualify as exempt development. Some structures may be exempt in one zone but not in another."
    },
    {
      question: "Can I change my property's zone?",
      answer: "Changing a property's zone requires a planning proposal to council, which is a complex process. Most property owners work within their existing zone classification."
    }
  ];

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
              Do you know your property's Residential Zone?
              <InlineHelp content="Your residential zone (e.g., R1, R2, R3) determines what structures and developments are permitted on your property. You can find this information on the NSW Planning Portal." />
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

        <FAQSection faqs={zoneFAQs} className="max-w-2xl mx-auto" />

        <Disclaimer />
      </div>
    </div>
  );
};

export default ZoneCheck;
