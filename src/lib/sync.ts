import sequelize from "./db";
import Sheet from "./models/Sheet";

const syncDatabase = async () => {
  try {
    console.log("Connecting to database");
    await sequelize.authenticate();
    console.log("Database connected successfully");

    console.log("Syncing models");
    await sequelize.sync({ alter: true }); 
    console.log("Models synced successfully");

  } catch (error) {
    console.error("Database sync failed:", error);
    process.exit(1); 
  }
};

export default syncDatabase;
