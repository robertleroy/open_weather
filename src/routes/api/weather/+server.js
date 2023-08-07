import { json } from "@sveltejs/kit";
import { WEATHER_KEY } from "$env/static/private";
// import testOneCall from "./wet_2/oneCall.json";
// import testFiveDay from "./wet_2/fiveDay.json";

const testing = false;

export async function POST({ fetch, request }) {
  let data = {};
  // if (testing) {
  //   data = {...testOneCall, fiveDay: testFiveDay.list ?? [], timestamp: Date.now()};
  // } else {
    const { lat, lon } = await request.json();

    const updatedData = async () => {
      try {   
        const res = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_KEY}`
        );
        const onecall = await res.json();

        const res2 = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_KEY}`
        );
        const fiveDay = await res2.json();

        data = {...onecall, fiveDay: fiveDay.list ?? [], timestamp: Date.now()};
      } catch (error) {
        console.log("fetch error:", error);
      }

      return json(data);
    }
    
    // let updatedData = setTimeout(updatData(), 30000)
    
    // try {   
    //   const res = await fetch(
    //     `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_KEY}`
    //   );
    //   const onecall = await res.json();

    //   const res2 = await fetch(
    //     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_KEY}`
    //   );
    //   const fiveDay = await res2.json();

    //   data = {...onecall, fiveDay: fiveDay.list ?? [], timestamp: Date.now()};
    // } catch (error) {
    //   console.log("fetch error:", error);
    // }
  // }

  // return json(data);
  return updatedData();
}

