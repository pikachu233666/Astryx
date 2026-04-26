# Astryx - Eastern and Western astrology combined for interpretation

**Created by Yubo Sun & Yuxin Liu**

## Inspiration

Astryx was inspired by the idea that both Eastern and Western systems attempt to answer the same question: *Who are we?*  

**We combined the Eastern and Western system at the same time which I think is breaking the normal!**

Chinese BaZi interprets identity through time, elements, and cosmic cycles, while Western astrology uses planetary positions and symbolic archetypes. We wanted to explore what happens when these two systems are not compared—but **combined**.

At the same time, we were inspired by the rise of AI as an interpreter of complex systems. Astryx aims to bridge tradition and modern technology by using AI to synthesize symbolic knowledge into a personalized narrative.

---

## What it does

Astryx generates a **fusion reading** by combining:

- BaZi (Four Pillars, Five Elements, Yin/Yang)
- Chinese Zodiac and traditional hour calculation
- Western astrology (Sun, Moon, Ascendant, and planets)

Users input their birth data, and the system produces:

- Structured BaZi analysis
- Astrology chart breakdown
- Element balance visualization
- A unified **Fusion Reading**
- Downloadable PDF report

---

## How we built it

We built Astryx using a modern full-stack approach:

- **Next.js (App Router)** for frontend and API routes
- **Tailwind CSS** for styling and layout
- **React** for dynamic UI and state management
- **Framer Motion** for animations
- **Google Gen AI (Gemini / Vertex AI)** for AI interpretation
- **jsPDF** for generating downloadable reports
- **react-markdown** for rendering structured AI output

We also implemented custom logic for:

- BaZi calculation (Heavenly Stems, Earthly Branches)
- Solar term handling
- Five Elements relationships
- Traditional Chinese hour conversion using location data

---

## Challenges we ran into

- Integrating **two completely different systems** (BaZi vs Astrology) into a coherent model
- Handling **time accuracy**, including solar terms and true solar time
- Managing **API authentication differences** between Gemini API and Vertex AI
- Ensuring AI output is structured and readable using Markdown
- Designing a UI that balances complexity with clarity

---

## Accomplishments that we're proud of

- Successfully combining **Eastern and Western symbolic systems** into one experience
- Building a **fully working AI interpretation pipeline**
- Creating a clean UI with **interactive sections and structured reading blocks**
- Implementing **PDF export**
- Delivering a product that feels **complete and usable**, not just a prototype

---

## What we learned

- How to design systems that merge **different cultural frameworks**
- Practical experience with **AI APIs and prompt engineering**
- Structuring dynamic content using Markdown rendering
- The importance of **UX clarity when dealing with complex data**

---

## What's next for Astryx

- Improve AI reasoning depth and personalization
- Add more languages and localization support
- Enhance visualizations (charts, diagrams, interactive elements)
- Implement user accounts and saved readings
- Explore deeper integration with real-time astronomical data
- Optimize deployment for production-scale performance

Astryx is just the beginning of exploring how technology can reinterpret ancient systems in a modern way.
