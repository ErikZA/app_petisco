import knex from "knex";

const connection = knex({
  client: "mysql",
  connection: {
    host: "db4free.net",
    user: "erikza",
    password: "abc123##",
    database: "pontodopetisco",
  },
});

export default connection;
