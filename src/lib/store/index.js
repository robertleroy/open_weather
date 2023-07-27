import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export { default as dateObj } from "./dateObj.js";
export { titlecase, sentencecase, round, mmToInches } from './filters';

export const duration = writable(200);
export const currentLocation = writable(null);
export const weatherData = writable(null);
export const transitionEnded = writable(null);



const store_name = 'test_store';
const version = '0.2.0';


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
