const Book = require('../schemas/books');
const Cycle = require('../schemas/cycles');
const Furniture = require('../schemas/furniture');
const Handicraft = require('../schemas/handicrafts');
const Others = require('../schemas/othersCat');
const User = require('../schemas/user');

module.exports.displayCategories = async (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    console.log("categories...", id)
    res.redirect(`/categories/${id}`);
}

module.exports.getUserBooks = async (req, res) => {
    console.log("in user books ..");
    const user = await User.findById(currentUser);
    const books = await Book.find({ userId: user._id });
    console.log(books);
    res.send(books);
}

module.exports.getUserCycles = async (req, res) => {
    console.log("in user cycles ..");
    const user = await User.findById(currentUser);
    const cycles = await Cycle.find({ userId: user._id });
    console.log(cycles);
    res.send(cycles);
}

module.exports.getUserFurniture = async (req, res) => {
    console.log("in user furniture ..");
    const user = await User.findById(currentUser);
    const furniture = await Furniture.find({ userId: user._id });
    console.log(furniture);
    res.send(furniture);
}

module.exports.getUserHandicrafts = async (req, res) => {
    console.log("in user handicrafts ..");
    const user = await User.findById(currentUser);
    const handicrafts = await Handicraft.find({ userId: user._id });
    console.log(handicrafts);
    res.send(handicrafts);
}

module.exports.getUserOthers = async (req, res) => {
    console.log("in user others category..");
    const user = await User.findById(currentUser);
    const items = await Others.find({ userId: user._id });
    console.log(items);
    res.send(items);
}