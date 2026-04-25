import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || "global"
});

export async function POST(req) {
  try {
    const body = await req.json();

    const prompt = `
You are Astryx, a premium self-reflection assistant that combines Eastern BaZi (Four Pillars) and Western Astrology.

IMPORTANT FORMAT RULES:

- Output MUST be in Markdown
- Use "## Section Title" for each section
- Separate each section with "---" on its own line
- Do NOT merge sections
- Do NOT skip separators

IMPORTANT:
- Everything must be written in clear English.
- Do NOT use Chinese characters or Chinese metaphysics terms.
- Replace traditional terms with English explanations:
  - "Seasonal Support" instead of 得令
  - "Root Support" instead of 得地
  - "Overall Influence" instead of 得势
  - "Supportive Energy" instead of 生扶
  - "Balancing/Draining Energy" instead of 克泄

STYLE:
- Insightful, modern, and emotionally intelligent
- Practical and grounded (not mystical nonsense)
- Structured and easy to read
- Supportive, not deterministic

USER DATA:

Name: ${body.name || "Unknown"}
Gender: ${body.gender || "Not specified"}
Birth Date: ${body.birthDate || "Unknown"}
Birth Time: ${body.birthTime || "Unknown"}
Birth City: ${body.birthCity || "Unknown"}

Birth Location:
${JSON.stringify(body.location || {}, null, 2)}

Traditional Chinese Hour:
${JSON.stringify(body.hourInfo || {}, null, 2)}
BAZI SYSTEM:

Chinese Zodiac: ${body.chineseZodiac || "Unknown"}

Eight Characters:
${JSON.stringify(body.eightChars || [], null, 2)}

Day Master: ${body.dayMaster || "Unknown"}
Day Stem: ${body.dayStem || "Unknown"}

Five Element Distribution:
${JSON.stringify(body.elementCount || {}, null, 2)}

Strength Analysis:
Status: ${body.strength?.status || "Unknown"}
Score: ${body.strength?.score ?? "Unknown"}
Support Count: ${body.strength?.supportCount ?? "Unknown"}
Reasons:
${JSON.stringify(body.strength?.reasons || [], null, 2)}

Luck Cycle:
${JSON.stringify(body.luckCycle || {}, null, 2)}

Useful Elements:
${JSON.stringify(body.usefulElements || {}, null, 2)}

Favorable Direction:
${body.strength?.favorable || "Unknown"}

ASTROLOGY SYSTEM:

Sun Sign: ${body.westernSign || "Unknown"}
Moon Sign: ${body.moonSign || "Unknown"}
Ascendant: ${body.ascendant || "Unknown"}
Mercury: ${body.mercurySign || "Unknown"}
Venus: ${body.venusSign || "Unknown"}
Mars: ${body.marsSign || "Unknown"}

Planetary Positions:
${JSON.stringify(body.planetarySigns || [], null, 2)}

---

WRITE THE READING USING THESE SECTIONS:

1. Integrated Identity
Combine BaZi Day Master, Chinese Zodiac, and Sun/Moon/Ascendant into one personality description.

2. BaZi System Explanation
Explain:
- The four pillars (Year, Month, Day, Hour)
- Yin/Yang balance
- Five Elements structure

3. Strength Analysis
Explain:
- Seasonal Support (month influence)
- Root Support (day branch)
- Overall Influence (element distribution)
- Explain the Traditional Chinese Hour using true solar time, longitude correction, and Earthly Branch mapping.

Then conclude:
- If Strong → needs balancing and draining energy
- If Weak → needs supportive and reinforcing energy

4. Astrology Interpretation
Explain:
- Sun (identity)
- Moon (emotions)
- Ascendant (outer personality)
- Mercury, Venus, Mars
- Jupiter and Saturn (growth + pressure)

5. Element Interaction
Compare:
- Chinese Five Elements vs Western Elements
- Where they align or conflict

6. Love & Relationships
Combine:
- Venus
- Moon
- Day Pillar
- Strength type

7. Career Direction
Combine:
- Month Pillar
- Day Master
- Sun + Mars + Saturn

8. 30-Day Action Plan
Give 5 specific, realistic actions

9. Useful Element Strategy
Explain the favorable elements and how they guide personality, career, and decision-making.

10. Personality and Wellness Reflection
Give a gentle wellness-oriented reflection based on element balance.
Do not provide diagnosis or medical advice.

---

Make it detailed but clean.
No Chinese words.
No metaphysical jargon.
Make it feel like a modern psychology + culture fusion analysis.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    return Response.json({
      reading: response.text || fallbackReading(body)
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      reading: fallbackReading({})
    });
  }
}

function fallbackReading(body) {
  return `## Integrated Identity

Your profile blends ${
    body.dayMaster || "your core element"
  }, ${body.chineseZodiac || "your zodiac pattern"}, and ${
    body.westernSign || "your Sun sign"
  } expression.

## BaZi System

Your chart is structured through four pillars: Year, Month, Day, and Hour. Each pillar reflects a layer of your life, combining Yin/Yang and Five Element dynamics.

## Strength Analysis

Your strength is evaluated using:

- Seasonal Support (month influence)
- Root Support (day branch)
- Overall Influence (element balance)

If strong, your system benefits from releasing and balancing excess energy.

If weak, your system benefits from support and reinforcement.

## Astrology Interpretation

Your Sun represents identity, Moon reflects emotional needs, Ascendant shapes first impressions, and Mercury, Venus, and Mars define how you think, love, and act.

## Element Interaction

Your internal (BaZi) and external (astrology) elements interact to create harmony or tension that shapes your life direction.

## Love & Relationships

You thrive in relationships that respect both your emotional rhythm and personal independence.

## Career Direction

Focus on paths that align with your strengths while balancing your weaker areas.

## Core Challenge

Your main challenge is balancing internal sensitivity with external demands.

## 30-Day Plan

1. Track your daily energy patterns  
2. Focus on one personal goal  
3. Improve one relationship habit  
4. Take one bold step in work or study  
5. Reflect and adjust weekly  
`;
}
