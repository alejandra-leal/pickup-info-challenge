import { describe, expect, it, jest } from '@jest/globals';
import { getWeather } from '../../src/apis/weather-api';
import axios from 'axios';
import * as weatherAPIResponse from '../mocks/weatherAPIResponse.json';

describe('Weather Service', () => {
  describe('getWeather', () => {
    it('should parse API Response to IWeatherResult', async () => {
      const dummyLatitude = '1';
      const dummyLongitude = '2';
      const dummyResponse = {
        data: weatherAPIResponse,
      };

      const mock = jest.spyOn(axios, 'get');
      mock.mockReturnValue(dummyResponse as any);

      const result = await getWeather(dummyLatitude, dummyLongitude);

      expect(result.minTemperature).toBeTruthy();
      expect(result.maxTemperature).toBeTruthy();
      expect(result.humidity).toBeTruthy();
    });
    it('should throw error when response is empty', async () => {
      const dummyLatitude = '1';
      const dummyLongitude = '2';
      const expectedError = `Could not load weather from API. lat: ${dummyLatitude} lon: ${dummyLongitude}`;

      const mock = jest.spyOn(axios, 'get');
      mock.mockReturnValue({} as any);

      await expect(getWeather(dummyLatitude, dummyLongitude)).rejects.toThrowError(expectedError);
    });
    it('should throw error when APi fails', async () => {
      const dummyLatitude = '1';
      const dummyLongitude = '2';
      const expectedError = 'DummyError';

      const mock = jest.spyOn(axios, 'get');
      mock.mockRejectedValue(new Error(expectedError));

      await expect(getWeather(dummyLatitude, dummyLongitude)).rejects.toThrowError(expectedError);
    });
  });
});
