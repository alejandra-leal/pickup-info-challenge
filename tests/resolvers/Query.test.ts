import { describe, expect, it, jest } from '@jest/globals';
import * as weatherService from '../../src/apis/weather-api';
import Query from '../../src/resolvers/Query';

describe('Query resolvers', () => {
  describe('tracking', () => {
    const trackingID = 'DummyId';
    it('should return tracking information when existing', async () => {
      const trackingData = new Map([
        [
          '123',
          {
            tracking_number: '1243',
          },
        ],
        [
          trackingID,
          {
            tracking_number: trackingID,
          },
        ],
      ]);
      const context = {
        trackingData,
      };

      const expected = {
        tracking_number: trackingID,
      };
      const result = await Query.tracking(null, { tracking_number: trackingID }, context as any);

      expect(result).toEqual(expected);
    });
    it('should return undefined when tracking info is not found', async () => {
      const trackingData = new Map([
        [
          '123',
          {
            tracking_number: '1243',
          },
        ],
      ]);
      const context = {
        trackingData,
      };
      const result = await Query.tracking(undefined, { id: trackingID }, context as any);
      expect(result).toEqual(undefined);
    });
  });

  describe('weatherPrediction', () => {
    it('should throw error when date format is not yyy-mm-dd', async () => {
      const args = {
        date: '10-10-2023',
      };
      expect(() => {
        Query.weatherPrediction(null, args as any);
      }).toThrow('Please use yyy-mm-dd format for date');
    });
    it('should throw error when time format is not hh:mm:ss', async () => {
      const args = {
        date: '2023-10-10',
        time: '12:1:12',
      };
      expect(() => {
        Query.weatherPrediction(null, args as any);
      }).toThrow('Please use hh:mm:ss format for time');
    });
    it('should use todays date when date and time are not provided', async () => {
      const expected = {
        minTemperature: 1,
        maxTemperature: 1,
        humidity: 1,
        rainProbability: 0.1,
      } as any;
      const mock = jest.spyOn(weatherService, 'getWeather');
      mock.mockReturnValue(expected);
      const args = {
        latitude: 0,
        longitude: 0,
      };
      const result = await Query.weatherPrediction(null, args as any);
      expect(result).toBe(expected);
    });
    it('should return pickup location when inputs are in the right format', async () => {
      const expected = {
        minTemperature: 1,
        maxTemperature: 1,
        humidity: 1,
        rainProbability: 0.1,
      } as any;
      const mock = jest.spyOn(weatherService, 'getWeather');
      mock.mockReturnValue(expected);
      const args = {
        date: '2023-10-10',
        time: '12:12:12',
        latitude: 0,
        longitude: 0,
      };
      const result = await Query.weatherPrediction(null, args as any);
      expect(result).toBe(expected);
    });
  });
});
