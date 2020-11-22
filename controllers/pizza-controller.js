const { Pizza } = require("../models");

const pizzaController = {
  // GET /api/pizzas
  // get all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      //populate a filed (similar to joining tables) with a key/value pair
      //of path and the field we want populated.
      .populate({
        path: "comments",
        //used the select option inside of populate(), so that we can tell
        //Mongoose that we don't care about the __v field on comments
        //the minus (-) sign in front of the field indicates we dont want it returned.
        select: "-__v",
      })
      //we dont want the __v include in the pizza data either
      .select("-__v")
      //newest pizza returns first using sort (-1, says in DESC order by id value)
      .sort({ _id: -1 })
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // GET /api/pizzas/id
  // get one pizza by id
  //req was destructured to only pull params out of it
  // get one pizza by id
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        path: "comments",
        select: "-__v",
      })
      .select("-__v")
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // POST /api/pizzas
  // createPizza
  //req is destructured, because we only need the body from
  //it as we dont need to interface with any of the other data from req
  createPizza({ body }, res) {
    //In MongoDB, the methods for adding data to a collection are .insertOne() or .insertMany().
    // But in Mongoose, we use the .create() method,
    //which will actually handle either one or multiple inserts!
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.status(400).json(err));
  },

  // PUT /api/pizzas/:id
  // update pizza by id
  updatePizza({ params, body }, res) {
    //mongoose finds a document, updates it and returns it.
    //if we dont set { new: true }, it will return the original document,
    //so by setting it to true, we instruct mongoose to return the new version of the document
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE /api/pizzas/:id
  // delete pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData); //could send res.json(true) instead
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = pizzaController;
