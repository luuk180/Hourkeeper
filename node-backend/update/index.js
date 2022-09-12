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
  client.query(format("INSERT INTO hours(date, hours, user_uuid) VALUES (%L, %L, (SELECT uuid FROM users WHERE auth0sub LIKE %L));", realBody.date, realBody.hours, userSub), (err, res) => {
    if (err) {
      throw err;
    }else{
      return JSON.stringify(res);
    }
  });
  client.release();
}