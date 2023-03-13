import { PICKUP_LOCATION_COLLECTION } from "../config/constants";
import { IContextBuilder } from "../models/context-builder";
import { PickupLocationDataMap, IPickupLocationData } from "../models/pickup-location";
import { WeatherAppDB } from "./database";

/**
 * Builds pickup location information map from db
 */
export class PickupLocationContextBuilder implements IContextBuilder<PickupLocationDataMap> {
    private db: WeatherAppDB;
  
    buildContextValue = async () => {
      const getPickupLocationDataMap: PickupLocationDataMap = new Map();
      const pickupLocationDataCursor = await this.db.get<IPickupLocationData>(PICKUP_LOCATION_COLLECTION, {});
  
      while (await pickupLocationDataCursor.hasNext()) {
        const currentCursor = await pickupLocationDataCursor.next();
        currentCursor && getPickupLocationDataMap.set(currentCursor.location_id, currentCursor);
      }
      return getPickupLocationDataMap;
    }
  
    /**
   * @param  {[WeatherAppDB]} db [MongoDB WeatherApp Client]
   */
    constructor(db: WeatherAppDB) {
      this.db = db;
    }
  
  }