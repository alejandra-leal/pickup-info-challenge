import { REFRESH_INTERVAL_IN_MS, PREDICTIONS_COLLECTION } from '../config/constants';
import { getWeather } from '../apis/weather-api';
import { WeatherAppDB } from './database';
import { IWeatherPrediction } from '../models/weather-prediction';
import { PickupLocationDataMap } from '../models/pickup-location';

/**
 * Periodically refreshes weather prediction to the database
 * for the static locations found in the PickupLocationDataMap
 */
export class WeatherPredictionsRefresher {
  private interval: string | number | NodeJS.Timer | undefined;
  private pickupLocationData: PickupLocationDataMap;
  private db: WeatherAppDB;

  start() {
    this.loadPredictions();
    this.interval = setTimeout(() => {
      this.loadPredictions();
    }, REFRESH_INTERVAL_IN_MS);
  }
  stop() {
    clearTimeout(this.interval);
  }

  async loadPredictions() {
    try {
      console.log('Updating weather predictions..');
      const itemsToInsert = await this.getItemsToInsert();
      await this.db.resetCollection(PREDICTIONS_COLLECTION);
      await this.db.insertMany(PREDICTIONS_COLLECTION, itemsToInsert, {
        ordered: false,
      });
      console.log('Predictions correctly updated!');
    } catch (error) {
      console.log(`Could not load predictions: ${error}`);
    }
  }

  private getItemsToInsert(): Promise<IWeatherPrediction[]> {
    const pickupLocationValues = Array.from(this.pickupLocationData.values());

    return Promise.all(
      pickupLocationValues.map(async (location) => {
        const prediction = await getWeather(location.latitude, location.longitude);
        const predictionResult: IWeatherPrediction = {
          location_id: location.location_id,
          prediction,
        };
        return predictionResult;
      })
    );
  }

  /**
   * @param  {[PickupLocationDataMap]} pickupLocationData [Static Pickup locations to load]
   * @param  {[WeatherAppDB]} db [MongoDB WeatherApp Client]
   */
  constructor(pickupLocationData: PickupLocationDataMap, db: WeatherAppDB) {
    this.pickupLocationData = pickupLocationData;
    this.db = db;
  }
}
