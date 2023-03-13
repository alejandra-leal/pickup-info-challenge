# WeatherApp

## Prerequisites:

- [NodeJS](https://nodejs.org/en/download/ 'NodeJS')
- [Docker](https://www.docker.com/products/docker-desktop/ 'Docker')

## Quick-start

#### Step 1: Install dependencies

`npm install`

#### Step 2: Start database and load data

`npm run setup`

> To create your mongodb docker image and will parse and process the CSV files' content found in /setup/assets


#### Step 3: Set your environment!

Create a .env file with the following content:

`APP_ID={YOUR_OPEN_WEATHER_MAP_API_KEY}`

i.e.

`APP_ID=123456789`

> You can also include a REFRESH_INTERVAL_IN_MS variable to determine how often the predicted weather will be refreshed into the db. the default value is 5 minutes.
> REFRESH_INTERVAL_IN_MS=300000

#### Step 4: Ready to run!

`npm start`

> You should see a log confirming it all went well, like so:
> `Running GraphQL API server at http://localhost:8000/graphql`

#### Step 4: Do requests!

Open the returned graphQL playground link in your browser and start doing queries!

## API Samples:

#### Tracking Information Request

#### Input values:

| name            | type   | required | example                                |
| --------------- | ------ | -------- | -------------------------------------- |
| tracking_number | string | yes      | "d991261c-1ad6-11ec-9216-002b67ce00fa" |

    tracking(tracking_number: "d991261c-1ad6-11ec-9216-002b67ce00fa") {
    pickup_date
    tracking_number
    location_id
    weatherPrediction {
      minTemperature
      maxTemperature
      humidity
      rainProbability
    }
    pickupLocation{
      latitude
      longitude
    }
  }

#### Tracking Information Response

#### Output values:

| name                              | type       | example                                |
| --------------------------------- | ---------- | -------------------------------------- |
| pickup_date                       | string     | "2021-03-17 17:43:46"                  |
| tracking_number                   | string     | "d991261c-1ad6-11ec-9216-002b67ce00fa" |
| location_id                       | string     | 2                                      |
| weatherPrediction.minTemperature  | float      | 273.53                                 |
| weatherPrediction.maxTemperature  | float      | 275.17                                 |
| weatherPrediction.humidity        | float      | 64                                     |
| weatherPrediction.rainProbability | float/null | 3.1                                    |
| pickupLocation.latitude           | string     | "48.14334554801293"                    |
| pickupLocation.longitude          | string     | "11.550779973235018"                   |

    "tracking": {
          "pickup_date": "2021-03-17 17:43:46",
          "tracking_number": "d991261c-1ad6-11ec-9216-002b67ce00fa",
          "location_id": "2",
          "weatherPrediction": {
            "minTemperature": 274.6,
            "maxTemperature": 276.84,
            "humidity": 59,
            "rainProbability": null
          },
          "pickupLocation": {
            "latitude": "48.14334554801293",
            "longitude": "11.550779973235018"
          }
       }

#### Weather Prediction Request

#### Input values:

| name      | type   | required | example              |
| --------- | ------ | -------- | -------------------- |
| latitude  | string | yes      | "48.774039637153685" |
| longitude | string | yes      | "48.774039637153685" |
| date      | string | no       | "2023-01-01"         |
| time      | string | no       | "12:12:12"           |

    weatherPrediction(
    	latitude: "48.774039637153685",
      longitude:"11.39017166699694",
    	date:"2023-01-01",
    	time:"12:12:12"){
        minTemperature
        maxTemperature
        humidity
        rainProbability
      }

#### Weather Prediction Response

#### Output values:

| name            | type  | example |
| --------------- | ----- | ------- |
| minTemperature  | float | 273.53  |
| maxTemperature  | float | 275.17  |
| humidity        | float | 64      |
| rainProbability | float | 3.1     |

    "weatherPrediction": {
          "minTemperature":  273.53,
          "maxTemperature": 275.17,
          "humidity": 64,
          "rainProbability": 3.1
        }

## Running Tests:

> To run single test

`npm run test -- <TEST_TO_RUN>.test.ts`

> To run all tests

`npm run test`

> To see tests coverage report
`npm run coverage`
