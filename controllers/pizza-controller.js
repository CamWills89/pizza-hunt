const { Pizza } = require("../models");

const pizzaController = {
  // GET /api/pizzas
  // get all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // GET /api/pizzas/id
  // get one pizza by id
  //req was destructured to only pull params out of it
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .then((dbPizzaData) => {
        // If no pizza is found, send 404
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
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = pizzaController;
