import { getWeather } from '../apis/weather-api';
import { IContext } from '../models/context';

export default {
  tracking: (_parent: unknown, { tracking_number }: { [argName: string]: string }, { trackingData }: IContext) => {
    return trackingData.get(tracking_number);
  },
  weatherPrediction: (_parent: unknown, { latitude, longitude, date, time }: { [argName: string]: string }) => {
    if (date && !validateDateFormat(date)) {
      throw new Error('Please use yyy-mm-dd format for date');
    }
    if (time && !validateTimeFormat(time)) {
      throw new Error('Please use hh:mm:ss format for time');
    }
    return Promise.resolve(getWeather(latitude, longitude, getDate(date, time)));
  },
};

function getDate(date: string, time: string): Date {
  if (!date || !time) {
    return new Date();
  }
  const [year, months, days] = date.split('-');
  const [hours, minutes, seconds] = time.split(':');

  return new Date(+year, +months, +days, +hours, +minutes, +seconds);
}

function validateDateFormat(date: String) {
  const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
  return date.match(dateRegEx) != null;
}

function validateTimeFormat(date: String) {
  const dateRegEx = /^\d{2}:\d{2}:\d{2}$/;
  return date.match(dateRegEx) != null;
}
