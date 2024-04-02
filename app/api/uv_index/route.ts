export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return Response.json(
      { message: "lat and lon are required" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`,
    {
      headers: {
        "x-access-token": `${process.env.NEXT_PUBLIC_OPEN_UV_API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch UV data");
  }

  const data = await res.json();

  return Response.json(data);
}
