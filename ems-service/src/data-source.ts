const { DataSource } = require("typeorm");
const { ConfigService } = require("@nestjs/config");
require("dotenv").config();

const configService = new ConfigService();

module.exports = new DataSource({
  type: "postgres",
  host: configService.get("DB_HOST"),
  port: configService.get("DB_PORT"),
  username: configService.get("DB_USERNAME"),
  password: configService.get("DB_PASSWORD"),
  database: configService.get("DB_NAME"),
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migrations/*.js"],
});
