# Orion Home AI

**The Autonomous Representative for Home Maintenance**

I built Orion because home maintenance is fundamentally a "language gap" problem. I wanted to create more than an app; I wanted to create an Autonomous Representative—a digital concierge that speaks the technical language of pros but works exclusively for the homeowner.

## What it does

Orion is an Agentic AI Marketplace that automates the entire lifecycle of a home repair:

* **Vision Diagnostics:** Users upload a photo or video. Using Gemini 3 multimodal vision, Orion identifies the specific failure point, assigns a severity grade (1-4), and generates a "Pro-Brief"—a technical payload for the contractor.
* **Autonomous Negotiator:** This is the project's crown jewel. Once a problem is found, Orion acts as your agent. It uses Gemini 3 Function Calling to interview local specialists, transmitting the technical brief and negotiating arrival times and prices based on the user's budget.
* **Capital Ledger:** A high-tech system manages project funds in escrow, ensuring specialists are only paid once the AI verifies the structural integrity of the fix.
* **Neural Inbox:** A persistent, real-time chat architecture that syncs AI-assisted expert advice with a centralized message history.

## How I built it

Orion is powered by the Gemini 3 Pro and Flash models via the Google GenAI SDK:

* **The Brain (Gemini 3 Pro):** I utilized the Pro model for high-reasoning tasks like failure analysis and the complex logic required for the Contractor Negotiator.
* **Agentic Logic (Function Calling):** I implemented a recursive tool-use loop. The AI has access to functions like queryExpertNetwork and proposeTerms. It autonomously decides which specialists to ping, handles their counter-offers, and presents the user with a "Winner."
* **The Interface (React and Tailwind):** Designed with a modern aesthetic—utilizing glassmorphism and a cinematic navigation dock for a high-end, infrastructure-management feel.

## Challenges I ran into

* **The Agentic Recursive Loop:** Initially, the AI would call a tool but would not know how to wait for the result. I had to architect a multi-turn chat system that simulates a live API handshake, feeding contractor responses back into the model until a final contract JSON is produced.
* **Visual Ambiguity vs. Technical Accuracy:** A blurry photo of a boiler could be many things. I refined the system instructions to ensure Gemini 3 prioritizes safety. If the AI detects ambiguity in a high-voltage or gas-related image, it refuses the triage and requests a high-resolution video or immediate specialist intervention.
* **Latency Balancing:** High-reasoning tokens are incredible for negotiation but slower for simple UI searches. I implemented a tiered reasoning flow: Gemini 3 Flash handles lightning-fast UI interactions, while Gemini 3 Pro is only invoked for the technical diagnosis and agentic negotiation.

## Getting Started

### Prerequisites

* Node.js (v18.0.0 or higher)
* npm or yarn
* A Google Gemini API Key (obtained via Google AI Studio)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/orion-home-ai.git
cd orion-home-ai

```


2. Install dependencies:
```bash
npm install

```


3. Set up environment variables:
Create a `.env` file in the root directory and add your API key:
```env
VITE_GEMINI_API_KEY=your_api_key_here

```


4. Start the development server:
```bash
npm run dev

```



## What's next for Orion

* **Live API Integration:** I plan to integrate the Gemini 3 Multimodal Live API to allow users to walk through their house and talk to Orion in real-time, letting the AI hear the sound of a rattling HVAC unit.
* **IoT Predictive Maintenance:** Connecting to smart water meters and circuit breakers to let the Orion Negotiator proactively fix issues before the user even notices a leak.
* **Global Grid Expansion:** Moving beyond the local hub to integrate building codes from cities worldwide into the diagnostic engine.
