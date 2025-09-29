import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, MessageSquare, FileText, CheckCircle, Shield } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";

const Index = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Select Property",
      description: "Choose your property from our sample database of example properties"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Enter Details", 
      description: "Provide structure type, dimensions, and boundary distances"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Get Results",
      description: "Receive instant compliance assessment with relevant SEPP references"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient"></div>
        <div className="absolute inset-0 bg-primary/20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold font-sans text-white mb-6">
              Exempt Development
              <span className="block text-4xl md:text-5xl mt-2">
                Assessment Tool
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Quickly determine if your shed, patio, or structure qualifies as exempt development 
              under NSW SEPP regulations
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/zone-check')}
                className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FileText className="mr-2 h-5 w-5" />
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate('/chatbot')}
                className="text-lg px-8 py-4 border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Quick Chat
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our assessment tool guides you through a simple process to determine development compliance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="shadow-card hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up border-0 bg-white"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center pt-8 pb-4">
                  <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                    {step.icon}
                  </div>
                  <CardTitle className="text-xl text-primary mb-3">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <CardDescription className="text-base leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Why Use Our Assessment Tool?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Instant Assessment</h3>
                    <p className="text-muted-foreground">Get immediate feedback on whether your structure qualifies as exempt development</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Save Time & Money</h3>
                    <p className="text-muted-foreground">Avoid unnecessary development applications and associated fees</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">SEPP Compliant</h3>
                    <p className="text-muted-foreground">Based on current NSW State Environmental Planning Policy requirements</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-card p-8">
              <div className="text-center">
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">3 min</div>
                    <p className="text-sm text-muted-foreground">Average Assessment</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">100%</div>
                    <p className="text-sm text-muted-foreground">Free to Use</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                    <p className="text-sm text-muted-foreground">Available</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Fast, reliable development assessment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Ready to Check Your Development?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your assessment now or explore our resources to learn more about exempt development requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate('/zone-check')}
              className="text-lg px-8 py-4"
            >
              <Building2 className="mr-2 h-5 w-5" />
              Start Assessment
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/faq')}
              className="text-lg px-8 py-4"
            >
              <FileText className="mr-2 h-5 w-5" />
              View FAQ
            </Button>
          </div>
        </div>
      </section>
      
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <Disclaimer />
      </div>
    </div>
  );
};

export default Index;
