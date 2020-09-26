exports.getAllProducts = (req, res, next) => {
  res.send("All products is here");
};
exports.getAProducts = (req, res, next) => {
  res.send(req.params.id + " product is here");
};
exports.createAProducts = (req, res, next) => {
  res.send("new Product added");
};
exports.updateAProducts = (req, res, next) => {
  res.send(req.params.id + " product updated");
};
