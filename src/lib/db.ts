import { Sequelize } from "sequelize";
import pg from "pg"; 

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables.");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg, 
  logging: process.env.NODE_ENV === "development" ? console.log : false, 
  pool: {
    max: 10, 
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
