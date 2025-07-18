
const mongoose = require('mongoose');
const initData = require("./data.js"); // adjust the path if needed
const Listing = require("../models/listing.js"); // adjust the path if needed

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data =  initData.data.map((obj) =>({
    ...obj,
     owner: "68722c51cf21fd8bdee2f7ac",
    }));
  await Listing.insertMany(initData.data); 
  console.log("Data was initialized");
};

initDB();




























