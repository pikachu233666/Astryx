import * as Astronomy from "astronomy-engine";

export const runtime = "nodejs";

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const westernElements = {
  Aries: "Fire",
  Leo: "Fire",
  Sagittarius: "Fire",
  Taurus: "Earth",
  Virgo: "Earth",
  Capricorn: "Earth",
  Gemini: "Air",
  Libra: "Air",
  Aquarius: "Air",
  Cancer: "Water",
  Scorpio: "Water",
  Pisces: "Water"
};

const planets = [
  "Sun", "Moon", "Mercury", "Venus", "Mars",
  "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"
];

const planetMeanings = {
  Sun: "core identity and life direction",
  Moon: "emotions, memory, and inner needs",
  Mercury: "thinking, learning, and communication",
  Venus: "love style, beauty, and attraction",
  Mars: "motivation, courage, anger, and action",
  Jupiter: "growth, luck, wisdom, and expansion",
  Saturn: "discipline, fear, responsibility, and maturity",
  Uranus: "freedom, change, originality, and rebellion",
  Neptune: "dreams, imagination, spirituality, and illusion",
  Pluto: "power, shadow, transformation, and rebirth"
};

function normalizeDegrees(deg) {
  return ((deg % 360) + 360) % 360;
}

function longitudeToSign(longitude) {
  const normalized = normalizeDegrees(longitude);
  const index = Math.floor(normalized / 30);
  const sign = zodiacSigns[index];

  return {
    sign,
    element: westernElements[sign],
    degree: Number((normalized % 30).toFixed(2)),
    absoluteLongitude: Number(normalized.toFixed(2))
  };
}

function calculateAscendant(date, latitude, longitude) {
  const time = Astronomy.MakeTime(date);
  const siderealHours = Astronomy.SiderealTime(time);
  const localSiderealDegrees = normalizeDegrees(siderealHours * 15 + longitude);

  const obliquity = 23.439291;
  const theta = (localSiderealDegrees * Math.PI) / 180;
  const phi = (latitude * Math.PI) / 180;
  const eps = (obliquity * Math.PI) / 180;

  const ascRad = Math.atan2(
    -Math.cos(theta),
    Math.sin(theta) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps)
  );

  const ascDeg = normalizeDegrees((ascRad * 180) / Math.PI);
  return longitudeToSign(ascDeg);
}

export async function POST(req) {
  try {
    const body = await req.json();

    const birthDate = body.birthDate;
    const birthTime = body.birthTime || "12:00";
    const location = body.location;

    const date = new Date(`${birthDate}T${birthTime}:00Z`);

    const planetarySigns = planets.map((planet, index) => {
      const vector = Astronomy.GeoVector(planet, date, true);
      const ecliptic = Astronomy.Ecliptic(vector);
      const zodiac = longitudeToSign(ecliptic.elon);

      return {
        planet,
        sign: zodiac.sign,
        element: zodiac.element,
        degree: zodiac.degree,
        absoluteLongitude: zodiac.absoluteLongitude,
        meaning: planetMeanings[planet]
      };
    });

    const sun = planetarySigns.find((p) => p.planet === "Sun");
    const moon = planetarySigns.find((p) => p.planet === "Moon");
    const mercury = planetarySigns.find((p) => p.planet === "Mercury");
    const venus = planetarySigns.find((p) => p.planet === "Venus");
    const mars = planetarySigns.find((p) => p.planet === "Mars");

    let ascendant = "Unknown";
    let ascendantDegree = null;

    if (location?.latitude && location?.longitude) {
      const asc = calculateAscendant(
        date,
        Number(location.latitude),
        Number(location.longitude)
      );

      ascendant = asc.sign;
      ascendantDegree = asc.degree;
    }

    return Response.json({
      westernSign: sun.sign,
      westernElement: sun.element,
      moonSign: moon.sign,
      mercurySign: mercury.sign,
      venusSign: venus.sign,
      marsSign: mars.sign,
      ascendant,
      ascendantDegree,
      planetarySigns
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to calculate astrology chart." },
      { status: 500 }
    );
  }
}
