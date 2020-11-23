const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: "You need to provide a pizza name!",
      //removes any white space before or after input string
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    // a getter is typically a special type of function that takes the stored data you are
    //looking to retrieve and modifies or formats it upon return.
    //Think of it like middleware for your data!
    createdAt: {
      type: Date,
      default: Date.now,
      // use a getter to format the date with our dateFormat function everytime
      // the data is queried
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    /*
    enum option stands for enumerable, a popular 
    term in web development that refers to a set of data that can be iterated over
    */
    size: {
      type: String,
      required: true,
      enum: ["Personal", "Small", "Medium", "Large", "Extra Large"],
      default: "Large",
    },
    toppings: [], //could also use Array as the data type
    comments: [
      //we need to tell Mongoose to expect an ObjectId
      //and to tell it that its data comes from the Comment model
      //this is simialar to associations
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  //tell the schema that it can use virtuals and getters
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// get total count of comments and replies on retrieval
/*
Virtuals allow you to add virtual properties to a document that aren't stored in the database.
Virtuals allow us to add more information to a database response so that we don't have 
to add in the information manually with a helper before responding to the API request.

the .reduce() method tallies up the total of every comment with its replies
reduce() takes two parameters, an accumulator and a currentValue.
Here, the accumulator is total, and the currentValue is comment.
Like .map(), the array prototype method .reduce() executes a function on each element in an array. 
However, unlike .map(), it uses the result of each function execution for 
each successive computation as it goes through the array. 
This makes it a perfect candidate for getting a sum of multiple values.can also get averages, etc
*/
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;
