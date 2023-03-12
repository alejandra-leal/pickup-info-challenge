import { TRACKINGS_COLLECTION, PICKUP_LOCATION_COLLECTION } from '../config/constants';
import { PickupLocationDataMap, IPickupLocationData } from '../models/pickup-location';
import { TrackingDataMap, ITrackingsData } from '../models/traking';
import { WeatherAppDB } from './database';

/**
 * Builds static context data maps from db
 */
export class ContextHelper {
  private db: WeatherAppDB;

  async getTrackingsMap(): Promise<TrackingDataMap> {
    const trackingsMap: TrackingDataMap = new Map();
    const trackingsCursor = await this.db.get<ITrackingsData>(TRACKINGS_COLLECTION, {});

    while (await trackingsCursor.hasNext()) {
      const currentCursor = await trackingsCursor.next();
      if (currentCursor) {
        trackingsMap.set(currentCursor.tracking_number, {
          ...currentCursor,
          pickup_date: this.formatDate(currentCursor.pickup_date),
        });
      }
    }
    return trackingsMap;
  }

  async getPickupLocationsDataMap(): Promise<PickupLocationDataMap> {
    const getPickupLocationDataMap: PickupLocationDataMap = new Map();
    const pickupLocationDataCursor = await this.db.get<IPickupLocationData>(PICKUP_LOCATION_COLLECTION, {});

    while (await pickupLocationDataCursor.hasNext()) {
      const currentCursor = await pickupLocationDataCursor.next();
      currentCursor && getPickupLocationDataMap.set(currentCursor.location_id, currentCursor);
    }
    return getPickupLocationDataMap;
  }

  private formatDate(date: string): string {
    if (date.length !== 15) {
      return date;
    }
    const cleanDate = date.replace('.', '');
    const year = cleanDate.slice(0, 4);
    const months = cleanDate.slice(4, 6);
    const days = cleanDate.slice(6, 8);
    const hrs = cleanDate.slice(8, 10);
    const mins = cleanDate.slice(10, 12);
    const secs = cleanDate.slice(12, 14);

    return `${year}-${months}-${days} ${hrs}:${mins}:${secs}`;
  }

  /**
   * @param  {[WeatherAppDB]} db [MongoDB WeatherApp Client]
   */
  constructor(db: WeatherAppDB) {
    this.db = db;
  }
}
