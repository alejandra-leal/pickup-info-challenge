const {
  MONGO_CLUSTER_URL,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_AUTH_MECHANISM,
  DB_NAME,
  TRACKINGS_COLLECTION,
  PICKUP_LOCATION_COLLECTION,
  PREDICTIONS_COLLECTION,
} = require('../src/config/env.json');
const { MongoClient } = require('mongodb');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');

const trackingsPath = path.join(__dirname, './assets/trackings.csv');
const pickupLocationPath = path.join(__dirname, './assets/gps.csv');
const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER_URL}/?authMechanism=${MONGO_AUTH_MECHANISM}`;

const client = new MongoClient(uri);

async function main() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(DB_NAME);

  // Create collections
  const trackingCollection = db.collection(TRACKINGS_COLLECTION);
  const pickupLocationCollection = db.collection(PICKUP_LOCATION_COLLECTION);
  const predictionsCollection = db.collection(PREDICTIONS_COLLECTION);

  // Reset collections
  await trackingCollection.deleteMany({});
  await pickupLocationCollection.deleteMany({});
  await predictionsCollection.deleteMany({});

  // Load static data
  const trackingData = await extractDataFromCSV(trackingsPath, ['tracking_number', 'location_id', 'pickup_date']);
  const pickupLocationData = await extractDataFromCSV(pickupLocationPath, ['location_id', 'latitude', 'longitude']);

  // Insert to collections
  const trackingInsertResult = await trackingCollection.insertMany(trackingData);
  const pickupLocationInsertResult = await pickupLocationCollection.insertMany(pickupLocationData);

  console.log(`${trackingInsertResult.insertedCount} documents inserted to Trackings collection`);
  console.log(`${pickupLocationInsertResult.insertedCount} documents inserted to PickupLocation collection`);

  return 'done.';
}

function extractDataFromCSV(csvPath, headers) {
  try {
    return new Promise((resolve, _reject) => {
      let data = [];

      fs.createReadStream(csvPath)
        .pipe(csv(headers))
        .on('data', (row) => data.push(row))
        .on('end', () => resolve(data));
    });
  } catch (error) {
    console.log(`Could not extract data from csv: ${csvPath}`);
    throw error;
  }
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
