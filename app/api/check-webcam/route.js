import shodan from "shodan";

export async function POST(request) {
  const SHODAN_API_KEY = "j7n70xA4Y32JZBLxJQ162RJBUniLogjU"; // Replace with your Shodan API key
  const client = new shodan.Client(SHODAN_API_KEY);

  try {
    // Parse user input
    const { latitude, longitude, radius = 10 } = await request.json();

    // Validate inputs
    if (
        typeof latitude !== "number" || 
        isNaN(latitude) || 
        typeof longitude !== "number" || 
        isNaN(longitude) || 
        typeof radius !== "number" || 
        radius <= 0 ||
        latitude < -100 || 
        latitude > 90 || 
        longitude < -180 || 
        longitude > 180
      )  {
      return new Response(
        JSON.stringify({ error: "Invalid input. Check latitude, longitude, and radius." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Query Shodan
    const query = `geo:${latitude},${longitude} port:554`;
    const results = await client.search(query);

    const webcams = results.matches.map((device) => ({
      ip: device.ip_str,
      port: device.port,
      location: device.location,
      product: device.product,
    }));

    return new Response(JSON.stringify({ webcams }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error querying Shodan:", error);
    return new Response(JSON.stringify({ error: "Failed to query Shodan." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

