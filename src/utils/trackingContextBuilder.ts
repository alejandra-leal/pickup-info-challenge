import { TRACKINGS_COLLECTION } from "../config/constants";
import { IContextBuilder } from "../models/context-builder";
import { TrackingDataMap, ITrackingsData } from "../models/traking";
import { WeatherAppDB } from "./database";

/**
 * Builds tracking information map from db
 */
export class TrackingContextBuilder implements IContextBuilder<TrackingDataMap> {
    private db: WeatherAppDB;
  
    buildContextValue = async () => {
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
  