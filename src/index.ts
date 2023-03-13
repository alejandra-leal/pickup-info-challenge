import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { WeatherAppDB } from './utils/database';
import schema from './schema';
import { WeatherPredictionsRefresher } from './utils/weatherPredictionRefresher';
import { ContextBuilder } from './utils/contextBuilder';
import { PORT } from './config/constants';
import { IContext } from './models/context';

async function buildServer() {
  const db = new WeatherAppDB();
  await db.connect();

  const contextBuilder = new ContextBuilder(db);
  const context: IContext = await contextBuilder.getContext();

  new WeatherPredictionsRefresher(context.pickupLocationData, db).start();

  const app = express();

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      context,
      graphiql: true,
    })
  );

  app.listen(PORT);
  console.log(`Running GraphQL API server at http://localhost:${PORT}/graphql`);
}

(async () => {
  try {
    await buildServer();
  } catch (error) {
    console.log(`Something went wrong when building the server: `, error);
  }
})();
