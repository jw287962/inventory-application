#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/Category");
const Items = require("./models/Items");


const categorys = [];
const items = [];


const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategory();
  await createItems();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(name, description) {
  const category = new Category({ name: name, description: description});
  await category.save();
  categorys.push(category);
  console.log(`Added genre: ${category}`);
}
async function itemCreate(name,description,category,stock,price){
  const item = new Items({
      name: name,
      description: description,
      category: category, 
      stock: stock, 
      price: price})
    await item.save();
    console.log(`Added genre: ${item}`);
}
// async function authorCreate(first_name, family_name, d_birth, d_death) {
//   authordetail = { first_name: first_name, family_name: family_name };
//   if (d_birth != false) authordetail.date_of_birth = d_birth;
//   if (d_death != false) authordetail.date_of_death = d_death;

//   const author = new Author(authordetail);

//   await author.save();
//   authors.push(author);
//   console.log(`Added author: ${first_name} ${family_name}`);
// }

// async function bookCreate(title, summary, isbn, author, genre) {
//   bookdetail = {
//     title: title,
//     summary: summary,
//     author: author,
//     isbn: isbn,
//   };
//   if (genre != false) bookdetail.genre = genre;

//   const book = new Book(bookdetail);
//   await book.save();
//   books.push(book);
//   console.log(`Added book: ${title}`);
// }

async function bookInstanceCreate(book, imprint, due_back, status) {
  bookinstancedetail = {
    book: book,
    imprint: imprint,
  };
  if (due_back != false) bookinstancedetail.due_back = due_back;
  if (status != false) bookinstancedetail.status = status;

  const bookinstance = new BookInstance(bookinstancedetail);
  await bookinstance.save();
  bookinstances.push(bookinstance);
  console.log(`Added bookinstance: ${imprint}`);
}

async function createCategory() {
  console.log("Adding category");
  await Promise.all([
    categoryCreate("Labtop","a portable, smaller version of a desktop computer"),
    categoryCreate("Mouse", "Used to interact with a computer UI"),
    categoryCreate("Phone", "Portable hand held computer devices"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate("IPhone X", "Apple Iphone, 11th Generation", categorys[2], 50, 1000.00),
    itemCreate("Lenovo G500", "Labtop made from Lenovo, sporting the newest tech from AMD Ryzen and Integrated Graphics",
     categorys[0], 25, 800.00),
     itemCreate("Razer Viper V2", "Wireless, Ultra-lightweight Gaming Mouse",
     categorys[1], 10, 150.00)
  ]);
}

