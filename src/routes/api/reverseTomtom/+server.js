import { json } from "@sveltejs/kit";
import { uid } from 'uid';
import { TOMTOM_KEY } from '$env/static/private';

export async function POST({ request, cookies }) {
  const { lat, lon } = await request.json();
 
  const res = await fetch(`https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json?key=${TOMTOM_KEY}&radius=100&entityType=PostalCodeArea`);

  const data = await res.json();
  const address = data.addresses[0].address;
  const pos = data.addresses[0].position.split(',');

  let city = address.postalName ? address.postalName : address.municipality ? address.municipality : address.municipalitySubdivision ? address.municipalitySubdivision : "";
  let region = address?.countrySubdivision;

  const location = {
    src: "geoLocation",
    id: uid(12),
    title: city.concat(", ", region),
    city, region,
    country: address?.countryCode,
    lat: pos[0],
    lon: pos[1],
  };

  cookies.set('lat', pos[0], { path: '/' });
  cookies.set('lon', pos[1], { path: '/' });

  return json({ location }, { status: 201 }); 
}
