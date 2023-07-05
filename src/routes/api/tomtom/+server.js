import { error, json } from "@sveltejs/kit";
import { TOMTOM_KEY } from '$env/static/private';
import { uid } from 'uid';

export async function POST({ request, cookies }) {

  const searchTerm = await request.json();  
  const lat = '40.0426';
  const lon = '-106.3980';

  const res = await fetch(`https://api.tomtom.com/search/2/search/${searchTerm}.json?key=${TOMTOM_KEY}&limit=1&lat=${lat}&lon=${lon}&idxSet=Geo`);
  const data = await res.json();

  if (!data.results.length) {
    throw error(404, {
      status: 404,
      message: "Not Found"
    });
  }   
  const location = formatTomtom(data?.results[0]);

  return json(location, { status: 201 }); 
}


function formatTomtom(data) {
  let city = data.address.postalName ? data.address.postalName : data.address.municipality ? data.address.municipality : data.address.municipalitySubdivision ? data.address.municipalitySubdivision : "";
  let region = data.address.countryCode !== "US" ? data.address.countryCode : data.address.countrySubdivision ?
    data.address.countrySubdivision : '';
  let obj = {
    src: "tomtom",
  };
  
  obj.id = uid(12);
  obj.title = city.concat(", ", region);

  obj.city = city;
  obj.region = region;

  obj.countryCode = data.address.countryCode;
  obj.lat = data.position.lat;
  obj.lon = data.position.lon;
  return obj;
}
