import * as env from '../config/env.json';
require('dotenv').config();

export const PORT = env.PORT;

// Weather API
export const APP_ID = process.env.APP_ID;
export const OPEN_WEATHERMAP_ENDPOINT = env.OPEN_WEATHERMAP_ENDPOINT;

export const REFRESH_INTERVAL_IN_MS = process.env.REFRESH_INTERVAL_IN_MS
  ? Number(process.env.REFRESH_INTERVAL_IN_MS)
  : env.REFRESH_INTERVAL_IN_MS;

// Mongo
export const MONGO_CLUSTER_URL = env.MONGO_CLUSTER_URL;
export const MONGO_USERNAME = env.MONGO_USERNAME;
export const MONGO_PASSWORD = env.MONGO_PASSWORD;
export const MONGO_AUTH_MECHANISM = env.MONGO_AUTH_MECHANISM;
export const DB_NAME = env.DB_NAME;
export const TRACKINGS_COLLECTION = env.TRACKINGS_COLLECTION;
export const PICKUP_LOCATION_COLLECTION = env.PICKUP_LOCATION_COLLECTION;
export const PREDICTIONS_COLLECTION = env.PREDICTIONS_COLLECTION;
