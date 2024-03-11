import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export { default as dateObj } from "./dateObj.js";
export { titlecase, sentencecase, formatSummary, round, mmToInches, getDescription } from './filters';

export const duration = writable(200);
export const currentLocation = writable(null);
export const weatherData = writable(null);
export const transitionEnded = writable(null);


const store_name = 'darkcloud_store';
const version = '0.0.1';

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
