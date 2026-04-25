export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { city } = await req.json();

    if (!city) {
      return Response.json({ error: "City is required." }, { status: 400 });
    }

    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
    url.searchParams.set("name", city);
    url.searchParams.set("count", "1");
    url.searchParams.set("language", "en");
    url.searchParams.set("format", "json");

    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error("Failed to fetch location.");
    }

    const data = await res.json();
    const place = data.results?.[0];

    if (!place) {
      return Response.json(
        { error: "Location not found." },
        { status: 404 }
      );
    }

    return Response.json({
      name: place.name,
      country: place.country,
      latitude: place.latitude,
      longitude: place.longitude,
      timezone: place.timezone
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Location lookup failed." },
      { status: 500 }
    );
  }
}
