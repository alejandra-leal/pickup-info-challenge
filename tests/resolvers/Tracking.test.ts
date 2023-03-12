import { describe, expect, it, jest } from '@jest/globals';
import * as weatherService from '../../src/apis/weather-api';
import Tracking from '../../src/resolvers/Tracking';

describe('Tracking resolvers', () => {
  describe('weatherPrediction', () => {
    const locationId = 'DummyId';
    const pickupLocationData = new Map([
      [
        '1243',
        {
          location_id: '1243',
        },
      ],
      [
        locationId,
        {
          location_id: locationId,
        },
      ],
    ]);

    it('should not call service when weatherPrediction exists in db', async () => {
      const context = {
        pickupLocationData,
        predictionsHelper: {
          searchByLocationId: jest.fn(() => 'Something'),
        },
      };

      const mock = jest.spyOn(weatherService, 'getWeather');

      await Tracking.weatherPrediction({ location_id: locationId } as any, {}, context as any);

      expect(mock).toBeCalledTimes(0);
    });
    it('should call service when weatherPrediction does NOT exist in db', async () => {
      const context = {
        pickupLocationData,
        predictionsHelper: {
          searchByLocationId: jest.fn(),
        },
      };

      const expected = {
        minTemperature: 1,
        maxTemperature: 1,
        humidity: 1,
        rainProbability: 0.1,
      } as any;
      const mock = jest.spyOn(weatherService, 'getWeather');
      mock.mockReturnValue(expected);

      const result = await Tracking.weatherPrediction({ location_id: locationId } as any, {}, context as any);

      expect(result).toEqual(expected);
      expect(mock).toBeCalledTimes(1);
    });
    it('should throw error when pickupLocation Data is not found', async () => {
      const context = {
        pickupLocationData: new Map(),
        predictionsHelper: {
          searchByLocationId: jest.fn(),
        },
      };

      await expect(Tracking.weatherPrediction({ location_id: locationId } as any, {}, context as any)).rejects.toThrow(
        new Error('No PickupLocation Data found for locationId: DummyId')
      );
    });
  });
  describe('pickupLocation', () => {
    const locationId = 'DummyId';

    it('should return pickup information when found', async () => {
      const dummyLatitude = '48.11';
      const dummyLongitude = '48.11';
      const pickupLocationData = new Map([
        [
          '1243',
          {
            location_id: '1243',
          },
        ],
        [
          locationId,
          {
            location_id: locationId,
            latitude: dummyLatitude,
            longitude: dummyLongitude,
          },
        ],
      ]);
      const context = {
        pickupLocationData,
      };
      const result = await Tracking.pickupLocation({ location_id: locationId } as any, {}, context as any);
      expect(result.latitude).toBe(dummyLatitude);
      expect(result.longitude).toBe(dummyLongitude);
    });
    it('should throw error when pickup location not found', async () => {
      const trackingNumber = '123';
      const pickupLocationData = new Map([
        [
          '1243',
          {
            location_id: '1243',
          },
        ],
      ]);
      const context = {
        pickupLocationData,
      };
      expect(() =>
        Tracking.pickupLocation({ location_id: locationId, tracking_number: trackingNumber } as any, {}, context as any)
      ).toThrow(`Pickup location not found for transaction number: ${trackingNumber}`);
    });
  });
});
