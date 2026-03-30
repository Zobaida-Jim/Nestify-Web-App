const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const {deleteMany} = require("../models/listing.js");

main()
.then(() => {
    console.log("Connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/nestify');
}

const initDB = async () => { //to initialize DB
    await Listing.deleteMany({}); //if there exist some data in db delete them
    initData.data = initData.data.map((obj) => ({ //To add new property owner
        ...obj, owner: "69c5580b711da62cc6a40882",
    }))
    await Listing.insertMany(initData.data); //initData try to access the data key which is defined in data.js
    console.log("Data was initialized");
}

initDB();