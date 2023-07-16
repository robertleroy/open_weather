import { dev } from "$app/environment";
import { uid } from "uid";

export async function load(event) {
  const { pathname } = event.url;
  let ipData;

  if (dev) { // if development => return static data
    ipData = { 
      src: "vercel-ip",
      ip: "107.207.41.105",
      id: uid(12),
      title: "Oklahoma City, Ok",
      city: "Oklahoma City",
      region: "OK",
      country: "US",
      lat: 35.4662,
      lon: -97.5168,
    };
  } else { // else => return vercel ip location data
    const city = decodeURIComponent(event.request.headers.get("x-vercel-ip-city") ?? "unknown");
    const region = decodeURIComponent(event.request.headers.get("x-vercel-ip-country-region") ?? "unknown");

    ipData = {
      src: "vercel-ip",
      ip: event.getClientAddress(),
      id: uid(12),
      title: city.concat(", ", region),
      city,
      region,
      country: decodeURIComponent(event.request.headers.get("x-vercel-ip-country") ?? "unknown"),
      lat: decodeURIComponent(event.request.headers.get("x-vercel-ip-latitude") ?? "unknown"),
      lon: decodeURIComponent(event.request.headers.get("x-vercel-ip-longitude") ?? "unknown"),
    };
  }

  // save coordinates in cookies for tomtom location bias
  /* assumes using tomtom location bias */
  event.cookies.set("lat", ipData.lat, { path: "/" });
  event.cookies.set("lon", ipData.lon, { path: "/" });

  return {
    ipData,
    pathname,
  };
}
