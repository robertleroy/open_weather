
export function titlecase(value) {
  if (!value) return '';
  value = value.toString().toLowerCase();
  return value.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
}

export function sentencecase(value) {
  if (!value) return ''
  value = value.toString()  ;
    return value.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g,function(c){return c.toUpperCase()});
}

export function round(num,d = 0) {
  return Math.round((num) * (Math.pow(10, d))) / (Math.pow(10, d));
} 

export function mmToInches(mm) {
  return (mm / 25.4);
}

/* 
import { titlecase, sentencecase, round } from '$lib/js/filters'; 
let str = "once upon a time";
let pi = 3.141592653589793238462643383279502884197;

<div>titlecase(str)</div>
<div>sentencecase(str)</div>
<div>round(pi, 4)</div>
*/  
