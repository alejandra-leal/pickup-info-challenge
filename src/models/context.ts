import { PredictionsHelper } from '../utils/predictionsHelper';
import { PickupLocationDataMap } from './pickup-location';
import { TrackingDataMap } from './traking';

export interface IContext {
  trackingData: TrackingDataMap;
  pickupLocationData: PickupLocationDataMap;
  predictionsHelper: PredictionsHelper;
}
