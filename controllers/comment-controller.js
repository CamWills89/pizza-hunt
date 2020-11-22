const { Comment, Pizza } = require("../models");

const commentController = {
  // add comment to pizza
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        console.log(_id);
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          //$push method is used to add the comment's _id to the specific pizza we want to update
          //$push works the same as in JS, it adds data to an array, the $ denote it as a
          //method from Mongodb
          { $push: { comments: _id } },
          { new: true }
          //When you add data into a nested array of a MongoDB document,
          //they become what's known as a "nested document" or "subdocument".
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },

  // remove comment
  removeComment({ params }, res) {
    //this finds the comment, deletes it and returns the updated document/data
    Comment.findOneAndDelete({ _id: params.commentId })
      .then((deletedComment) => {
        if (!deletedComment) {
          return res.status(404).json({ message: "No comment with this id!" });
        }
        return Pizza.findOneAndUpdate(
          //we take the new data and identify and remove it from tje associated pizza
          //using the $pull operation. then we we return the updated pizza data,
          //without the comment.
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;
