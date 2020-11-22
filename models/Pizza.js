const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String, //type String is the JS datatypes.
    },
    createdBy: {
      type: String,
    },
    // a getter is typically a special type of function that takes the stored data you are 
    //looking to retrieve and modifies or formats it upon return. 
    //Think of it like middleware for your data!
    createdAt: {
      type: Date,
      default: Date.now,
      // use a getter to format the date with our dateFormat function everytime 
      // the data is queried
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
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
      getters: true
    },
    id: false,
  }
);
/*
Virtuals allow you to add virtual properties to a document that aren't stored in the database.
Virtuals allow us to add more information to a database response so that we don't have 
to add in the information manually with a helper before responding to the API request.
*/

// get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;
