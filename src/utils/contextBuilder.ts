import { IContext } from '../models/context';
import { WeatherAppDB } from './database';
import { PickupLocationContextBuilder } from './pickupLocationContextBuilder';
import { PredictionsHelper } from './predictionsHelper';
import { TrackingContextBuilder } from './trackingContextBuilder';

/**
 * Builds static context data maps from db
 */
export class ContextBuilder {
  private trackingContextBuilder: TrackingContextBuilder;
  private pickupLocationContextBuilder: PickupLocationContextBuilder;
  private predictionsHelper: PredictionsHelper;

  async getContext(): Promise<IContext> {
    return {
      trackingData: await this.trackingContextBuilder.buildContextValue(),
      pickupLocationData: await this.pickupLocationContextBuilder.buildContextValue(),
      predictionsHelper: this.predictionsHelper,
    }
  }

  /**
   * @param  {[WeatherAppDB]} db [MongoDB WeatherApp Client]
   */
  constructor(db: WeatherAppDB) {
    this.trackingContextBuilder = new TrackingContextBuilder(db);
    this.pickupLocationContextBuilder = new PickupLocationContextBuilder(db);
    this.predictionsHelper = new PredictionsHelper(db);
  }
}




