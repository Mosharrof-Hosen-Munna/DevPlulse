import app from "./app";
import config from "./config";
import { initDB } from "./db";

const main = async () => {

  initDB();
  app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});}

main()