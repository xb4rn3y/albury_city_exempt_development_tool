# Exempt Development Tool (Project V)

**A CSIT Capstone Project in Collaboration with Albury City Council**

The Exempt Development Tool is a prototype web application designed to assist residents of Albury City in determining whether their proposed shed, patio, or carport qualifies as Exempt Development under the NSW State Environmental Planning Policy (Exempt and Complying Development Codes) 2008 (SEPP).

This tool demonstrates how user-friendly digital solutions can improve public accessibility to planning information and streamline council processes.

## Purpose
The purpose of this tool is to:

Help residents quickly assess their development proposals without needing to interpret complex planning documents.

Provide plain-English explanations of planning rules and references to relevant SEPP clauses.

Enhance transparency and self-service capability for the community while reducing administrative load for Council staff.

This prototype represents the foundation for a potential production-ready version that could integrate with council systems and official datasets.

## Features
Property Selection - Choose from sample lot profiles based on residential zoning and lot size.

Structure Input Form - Enter structure details (type, dimensions, setbacks) and respond to additional requirement questions.

Rules-Based Logic Engine - Automatically evaluates user inputs against SEPP standards to determine compliance.

Clear Outcomes - Provides one of three assessment results: Approved, Needs Review, or Not Approved, with visual indicators.

Legislative References - Displays relevant SEPP clauses to improve understanding of results.

Accessibility Features - Includes tooltips, FAQ dropdowns, chatbot text-to-speech, and dark mode toggle.

Responsive Design - Optimised for desktop, tablet, and mobile users.

Chatbot Interface - Alternative conversational UI allowing users to complete assessments or ask planning-related questions interactively.

Disclaimer Banner - Reminds users that the tool is for educational and informational purposes only

## Tech Stack
- **Frontend:** React + Tailwind CSS  
- **Deployment:** Cloudflare  
- **Version Control:** GitHub

## System Overview
This prototype runs entirely on the frontend, with no database or API integration.
All processing occurs locally in the browser, ensuring no user or property data is stored or transmitted.

The system uses sample property data and predefined SEPP rulesets to demonstrate how a production version could operate once integrated with real datasets (e.g., NSW Spatial Services API).

## Disclaimer
This web tool is a prototype developed for educational purposes as part of the La Trobe University CSIT Capstone Project.
It:

Does not store, transmit, or process any personal or property data.

Should not be used as formal council advice or relied upon for planning approvals.

Serves to demonstrate the potential for accessible digital planning tools to assist residents in understanding NSW planning policies.

All intellectual property and associated branding belong to Albury City Council.
