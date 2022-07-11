const { Pool } = require('pg');
const format = require('pg-format');

let pool;

exports.handler = async (event) => {
  if (!pool) {
    const connectionString = process.env.DB_URL;
    pool = new Pool({
      connectionString,
      max: 1,
    });
  }
  const client = await pool.connect();
  const userSub = event.requestContext.authorizer.jwt.claims.sub;
  const realBody = JSON.parse(event.body);
  const err = await client.query(format("INSERT INTO hours VALUES (DEFAULT, date, hours, user_sub) \n", realBody.date, realBody.hours, userSub));
  client.release();
  return JSON.stringify(err);
}