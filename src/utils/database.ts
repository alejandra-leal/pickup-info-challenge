import { MONGO_CLUSTER_URL, MONGO_USERNAME, MONGO_PASSWORD, MONGO_AUTH_MECHANISM, DB_NAME } from '../config/constants';
import { BulkWriteOptions, Document, MongoClient } from 'mongodb';

/**
 * Connects to Mongodb, provides methods to interact with db
 */
export class WeatherAppDB {
  private client = new MongoClient(
    `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER_URL}/?authMechanism=${MONGO_AUTH_MECHANISM}`
  );

  async connect() {
    try {
      console.log('Trying to connect to mongo');
      await this.client.connect();
      console.log(`Connected to Mongo!`);
      return this.client;
    } catch (error) {
      console.error(`Error while trying to connect to mongo: ${error}`);
    }
  }

  get<R extends Document>(collectionName: string, query: {}) {
    const db = this.client.db(DB_NAME);
    const collection = db.collection(collectionName);
    return collection.find<R>(query);
  }

  async resetCollection(collectionName: string) {
    const db = this.client.db(DB_NAME);
    const collection = db.collection(collectionName);
    return await collection.deleteMany({});
  }

  async insertMany<T extends Document>(collectionName: string, items: T[], options?: BulkWriteOptions) {
    const db = this.client.db(DB_NAME);
    const collection = db.collection(collectionName);
    return await collection.insertMany(items, options);
  }
}
