import path from "path";

module.exports = {
  client: "mysql",
  connection: {
    host: "db4free.net",
    user: "erikza",
    password: "abc123##",
    database: "pontodopetisco",
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "src", "database", "seeds"),
  },
  //useNullAsDefault: true,
};
