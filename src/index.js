/* @flow */

import express from 'express';
import expressGraphQL from 'express-graphql';
import schema from './schema/Schema';

const PORT = process.env.PORT || 80;
const app = express();

app.use(
  '/',
  expressGraphQL(req => ({
    schema,
    graphiql: true,
    context: req,
  }))
);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/graphql`);
});
