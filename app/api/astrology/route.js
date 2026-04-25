import * as Astronomy from "astronomy-engine";
import {
  Origin,
  Horoscope
} from "circular-natal-horoscope-js";

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

function getUTCDateFromLocal(birthDate, birthTime, timezone) {
  const [year, month, day] = birthDate.split("-").map(Number);
  const [hour, minute] = (birthTime || "12:00").split(":").map(Number);

  const guessUTC = new Date(Date.UTC(year, month - 1, day, hour, minute));

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "shortOffset"
  }).formatToParts(guessUTC);

  const offsetText =
    parts.find((part) => part.type === "timeZoneName")?.value || "GMT";

  const match = offsetText.match(/GMT([+-]\d{1,2})(?::(\d{2}))?/);

  let offsetHours = 0;

  if (match) {
    const h = Number(match[1]);
    const m = Number(match[2] || 0);
    offsetHours = h + Math.sign(h || 1) * (m / 60);
  }

  return new Date(Date.UTC(year, month - 1, day, hour - offsetHours, minute));
}

function getAscendantWithLibrary({ birthDate, birthTime, location }) {
  const [year, month, day] = birthDate.split("-").map(Number);
  const [hour, minute] = (birthTime || "12:00").split(":").map(Number);

  const origin = new Origin({
    year,
    month: month - 1,
    date: day,
    hour,
    minute,
    latitude: Number(location.latitude),
    longitude: Number(location.longitude)
  });

  const horoscope = new Horoscope({
    origin,
    houseSystem: "placidus",
    zodiac: "tropical"
  });

  const ascendantPoint =
    horoscope?.Angles?.Ascendant ||
    horoscope?.angles?.Ascendant ||
    horoscope?.Ascendant ||
    horoscope?.ascendant;

  const rawSign =
    ascendantPoint?.Sign?.label ||
    ascendantPoint?.sign?.label ||
    ascendantPoint?.Sign?.Label ||
    ascendantPoint?.sign ||
    null;

  const rawDegree =
    ascendantPoint?.ChartPosition?.Ecliptic?.DecimalDegrees ||
    ascendantPoint?.chartPosition?.Ecliptic?.DecimalDegrees ||
    ascendantPoint?.ChartPosition?.Horizon?.DecimalDegrees ||
    null;

  return {
    sign: typeof rawSign === "string" ? rawSign : "Unknown",
    degree: rawDegree !== null ? Number(rawDegree.toFixed(2)) : null
  };
}

export async function POST(req) {
  try {
    const body = await req.json();

    const birthDate = body.birthDate;
    const birthTime = body.birthTime || "12:00";
    const location = body.location;

    const date = getUTCDateFromLocal(
      birthDate,
      birthTime,
      location?.timezone || "UTC"
    );

    const planetarySigns = planets.map((planet) => {
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
      const asc = getAscendantWithLibrary({
        birthDate,
        birthTime,
        location
      });

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
