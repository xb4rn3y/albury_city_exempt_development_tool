import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calculator, CheckCircle, Check } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";

interface FormData {
  structureType: string;
  length: string;
  width: string;
  height: string;
  frontBoundary: string;
  sideBoundary: string;
  rearBoundary: string;
  additionalRequirements: Record<string, boolean>;
}

const StructureInput = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    structureType: "",
    length: "",
    width: "",
    height: "",
    frontBoundary: "",
    sideBoundary: "",
    rearBoundary: "",
    additionalRequirements: {}
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRequirementChange = (requirement: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalRequirements: {
        ...prev.additionalRequirements,
        [requirement]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    console.log('Previous button clicked, current step:', currentStep);
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      console.log('Moving to step:', currentStep - 1);
    } else {
      // Go back to Properties page when on step 1
      navigate('/properties');
    }
  };

  const handleSubmit = () => {
    navigate(`/results/${propertyId}`, { 
      state: { formData } 
    });
  };

  const getRequirementsForStructure = (structureType: string) => {
    switch (structureType) {
      case 'shed':
        return [
          { key: 'isShippingContainer', label: 'Will your structure be a shipping container?', correctAnswer: false },
          { key: 'roofwaterDrains', label: 'Will roofwater drain without causing nuisance to neighbours?', correctAnswer: true },
          { key: 'isMetal', label: 'Will your structure be made of metal?', correctAnswer: null, conditional: true },
          { key: 'lowReflectiveMaterials', label: 'Will you use low-reflective, factory-coloured materials?', correctAnswer: true, dependsOn: 'isMetal', showIf: true },
          { key: 'inBushfireArea', label: 'Will your structure be in a bushfire area?', correctAnswer: null, conditional: true },
          { key: 'nearDwelling', label: 'Will your structure be less than 5m from a dwelling?', correctAnswer: null, dependsOn: 'inBushfireArea', showIf: true, conditional: true },
          { key: 'isNonCombustible', label: 'Will your structure be made of non-combustible materials?', correctAnswer: true, dependsOn: 'nearDwelling', showIf: true },
          { key: 'inHeritageArea', label: 'Will your property be in a heritage area?', correctAnswer: null, conditional: true },
          { key: 'inRearYard', label: 'Will your structure be in the rear yard?', correctAnswer: true, dependsOn: 'inHeritageArea', showIf: true },
          { key: 'blocksAccess', label: 'Will your structure block entry, exit, or fire safety measures of nearby buildings?', correctAnswer: false },
          { key: 'clearOfEasements', label: 'Will your structure be at least 1m clear of registered easements?', correctAnswer: true }
        ];
      case 'patio':
        return [
          { key: 'enclosingWallHeight', label: 'Will your patio have an enclosing wall higher than 1.4m?', correctAnswer: false },
          { key: 'floorHeight', label: 'Will the floor height be more than 1m above ground level?', correctAnswer: false },
          { key: 'isRoofed', label: 'Will your patio/pergola be roofed?', correctAnswer: null, conditional: true },
          { key: 'roofOverhang', label: 'Will the roof overhang be 600mm or less on each side?', correctAnswer: true, dependsOn: 'isRoofed', showIf: true },
          { key: 'attachedToDwelling', label: 'Will your patio/pergola be attached to a dwelling?', correctAnswer: null, conditional: true, dependsOn: 'isRoofed', showIf: true },
          { key: 'extendsAboveGutter', label: 'Will it extend above the gutter line?', correctAnswer: false, dependsOn: 'attachedToDwelling', showIf: true },
          { key: 'isMetal', label: 'Will your patio/pergola be made of metal?', correctAnswer: null, conditional: true },
          { key: 'lowReflectiveMaterials', label: 'Will you use low-reflective, factory-coloured materials?', correctAnswer: true, dependsOn: 'isMetal', showIf: true },
          { key: 'isFasciaConnected', label: 'Will your patio/pergola be fascia-connected?', correctAnswer: null, conditional: true },
          { key: 'stormwaterConnection', label: 'Will roofwater connect to the stormwater drainage system?', correctAnswer: true, dependsOn: 'isFasciaConnected', showIf: true },
          { key: 'followsEngineerSpecs', label: 'Will it follow engineer\'s specifications?', correctAnswer: true, dependsOn: 'isFasciaConnected', showIf: true },
          { key: 'obstructsDrainage', label: 'Will your structure obstruct existing drainage paths?', correctAnswer: false },
          { key: 'inBushfireArea', label: 'Will your structure be in a bushfire area?', correctAnswer: null, conditional: true },
          { key: 'nearDwelling', label: 'Will your structure be less than 5m from a dwelling?', correctAnswer: null, dependsOn: 'inBushfireArea', showIf: true, conditional: true },
          { key: 'isNonCombustible', label: 'Will your structure be made of non-combustible materials?', correctAnswer: true, dependsOn: 'nearDwelling', showIf: true }
        ];
      case 'carport':
        return [
          { key: 'isMetal', label: 'Will your carport be made of metal?', correctAnswer: null, conditional: true },
          { key: 'lowReflectiveMaterials', label: 'Will you use low-reflective, factory-coloured materials?', correctAnswer: true, dependsOn: 'isMetal', showIf: true },
          { key: 'newDriveway', label: 'Will you be creating a new driveway or gutter crossing?', correctAnswer: null, conditional: true },
          { key: 'hasRoadApproval', label: 'Will you have approval from the road authority?', correctAnswer: true, dependsOn: 'newDriveway', showIf: true },
          { key: 'stormwaterConnection', label: 'Will roofwater connect to the stormwater drainage system?', correctAnswer: true },
          { key: 'isFasciaConnected', label: 'Will your carport be fascia-connected?', correctAnswer: null, conditional: true },
          { key: 'followsEngineerSpecs', label: 'Will it follow engineer\'s specifications?', correctAnswer: true, dependsOn: 'isFasciaConnected', showIf: true },
          { key: 'inBushfireArea', label: 'Will your carport be in a bushfire area?', correctAnswer: null, conditional: true },
          { key: 'nearDwelling', label: 'Will your carport be less than 5m from a dwelling?', correctAnswer: null, dependsOn: 'inBushfireArea', showIf: true, conditional: true },
          { key: 'isNonCombustible', label: 'Will your carport be made of non-combustible materials?', correctAnswer: true, dependsOn: 'nearDwelling', showIf: true },
          { key: 'inHeritageArea', label: 'Will your carport be in a heritage area?', correctAnswer: null, conditional: true },
          { key: 'inRearYard', label: 'Will your carport be in the rear yard?', correctAnswer: true, dependsOn: 'inHeritageArea', showIf: true },
          { key: 'reducesAccess', label: 'Will your carport reduce or block vehicle access, parking, or loading?', correctAnswer: false, dependsOn: 'inHeritageArea', showIf: true }
        ];
      default:
        return [];
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.structureType && formData.length && formData.width && formData.height;
      case 2:
        return formData.frontBoundary && formData.sideBoundary && formData.rearBoundary;
      case 3:
        const requirements = getRequirementsForStructure(formData.structureType);
        return requirements.every(req => {
          if (req.dependsOn) {
            const parentAnswer = formData.additionalRequirements[req.dependsOn];
            if (parentAnswer !== req.showIf) {
              return true; // Not applicable, so considered valid
            }
          }
          return formData.additionalRequirements[req.key] !== undefined;
        });
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-slide-up">
            <div>
              <Label htmlFor="structureType" className="text-base font-medium">
                Type of Structure
              </Label>
              <Select onValueChange={(value) => handleInputChange('structureType', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select structure type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shed">Shed</SelectItem>
                  <SelectItem value="patio">Patio/Pergola</SelectItem>
                  <SelectItem value="carport">Carport</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="length" className="text-base font-medium">
                  Length (m)
                </Label>
                <Input
                  id="length"
                  type="number"
                  placeholder="0.00"
                  value={formData.length}
                  onChange={(e) => handleInputChange('length', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="width" className="text-base font-medium">
                  Width (m)
                </Label>
                <Input
                  id="width"
                  type="number"
                  placeholder="0.00"
                  value={formData.width}
                  onChange={(e) => handleInputChange('width', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-base font-medium">
                  Height (m)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="0.00"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Boundary Distances</h3>
              <p className="text-muted-foreground">
                Enter the distance from your proposed structure to each property boundary
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="frontBoundary" className="text-base font-medium">
                  Front Boundary (m)
                </Label>
                <Input
                  id="frontBoundary"
                  type="number"
                  placeholder="0.00"
                  value={formData.frontBoundary}
                  onChange={(e) => handleInputChange('frontBoundary', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="sideBoundary" className="text-base font-medium">
                  Side Boundary (m)
                </Label>
                <Input
                  id="sideBoundary"
                  type="number"
                  placeholder="0.00"
                  value={formData.sideBoundary}
                  onChange={(e) => handleInputChange('sideBoundary', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="rearBoundary" className="text-base font-medium">
                  Rear Boundary (m)
                </Label>
                <Input
                  id="rearBoundary"
                  type="number"
                  placeholder="0.00"
                  value={formData.rearBoundary}
                  onChange={(e) => handleInputChange('rearBoundary', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        const requirements = getRequirementsForStructure(formData.structureType);
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Additional Requirements</h3>
              <p className="text-muted-foreground">
                Please confirm your structure meets these additional requirements for exempt development
              </p>
            </div>

            <div className="space-y-4">
              {requirements.map((requirement) => {
                // Check if this question should be shown based on dependencies
                if (requirement.dependsOn) {
                  const parentAnswer = formData.additionalRequirements[requirement.dependsOn];
                  console.log(`Checking requirement ${requirement.key}: dependsOn=${requirement.dependsOn}, parentAnswer=${parentAnswer}, showIf=${requirement.showIf}`);
                  if (parentAnswer !== requirement.showIf) {
                    console.log(`Not showing ${requirement.key} because parent condition not met`);
                    return null; // Don't show this question
                  }
                }

                return (
                  <div key={requirement.key} className="p-4 border rounded-lg space-y-3">
                    <p className="text-sm font-medium">{requirement.label}</p>
                    <div className="flex gap-4">
                      <Button
                        variant={formData.additionalRequirements[requirement.key] === true ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleRequirementChange(requirement.key, true)}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Yes
                      </Button>
                      <Button
                        variant={formData.additionalRequirements[requirement.key] === false ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleRequirementChange(requirement.key, false)}
                      >
                        ✕ No
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate('/properties')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Structure Details
            </h1>
            <p className="text-lg text-muted-foreground">
              Provide details about your proposed structure
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4 md:space-x-8">
              {/* Step 1 - Property */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground">
                  <Check className="h-5 w-5" />
                </div>
                <div className="ml-3 hidden md:block">
                  <div className="text-sm font-medium text-accent">Property</div>
                  <div className="text-xs text-muted-foreground">Select your property</div>
                </div>
              </div>

              {/* Connector Line */}
              <div className="w-8 md:w-16 h-px bg-accent"></div>

              {/* Step 2 - Structure */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-medium">
                  2
                </div>
                <div className="ml-3 hidden md:block">
                  <div className="text-sm font-medium text-primary">Structure</div>
                  <div className="text-xs text-muted-foreground">Enter structure details</div>
                </div>
              </div>

              {/* Connector Line */}
              <div className="w-8 md:w-16 h-px bg-border"></div>

              {/* Step 3 - Results */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground font-medium">
                  3
                </div>
                <div className="ml-3 hidden md:block">
                  <div className="text-sm font-medium text-muted-foreground">Results</div>
                  <div className="text-xs text-muted-foreground">View assessment</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="mr-2 h-5 w-5 text-primary" />
              {currentStep === 1 && "Basic Information"}
              {currentStep === 2 && "Boundary Setbacks"}
              {currentStep === 3 && "Additional Requirements"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us about the type and size of your proposed structure"}
              {currentStep === 2 && "Boundary distances are critical for exempt development eligibility"}
              {currentStep === 3 && "These requirements must be met for exempt development eligibility"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
          >
            Previous
          </Button>

          {currentStep === totalSteps ? (
            <Button
              variant="hero"
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="min-w-32"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Get Results
            </Button>
          ) : (
            <Button
              variant="council"
              onClick={handleNext}
              disabled={!isStepValid()}
              className="min-w-24"
            >
              Next
            </Button>
          )}
        </div>
        
        <Disclaimer />
      </div>
    </div>
  );
};

export default StructureInput;
