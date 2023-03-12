import { PREDICTIONS_COLLECTION } from '../config/constants';
import { WeatherAppDB } from './database';
import { IWeatherPrediction } from '../models/weather-prediction';

export class PredictionsHelper {
  private db: WeatherAppDB;

  searchByLocationId(locationId: string): Promise<IWeatherPrediction | null> {
    return this.db.get<IWeatherPrediction>(PREDICTIONS_COLLECTION, { location_id: locationId }).next();
  }

  /**
   * @param  {[WeatherAppDB]} db [MongoDB WeatherApp Client]
   */
  constructor(db: WeatherAppDB) {
    this.db = db;
  }
}
