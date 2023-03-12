export interface IWeatherPrediction {
  location_id: String;
  prediction: IWeatherPredictionResult;
}

export interface IWeatherPredictionResult {
  minTemperature: Number;
  maxTemperature: Number;
  humidity: Number;
  rainProbability: Number | undefined;
}
