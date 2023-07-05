import { json } from "@sveltejs/kit";
import { WEATHER_KEY } from "$env/static/private";
import testOneCall from "./wet/oneCall.json";
import testFiveDay from "./wet/fiveDay.json";

const testing = true;

export async function POST({ request }) {
  if (testing) {
    return json({...testOneCall, fiveDay: testFiveDay.list ?? []});
  } else {
    const { lat, lon } = await request.json();
    try {      
      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_KEY}`
      );
      const onecall = await res.json();

      const res2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_KEY}`
      );
      const fiveDay = await res2.json();

      
    // console.log(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_KEY}`);
    // console.log(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_KEY}`);

      return json({...onecall, fiveDay: fiveDay.list ?? []});
    } catch (error) {
      console.log("fetch error:", error);
    }
  }
}



/*
https://api.openweathermap.org/data/3.0/onecall?lat=35.5651&lon=-97.6361&units=imperial&appid=826b835b9408db50ca70aa7158b06f23
 
https:api.openweathermap.org/data/2.5/forecast?lat=35.5651&lon=-97.6361&units=imperial&appid=826b835b9408db50ca70aa7158b06f23

35.565154064502224, -97.63618986603797*/
