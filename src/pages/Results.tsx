import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, ArrowLeft, FileText, AlertTriangle, Home } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";
import { useEffect } from "react";
//import { celebrateSuccess } from "@/lib/confetti";
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
const Results = () => {
  const {
    propertyId
  } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData as FormData;

  // Exempt determination handled below with SEPP-specific rules

  const getStructureArea = () => {
    if (!formData) return 0;
    return parseFloat(formData.length) * parseFloat(formData.width);
  };

  // SEPP assessment rules based on property category and structure type
  const category = (() => {
    switch (propertyId) {
      case "1":
        return {
          lotSize: "standard" as const,
          zone: "urban" as const,
          label: "Urban Standard Lot (>300m²)"
        };
      case "2":
        return {
          lotSize: "standard" as const,
          zone: "rural" as const,
          label: "Rural/Large Lot Residential (>300m²)"
        };
      case "3":
        return {
          lotSize: "small" as const,
          zone: "urban" as const,
          label: "Small Lot (≤300m²) – Residential"
        };
      case "4":
        return {
          lotSize: "small" as const,
          zone: "rural" as const,
          label: "Small Lot (≤300m²) – Rural"
        };
      default:
        return {
          lotSize: "standard" as const,
          zone: "urban" as const,
          label: "Unknown"
        };
    }
  })();
  const area = getStructureArea();
  const maxArea = (() => {
    if (!formData) return 0;
    switch (formData.structureType) {
      case "patio":
        return 25;
      // 25m² for all sample properties
      case "shed":
        return category.zone === "rural" && category.lotSize === "standard" ? 50 : 20;
      case "carport":
        return category.lotSize === "small" ? 20 : category.zone === "urban" ? 25 : 50;
      default:
        return 0;
    }
  })();
  const maxHeight = 3.0;

  // Special boundary rules for patios/pergolas
  const sideRearMin = (() => {
    if (formData?.structureType === "patio") {
      return category.zone === "urban" ? 0.9 : 5.0;
    }
    return category.zone === "urban" ? 0.9 : 5.0;
  })();
  const frontMin = (() => {
    if (formData?.structureType === "patio") {
      return category.zone === "urban" ? 0.9 : 5.0;
    }
    return category.zone === "urban" ? 0.9 : 5.0;
  })();
  const getRequirementsForStructure = (structureType: string) => {
    switch (structureType) {
      case 'shed':
        return [{
          key: 'isShippingContainer',
          label: 'Is your structure a shipping container?',
          correctAnswer: false
        }, {
          key: 'roofwaterDrains',
          label: 'Will roofwater drain without causing nuisance to neighbours?',
          correctAnswer: true
        }, {
          key: 'isMetal',
          label: 'Is your structure made of metal?',
          correctAnswer: null,
          conditional: true
        }, {
          key: 'lowReflectiveMaterials',
          label: 'Will you use low-reflective, factory-coloured materials?',
          correctAnswer: true,
          dependsOn: 'isMetal',
          showIf: true
        }, {
          key: 'inBushfireArea',
          label: 'Will your structure be in a bushfire area?',
          correctAnswer: null,
          conditional: true
        }, {
          key: 'nearDwelling',
          label: 'Will your structure be less than 5m from a dwelling?',
          correctAnswer: null,
          dependsOn: 'inBushfireArea',
          showIf: true,
          conditional: true
        }, {
          key: 'isNonCombustible',
          label: 'Is your structure made of non-combustible materials?',
          correctAnswer: true,
          dependsOn: 'nearDwelling',
          showIf: true
        }, {
          key: 'inHeritageArea',
          label: 'Is your property in a heritage area?',
          correctAnswer: null,
          conditional: true
        }, {
          key: 'inRearYard',
          label: 'Will your structure be in the rear yard?',
          correctAnswer: true,
          dependsOn: 'inHeritageArea',
          showIf: true
        }, {
          key: 'blocksAccess',
          label: 'Does your structure block entry, exit, or fire safety measures of nearby buildings?',
          correctAnswer: false
        }, {
          key: 'clearOfEasements',
          label: 'Is your structure at least 1m clear of registered easements?',
          correctAnswer: true
        }];
      case 'patio':
        return [{
          key: 'enclosingWallHeight',
          label: 'Does your patio have an enclosing wall higher than 1.4m?',
          correctAnswer: false
        }, {
          key: 'floorHeight',
          label: 'Is the floor height more than 1m above ground level?',
          correctAnswer: false
        }, {
          key: 'isRoofed',
          label: 'Is your patio/pergola roofed?',
          correctAnswer: null,
          conditional: true
        }, {
          key: 'roofOverhang',
          label: 'Is the roof overhang 600mm or less on each side?',
          correctAnswer: true,
          dependsOn: 'isRoofed',
          showIf: true
        }, {
          key: 'attachedToDwelling',
          label: 'Is your patio/pergola attached to a dwelling?',
          correctAnswer: null,
          conditional: true,
          dependsOn: 'isRoofed',
          showIf: true
        }, {
          key: 'extendsAboveGutter',
          label: 'Does it extend above the gutter line?',
          correctAnswer: false,
          dependsOn: 'attachedToDwelling',
          showIf: true
        }, {
          key: 'isMetal',
          label: 'Is your patio/pergola made of metal?',
          correctAnswer: null,
          conditional: true
        }, {
          key: 'lowReflectiveMaterials',
          label: 'Will you use low-reflective, factory-coloured materials?',
          correctAnswer: true,
          dependsOn: 'isMetal',
          showIf: true
        }, {
          key: 'isFasciaConnected',
          label: 'Is your patio/pergola fascia-connected?',
          correctAnswer: null,
          conditional: true
        }, {
          key: 'stormwaterConnection',
          label: 'Will roofwater connect to the stormwater drainage system?',
          correctAnswer: true,
          dependsOn: 'isFasciaConnected',
          showIf: true
        }, {
          key: 'followsEngineerSpecs',
          label: 'Does it follow engineer\'s specifications?',
          correctAnswer: true,
          dependsOn: 'isFasciaConnected',
          showIf: true
        }, {
          key: 'obstructsDrainage',
          label: 'Does your structure obstruct existing drainage paths?',
          correctAnswer: false
        }, {
          key: 'inBushfireArea',
          label: 'Will your structure be in a bushfire area?',
          correctAnswer: null,
          conditional: true
        }, {
          key: 'nearDwelling',
          label: 'Will your structure be less than 5m from a dwelling?',
          correctAnswer: null,
          dependsOn: 'inBushfireArea',
          showIf: true,
          conditional: true
        }, {
          key: 'isNonCombustible',
          label: 'Is your structure made of non-combustible materials?',
          correctAnswer: true,
          dependsOn: 'nearDwelling',
          showIf: true
        }];
      case 'carport':
        return [{
          key: 'isMetal',
          label: 'Is your carport made of metal?',
          correctAnswer: null,
          conditional: true
        }, {
          key: 'lowReflectiveMaterials',
          label: 'Will you use low-reflective, factory-coloured materials?',
          correctAnswer: true,
          dependsOn: 'isMetal',
          showIf: true
        }, {
          key: 'newDriveway',
          label: 'Are you creating a new driveway or gutter crossing?',
          correctAnswer: null,
          conditional: true
        }, {
          key: 'hasRoadApproval',
          label: 'Do you have approval from the road authority?',
          correctAnswer: true,
          dependsOn: 'newDriveway',
          showIf: true
        }, {
          key: 'stormwaterConnection',
          label: 'Will roofwater connect to the stormwater drainage system?',
          correctAnswer: true
        }, {
          key: 'isFasciaConnected',
          label: 'Is your carport fascia-connected?',
          correctAnswer: null,
          conditional: true
        }, {
          key: 'followsEngineerSpecs',
          label: 'Does it follow engineer\'s specifications?',
          correctAnswer: true,
          dependsOn: 'isFasciaConnected',
          showIf: true
        }, {
          key: 'inBushfireArea',
          label: 'Is your carport in a bushfire area?',
          correctAnswer: null,
          conditional: true
        }, {
          key: 'nearDwelling',
          label: 'Is your carport less than 5m from a dwelling?',
          correctAnswer: null,
          dependsOn: 'inBushfireArea',
          showIf: true,
          conditional: true
        }, {
          key: 'isNonCombustible',
          label: 'Is your carport made of non-combustible materials?',
          correctAnswer: true,
          dependsOn: 'nearDwelling',
          showIf: true
        }, {
          key: 'inHeritageArea',
          label: 'Is your carport in a heritage area?',
          correctAnswer: null,
          conditional: true
        }, {
          key: 'inRearYard',
          label: 'Is your carport in the rear yard?',
          correctAnswer: true,
          dependsOn: 'inHeritageArea',
          showIf: true
        }, {
          key: 'reducesAccess',
          label: 'Does your carport reduce or block vehicle access, parking, or loading?',
          correctAnswer: false,
          dependsOn: 'inHeritageArea',
          showIf: true
        }];
      default:
        return [];
    }
  };
  const checks = formData ? {
    areaOK: area <= maxArea,
    heightOK: parseFloat(formData.height) <= maxHeight,
    frontOK: parseFloat(formData.frontBoundary) >= frontMin,
    sideOK: parseFloat(formData.sideBoundary) >= sideRearMin,
    rearOK: parseFloat(formData.rearBoundary) >= sideRearMin
  } : {
    areaOK: false,
    heightOK: false,
    frontOK: false,
    sideOK: false,
    rearOK: false
  };
  const additionalRequirementsCheck = formData ? (() => {
    const requirements = getRequirementsForStructure(formData.structureType);
    console.log('Validating requirements:', requirements.map(req => ({
      key: req.key,
      correctAnswer: req.correctAnswer,
      userAnswer: formData.additionalRequirements[req.key],
      conditional: req.conditional
    })));
    return requirements.every(req => {
      if (req.dependsOn) {
        const parentAnswer = formData.additionalRequirements[req.dependsOn];
        if (parentAnswer !== req.showIf) {
          return true; // Not applicable, so considered passing
        }
      }
      const userAnswer = formData.additionalRequirements[req.key];

      // For conditional questions (correctAnswer is null), just check if user provided an answer
      if (req.correctAnswer === null) {
        return userAnswer !== undefined;
      }

      // For regular questions, check if answer matches the correct answer
      return userAnswer === req.correctAnswer;
    });
  })() : false;
  console.log('Assessment Debug:', {
    areaOK: checks.areaOK,
    heightOK: checks.heightOK,
    frontOK: checks.frontOK,
    sideOK: checks.sideOK,
    rearOK: checks.rearOK,
    additionalRequirementsCheck,
    area,
    maxArea,
    height: formData?.height,
    maxHeight,
    frontBoundary: formData?.frontBoundary,
    frontMin,
    sideBoundary: formData?.sideBoundary,
    sideRearMin,
    rearBoundary: formData?.rearBoundary
  });
  const isExempt = formData ? checks.areaOK && checks.heightOK && checks.frontOK && checks.sideOK && checks.rearOK && additionalRequirementsCheck : false;
  
  // Celebrate successful assessment
  useEffect(() => {
    if (isExempt) {
      const timer = setTimeout(() => {
        celebrateSuccess();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isExempt]);
  
  const getSEPPClause = () => {
    if (!formData) return "";
    switch (formData.structureType) {
      case "shed":
        return "SEPP (Exempt and Complying Development Codes) 2008 - Clauses 2.17 and 2.18";
      case "patio":
        return "SEPP (Exempt and Complying Development Codes) 2008 - Clauses 2.11 and 2.12";
      case "carport":
        return "SEPP (Exempt and Complying Development Codes) 2008 - Clauses 2.19 and 2.20";
      default:
        return "SEPP (Exempt and Complying Development Codes) 2008 - Schedule 2, Part 1";
    }
  };
  if (!formData) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <XCircle className="mr-2 h-5 w-5" />
              Missing Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">No structure data found. Please start over.</p>
            <Button onClick={() => navigate('/properties')} variant="council">
              Start New Assessment
            </Button>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Print-only header */}
        <div className="hidden print:block print:mb-6">
          <h1 className="text-2xl font-bold text-center mb-2">Exempt Development Assessment Results</h1>
          <p className="text-center text-sm text-muted-foreground">Albury City Council</p>
        </div>

        {/* Header */}
        <div className="mb-8 animate-fade-in print:hidden">
          <Button variant="ghost" onClick={() => navigate(`/structure/${propertyId}`)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Structure Details
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Assessment Results
            </h1>
            <p className="text-lg text-muted-foreground">
              Based on your property type, residential zone, structure details and NSW SEPP requirements:
            </p>
          </div>
        </div>

        {/* Results Card */}
        <Card className={`mb-8 shadow-hero animate-slide-up print:shadow-none print:border print:break-inside-avoid ${isExempt ? 'border-accent' : 'border-destructive'}`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {isExempt ? <div className="p-4 bg-success-gradient rounded-full print:bg-green-50 print:border-2 print:border-green-600">
                  <CheckCircle className="h-12 w-12 text-accent-foreground print:!text-green-600 print:stroke-[3]" strokeWidth={2} />
                </div> : <div className="p-4 bg-destructive/10 rounded-full print:bg-red-50 print:border-2 print:border-red-600">
                  <XCircle className="h-12 w-12 text-destructive print:!text-red-600 print:stroke-[3]" strokeWidth={2} />
                </div>}
            </div>
            <CardTitle className="text-2xl">
              {isExempt ? <span className="text-accent">Approved for Exempt Development</span> : <span className="text-destructive">Development Application Required</span>}
            </CardTitle>
            <CardDescription className="text-base">
              {isExempt ? "Your proposed structure meets all requirements for exempt development under NSW SEPP." : "Your proposed structure requires a development application to be submitted to Council"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Structure Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant="secondary">{formData.structureType}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span>{formData.length}m × {formData.width}m × {formData.height}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Floor Area:</span>
                    <span>{getStructureArea().toFixed(1)}m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Allowed Area:</span>
                    <span className={checks.areaOK ? 'text-accent' : 'text-destructive'}>
                      {maxArea}m² {checks.areaOK ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Height Limit:</span>
                    <span className={checks.heightOK ? 'text-accent' : 'text-destructive'}>
                      ≤ {maxHeight}m {checks.heightOK ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Setback Requirements</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Front Boundary (≥ {frontMin}m):</span>
                    <span className={checks.frontOK ? 'text-accent' : 'text-destructive'}>
                      {formData.frontBoundary}m {checks.frontOK ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Side Boundary (≥ {sideRearMin}m):</span>
                    <span className={checks.sideOK ? 'text-accent' : 'text-destructive'}>
                      {formData.sideBoundary}m {checks.sideOK ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rear Boundary (≥ {sideRearMin}m):</span>
                    <span className={checks.rearOK ? 'text-accent' : 'text-destructive'}>
                      {formData.rearBoundary}m {checks.rearOK ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Requirements Assessment */}
        {formData.additionalRequirements && Object.keys(formData.additionalRequirements).length > 0 && <Card className="mb-8 shadow-card print:shadow-none print:border print:break-inside-avoid print:mt-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                Additional Requirements Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(() => {
              const requirements = getRequirementsForStructure(formData.structureType);
              const groupedRequirements: {
                [key: string]: any[];
              } = {};
              const standaloneRequirements: any[] = [];

              // Group conditional requirements by their main question
              // First pass: identify main conditional questions
              requirements.forEach(req => {
                if (req.conditional && !req.dependsOn) {
                  // This is a main conditional question
                  groupedRequirements[req.key] = [req];
                }
              });

              // Second pass: add dependent questions to their parent groups
              requirements.forEach(req => {
                if (req.dependsOn) {
                  // Find which group this should belong to
                  let targetGroup = req.dependsOn;
                  
                  // If the direct parent is not a main group, find the root parent
                  while (targetGroup && !groupedRequirements[targetGroup]) {
                    const parentReq = requirements.find(r => r.key === targetGroup);
                    if (parentReq && parentReq.dependsOn) {
                      targetGroup = parentReq.dependsOn;
                    } else {
                      break;
                    }
                  }
                  
                  // Add to the appropriate group
                  if (groupedRequirements[targetGroup]) {
                    // Also add the immediate parent if it's not already in the group
                    const immediateParent = requirements.find(r => r.key === req.dependsOn);
                    if (immediateParent && !groupedRequirements[targetGroup].includes(immediateParent)) {
                      groupedRequirements[targetGroup].push(immediateParent);
                    }
                    groupedRequirements[targetGroup].push(req);
                  }
                }
              });

              // Third pass: add standalone questions
              requirements.forEach(req => {
                if (!req.conditional && !req.dependsOn) {
                  standaloneRequirements.push(req);
                }
              });
              const renderItems: JSX.Element[] = [];

              // Render grouped conditional requirements
              Object.entries(groupedRequirements).forEach(([mainKey, group]) => {
                const mainReq = group[0];
                const subReqs = group.slice(1);
                const mainAnswer = formData.additionalRequirements[mainKey];

                // Check if all conditions in this group pass
                const allConditionsPass = group.every(req => {
                  if (req.dependsOn) {
                    const parentAnswer = formData.additionalRequirements[req.dependsOn];
                    if (parentAnswer !== req.showIf) {
                      return true; // Not applicable, so considered passing
                    }
                  }
                  const userAnswer = formData.additionalRequirements[req.key];
                  return userAnswer === req.correctAnswer;
                });

                // Render main question
                renderItems.push(<div key={mainKey} className="flex items-start justify-between p-3 rounded-lg border">
                        <span className="text-sm flex-1 font-medium">{mainReq.label}</span>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-xs text-muted-foreground">
                            Answer: {mainAnswer ? 'Yes' : 'No'}
                          </span>
                          {mainAnswer ? (
                            <Badge variant="default" className="bg-muted text-muted-foreground">
                              Info
                            </Badge>
                           ) : (
                             <Badge variant="default" className="bg-accent text-accent-foreground print:!bg-green-600 print:!text-white">
                               <CheckCircle className="mr-1 h-3 w-3" />
                               Pass
                             </Badge>
                           )}
                        </div>
                      </div>);

                // Render sub-questions if main answer triggers them, or show "pass" if main answer is "no"
                subReqs.forEach(subReq => {
                  if (subReq.dependsOn) {
                    const parentAnswer = formData.additionalRequirements[subReq.dependsOn];
                    if (parentAnswer === subReq.showIf) {
                      // Parent answered "yes" - show actual question with pass/fail based on user answer
                      const userAnswer = formData.additionalRequirements[subReq.key];
                      
                      // Check if this is a conditional question (correctAnswer is null)
                      if (subReq.correctAnswer === null) {
                        // This is an info-gathering question, not pass/fail
                        renderItems.push(<div key={subReq.key} className="flex items-start justify-between p-3 rounded-lg border ml-4">
                                <span className="text-sm flex-1 font-medium">{subReq.label}</span>
                                <div className="flex items-center gap-2 ml-4">
                                  <span className="text-xs text-muted-foreground">
                                    Answer: {userAnswer ? 'Yes' : 'No'}
                                  </span>
                                  <Badge variant="default" className="bg-muted text-muted-foreground">
                                    Info
                                  </Badge>
                                </div>
                              </div>);
                      } else {
                        // This is a pass/fail question
                        const individualPass = userAnswer === subReq.correctAnswer;
                        const shouldShowPass = allConditionsPass || individualPass;
                        renderItems.push(<div key={subReq.key} className="flex items-start justify-between p-3 rounded-lg border ml-4">
                                <span className="text-sm flex-1 font-medium">{subReq.label}</span>
                                <div className="flex items-center gap-2 ml-4">
                                  <span className="text-xs text-muted-foreground">
                                    Answer: {userAnswer ? 'Yes' : 'No'}
                                  </span>
                                   {shouldShowPass ? <Badge variant="default" className="bg-accent text-accent-foreground print:!bg-green-600 print:!text-white">
                                       <CheckCircle className="mr-1 h-3 w-3" />
                                       Pass
                                     </Badge> : <Badge variant="destructive" className="print:!bg-red-600 print:!text-white">
                                       <XCircle className="mr-1 h-3 w-3" />
                                       Fail
                                     </Badge>}
                                </div>
                              </div>);
                      }
                    } else if (parentAnswer === false) {
                      // Parent answered "no" - show "pass" since this requirement doesn't apply
                      renderItems.push(<div key={subReq.key} className="flex items-start justify-between p-3 rounded-lg border ml-4">
                              <span className="text-sm flex-1 font-medium">{subReq.label}</span>
                              <div className="flex items-center gap-2 ml-4">
                                <span className="text-xs text-muted-foreground">
                                  Not applicable
                                </span>
                                 <Badge variant="default" className="bg-accent text-accent-foreground print:!bg-green-600 print:!text-white">
                                   <CheckCircle className="mr-1 h-3 w-3" />
                                   Pass
                                 </Badge>
                              </div>
                            </div>);
                    }
                  }
                });
              });

              // Render standalone requirements
              standaloneRequirements.forEach(requirement => {
                const userAnswer = formData.additionalRequirements[requirement.key];
                const isPassing = userAnswer === requirement.correctAnswer;
                renderItems.push(<div key={requirement.key} className="flex items-start justify-between p-3 rounded-lg border">
                        <span className="text-sm flex-1 font-medium">{requirement.label}</span>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-xs text-muted-foreground">
                            Answer: {userAnswer ? 'Yes' : 'No'}
                          </span>
                           {isPassing ? <Badge variant="default" className="bg-accent text-accent-foreground print:!bg-green-600 print:!text-white">
                               <CheckCircle className="mr-1 h-3 w-3" />
                               Pass
                             </Badge> : <Badge variant="destructive" className="print:!bg-red-600 print:!text-white">
                               <XCircle className="mr-1 h-3 w-3" />
                               Fail
                             </Badge>}
                        </div>
                      </div>);
              });
              return renderItems;
            })()}
              </div>
              {!additionalRequirementsCheck && <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    One or more additional requirements are not met. This structure will require a development application.
                  </AlertDescription>
                </Alert>}
            </CardContent>
          </Card>}

        {/* SEPP Reference */}
        <Card className="mb-8 shadow-card print:hidden">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Legal Reference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">Applicable Legislation:</p>
            <p className="font-mono text-sm bg-muted p-3 rounded">
              {getSEPPClause()}
            </p>
          </CardContent>
        </Card>

        {/* Detailed Requirements */}
        <Card className="mb-8 shadow-card print:hidden">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
              Detailed Requirements for {formData.structureType === 'shed' ? 'Sheds' : formData.structureType === 'patio' ? 'Patios/Pergolas' : 'Carports'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formData.structureType === 'carport' && <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Floor Area:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Up to 50 m² (rural zones, R5, lot {'>'}300 m²)</li>
                    <li>Up to 25 m² (other zones, lot {'>'} 300 m²)</li>
                    <li>Up to 20 m² (any zone, lot ≤ 300 m²)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Height:</h4>
                  <p>≤ 3 m above ground, and if attached, not above dwelling's gutter line</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Position:</h4>
                  <p>Must be set ≥ 1 m behind the building line</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Setbacks:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>At least 5 m in rural zones</li>
                    <li>At least 0.9 m in other zones</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Additional Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>If metal, must use low-reflective, factory-coloured materials</li>
                    <li>No new driveway/gutter crossing unless approved by road authority</li>
                    <li>Roofwater must connect to stormwater drainage system</li>
                    <li>If fascia-connected → must follow engineer's specifications</li>
                    <li>In bushfire prone areas and {'<'} 5 m from a dwelling → must be non-combustible</li>
                    <li>In heritage areas → must be in the rear yard</li>
                    <li>Must not reduce or block vehicle access, parking, or loading</li>
                  </ul>
                </div>
              </div>}

            {formData.structureType === 'patio' && <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Floor Area:</h4>
                  <p>No more than 25 m²</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Combined Area:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>If lot {'>'} 300 m² → must not exceed 15% of dwelling's ground floor area</li>
                    <li>If lot ≤ 300 m² → max 25 m²</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Height & Wall Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Wall height: no higher than 1.4 m if enclosed</li>
                    <li>Floor height: ≤ 1 m above ground</li>
                    <li>Overall height ≤ 3 m above ground</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Position:</h4>
                  <p>Must be behind the building line (unless farm-related, then {'>'} 50 m from road)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Setbacks:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>At least 5 m in rural zones</li>
                    <li>At least 0.9 m in other zones</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Additional Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>If metal, must use low-reflective, factory-coloured materials</li>
                    <li>Roof overhang: ≤ 600 mm on each side</li>
                    <li>If attached to a dwelling → must not extend above gutter line</li>
                    <li>If fascia-connected → must follow engineer's specs</li>
                    <li>Roofwater must connect to stormwater drainage system</li>
                    <li>Must not obstruct existing drainage paths</li>
                    <li>In bushfire prone areas and {'<'} 5 m from a dwelling → must be non-combustible</li>
                  </ul>
                </div>
              </div>}

            {formData.structureType === 'shed' && <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Floor Area:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Up to 50 m² in rural zones (RU1, RU2, RU3, RU4, RU6, R5)</li>
                    <li>Up to 20 m² in all other zones</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Height:</h4>
                  <p>No more than 3 m above ground level</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Setbacks:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>At least 5 m in rural zones</li>
                    <li>At least 0.9 m in other zones</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Position:</h4>
                  <p>Must be behind the building line (except in rural zones)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Additional Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Cannot be a shipping container</li>
                    <li>Roofwater must drain without causing nuisance to neighbours</li>
                    <li>If metal, must use low-reflective, factory-coloured materials (in residential zones)</li>
                    <li>In bushfire prone areas and {'<'} 5 m from a dwelling → must be non-combustible</li>
                    <li>In heritage areas → must be in the rear yard</li>
                    <li>Must not block entry, exit, or fire safety measures of nearby buildings</li>
                    <li>Must be at least 1 m clear of registered easements</li>
                  </ul>
                </div>
              </div>}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 shadow-card print:hidden">
          <CardHeader>
            <CardTitle className="flex items-center">
              {isExempt ? <CheckCircle className="mr-2 h-5 w-5 text-accent" /> : <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />}
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isExempt ? <div className="space-y-4">
                <p className="text-accent font-medium">Your development can proceed as exempt development, providing Additional Requirements are met!</p>
                <ul className="space-y-2 text-sm">
                  <li>• No development application required</li>
                  <li>• Ensure compliance with all building codes</li>
                  <li>• Consider any relevant environmental or heritage overlays</li>
                  <li>• Check for any utility connections required</li>
                </ul>
              </div> : <div className="space-y-4">
                <p className="text-destructive font-medium">Development Application Required: Your proposed structure does not meet all requirements for exempt development.</p>
                <div className="mt-4">
                  <p className="font-medium text-sm mb-2">Next Steps:</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Contact Albury City Council for development application guidance</li>
                    <li>• Consider modifying your design to meet exempt development requirements</li>
                    <li>• Engage a qualified building designer or architect if needed</li>
                    <li>• Review the non-compliant items above and adjust your plans</li>
                  </ul>
                </div>
              </div>}
          </CardContent>
        </Card>


        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          <Button variant="council" onClick={() => navigate('/properties')}>
            <Home className="mr-2 h-4 w-4" />
            New Assessment
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            <FileText className="mr-2 h-4 w-4" />
            Save Results
          </Button>
        </div>
        
        <div className="print:hidden">
          <Disclaimer />
        </div>
      </div>
    </div>;
};
export default Results;
