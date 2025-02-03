import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

const datasourceOption: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "testtist",
    database: "nest-ts-boilerplate-db",
    // host: process.env.DB_HOST,
    // port: parseInt(process.env.DB_PORT, 10),
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [
        __dirname + "/**/*.entity{.ts,.js}"
    ],
    migrations: [
        __dirname + '/migrations/**/*.js',
    ]
}
const DBManager = new DataSource(datasourceOption);

export default DBManager;