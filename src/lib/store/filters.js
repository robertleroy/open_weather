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

export function getDescription(str) {
  return  str.startsWith("scattered") ? "partly cloudy" :
  str.startsWith("broken") ? "mostly cloudy" : 
  str;
}; /* str.startsWith("clear") ? "clear" : */

export function formatSummary(str) {
  return sentencecase(str.replace(/(Expect a day of )|(There will be )|(The day will start with )|(You can expect )|(today)/g, ""));
}