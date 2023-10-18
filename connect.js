require("dotenv").config();
var mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE)
  .then((value) =>
    console.log(
      "mongodb connected" +
        "\n" +
        value.connection._connectionString +
        "\nport: " +
        value.connection.port
    )
  )
  .catch((err) => {
    throw err;
  });

module.exports = mongoose;
