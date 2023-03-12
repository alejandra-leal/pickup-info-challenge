import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLFloat,
} from 'graphql/type';
import Query from './resolvers/Query';
import Tracking from './resolvers/Tracking';

const WeatherPredictionType = new GraphQLObjectType({
  name: 'WeatherPredictionType',
  fields: {
    minTemperature: {
      type: GraphQLFloat,
    },
    maxTemperature: {
      type: GraphQLFloat,
    },
    humidity: {
      type: GraphQLInt,
    },
    rainProbability: {
      type: GraphQLFloat,
    },
  },
});

const PickupLocationType = new GraphQLObjectType({
  name: 'PickupLocationType',
  fields: {
    latitude: {
      type: GraphQLString,
    },
    longitude: {
      type: GraphQLString,
    },
  },
});

const TrackingType = new GraphQLObjectType({
  name: 'TrackingType',
  fields: {
    tracking_number: {
      type: GraphQLID,
    },
    location_id: {
      type: GraphQLID,
    },
    pickup_date: {
      type: GraphQLString,
    },
    weatherPrediction: {
      type: WeatherPredictionType,
      resolve: Tracking.weatherPrediction,
    },
    pickupLocation: {
      type: PickupLocationType,
      resolve: Tracking.pickupLocation,
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    tracking: {
      type: TrackingType,
      args: {
        tracking_number: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: Query.tracking,
    },
    weatherPrediction: {
      type: WeatherPredictionType,
      args: {
        latitude: {
          type: new GraphQLNonNull(GraphQLString),
        },
        longitude: {
          type: new GraphQLNonNull(GraphQLString),
        },
        date: {
          type: GraphQLString,
        },
        time: {
          type: GraphQLString,
        },
      },
      resolve: Query.weatherPrediction,
    },
  },
});

export default new GraphQLSchema({
  query: QueryType,
});
