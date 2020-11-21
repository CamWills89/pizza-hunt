const router = require("express").Router();
//instead of importing entire pizza-controller object, we destructure the methods out
//so we dont have to do pizzaController.getAllPizza()
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../../controllers/pizza-controller");

// Set up GET all and POST at 
// /api/pizzas/:id
//so we can just pass the method name without (req, res) because they already have them
router.route("/").get(getAllPizza).post(createPizza);

// Set up GET one, PUT, and DELETE at 
// /api/pizzas/:id
router.route("/:id").get(getPizzaById).put(updatePizza).delete(deletePizza);

module.exports = router;
