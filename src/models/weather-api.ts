export interface IOpenWeatherMapResponse {
  data: {
    list: IOpenWeatherList[];
  };
}

export interface IOpenWeatherList {
  main: {
    temp_min: Number;
    temp_max: Number;
    humidity: Number;
  };
  pop: Number;
}
