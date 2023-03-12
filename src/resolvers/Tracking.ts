import { getWeather } from '../apis/weather-api';
import { IContext } from '../models/context';
import { ITrackingsData } from '../models/traking';

export default {
  weatherPrediction: async (trackingInfo: ITrackingsData, _args: { [argName: string]: string }, context: IContext) => {
    try {
      // Check if predicition already exists in DB
      const weatherPrediction = await context.predictionsHelper.searchByLocationId(trackingInfo.location_id);
      if (weatherPrediction) {
        console.info('Prediction loaded from DB!');
        return weatherPrediction.prediction;
      }

      // Do API call
      const pickupLocationData = context.pickupLocationData.get(trackingInfo.location_id);
      if (!pickupLocationData) {
        throw new Error('No PickupLocation Data found for locationId: ' + trackingInfo.location_id);
      }
      return await getWeather(pickupLocationData.latitude, pickupLocationData.longitude, new Date());
    } catch (error) {
      console.log(
        `Error while trying to load weatherPrediction for transaction number: ${trackingInfo.tracking_number}`
      );
      throw error;
    }
  },

  pickupLocation: (trackingInfo: ITrackingsData, _args: { [argName: string]: string }, context: IContext) => {
    const pickupLocation = context.pickupLocationData.get(trackingInfo.location_id);

    if (!pickupLocation) {
      throw new Error(`Pickup location not found for transaction number: ${trackingInfo.tracking_number}`);
    }

    return {
      latitude: pickupLocation.latitude,
      longitude: pickupLocation.longitude,
    };
  },
};
