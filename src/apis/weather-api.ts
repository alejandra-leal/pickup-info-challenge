import axios from 'axios';
import { APP_ID, OPEN_WEATHERMAP_ENDPOINT } from '../config/constants';
import { IOpenWeatherMapResponse } from '../models/weather-api';
import { IWeatherPredictionResult } from '../models/weather-prediction';

/**
 * Calls openweathermap API and parses response
 */
export async function getWeather(latitude: String, longitude: String, _date?: Date): Promise<IWeatherPredictionResult> {
  try {
    const result: IOpenWeatherMapResponse = await axios.get(OPEN_WEATHERMAP_ENDPOINT, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: APP_ID,
        cnt: 1,
        /**
                 * 
                 * Note: if we had the paid subscription, we could also send the date for forecast/historical predictions.
                 * It is currently not supported by this app.
                 * 
                 * start: toUnixTimestamp(date),
                   end: toUnixTimestamp(date),
                   more info here: https://openweathermap.org/history
                 *
                 */
      },
    });
    if (!result.data) {
      throw new Error(`Could not load weather from API. lat: ${latitude} lon: ${longitude}`);
    }

    return {
      minTemperature: result.data.list[0].main.temp_min,
      maxTemperature: result.data.list[0].main.temp_max,
      humidity: result.data.list[0].main.humidity,
      rainProbability: result.data.list[0].pop,
    };
  } catch (error) {
    console.error('weatherService:getWeather error.', error);
    throw error;
  }
}
