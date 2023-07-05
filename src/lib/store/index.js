import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const duration = writable(200);
export const currentLocation = writable(null);
export const weatherData = writable(null);



const store_name = 'test_store';
const version = '0.1.0';

// const init = JSON.parse(browser && localStorage
//   .getItem(store_name)) || {
//   store_name, version,
//   list: [
//     {"id":"a2431075","title":"One"},
//     {"id":"2431075f","title":"Two"},
//     {"id":"431075fa","title":"Three"}
//   ],
//   sortOrder: ["431075fa","2431075f","a2431075"],
// };

const init = JSON.parse(browser && localStorage
  .getItem(store_name)) || {
  store_name, version,
  list: [],
  sortOrder: [],
};

export const store = writable(browser && init);
store.subscribe(
  (val) => browser && localStorage
    .setItem(store_name, JSON.stringify(val)));


/*
  const location = {
    src: "geoLocation",
    id: uid(12),
    title: city.concat(", ", region),
    city, region,
    country: address?.countryCode,
    lat: pos[0],
    lon: pos[1],
  };
*/