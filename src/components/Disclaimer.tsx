import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Disclaimer = () => {
  return (
    <Card className="bg-muted/50 border-primary/20 mt-16">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-2">Important Disclaimer</p>
            <p>
              This tool provides guidance only and should not replace professional council or legal advice. 
              While we strive for accuracy, development requirements may change and individual circumstances 
              may vary. For official planning advice and to confirm compliance requirements, please contact 
              Albury City Council directly at (02) 6023 8111 or consult with a qualified planning professional.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Disclaimer;
