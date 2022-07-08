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
  const { rows } = await client.query(format("SELECT hours, date FROM hours JOIN users u on u.uuid = hours.user_uuid WHERE u.auth0sub LIKE %L AND EXTRACT(MONTH from date) = CAST(%L AS NUMERIC) AND EXTRACT(YEAR FROM date) = CAST(%L AS NUMERIC)", userSub, realBody.reqMonth, realBody.reqYear));
  client.release();
  return JSON.stringify(rows);
}