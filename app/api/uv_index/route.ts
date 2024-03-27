export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");

  if (!latitude || !longitude) {
    return Response.json(
      { message: "latitude and longitude are required" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`,
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
