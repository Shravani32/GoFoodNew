const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://shravanijoshi262005:8tGM7FOLaJAA5PNp@food-db.4pm7x.mongodb.net/gofood?retryWrites=true&w=majority&appName=food-db";

const dbConnect = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

    // const fetched_data=await mongoose.connection.db.collection("food_data");
    // fetched_data.find({}).toArray(function(err,data){
    //    if(err) console.log(err);

    //    else{
    //     global.food_data=data;
    //     console.log(global.food_data)
    //    }
    // })

    try {
      const fetched_data = await mongoose.connection.db.collection("food_data");
      const data = await fetched_data.find({}).toArray();
      // global.food_data = data;
      // console.log(global.food_data);

      const foodCategory=await mongoose.connection.db.collection("food_category");
      const categoryData=await foodCategory.find({}).toArray();
      global.food_data=data;
      global.food_category=categoryData;

    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = dbConnect;
