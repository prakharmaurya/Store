const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    log.error(`Failed to connect to database ${err}`);
  });

// const app = require("./app");
// app.listen(process.env.PORT, () => {
//   console.log(`StoreBackend  started listening at http://localhost:${PORT}`);
// });
