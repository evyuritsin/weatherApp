import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "http://api.openweathermap.org/geo/1.0/direct";

  let api = axios.create({
    baseUrl: defaultUrl,
    headers: {
      common: {},
    },
  });
return {
    provide: {
        weatherApi: api,
    },
  };
});