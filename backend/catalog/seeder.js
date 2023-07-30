require("dotenv").config();
const mongoose = require("mongoose");
const models = require("../models");
const fs = require("node:fs");
const path = require("path");

function read_catalog() {
  try {
    const catalog = fs
      .readFileSync(path.join(__dirname, "seeder.json"))
      .toString();
    return JSON.parse(catalog);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function seed_languages(languages) {
  try {
    await models.LanguageModel.deleteMany({});
    const languages_m = await models.LanguageModel.insertMany(
      languages.map((i) => ({ name: i }))
    );
    console.log("Seeded Languages");
    return languages_m;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function seed_types(types) {
  try {
    await models.TypesModel.deleteMany({});
    const types_m = await models.TypesModel.insertMany(
      types.map((i) => ({ type_name: i }))
    );
    console.log("Seeded Types");
    return types_m;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function seed_books(languageMap, typeMap, books) {
  try {
    await models.BooksModel.deleteMany({});
    const books_m = await models.BooksModel.insertMany(
      books.map((i) => ({
        name: i.name,
        type: typeMap[i.type],
        languages: i.language.map((j) => languageMap[j]),
      }))
    );
    console.log("Seeded books");
    return books_m;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function seed_movs_chaps(languageMap, booksMap, typeMap, mvmtsChaps) {
  try {
    await models.MvmtsChaptersModel.deleteMany({});
    const movChaps_m = await models.MvmtsChaptersModel.insertMany(
      mvmtsChaps.map((i) => ({
        name: i.name,
        book: booksMap[i.bookName],
        type: typeMap[i.type],
        languages: i.languages.map((j) => languageMap[j]),
      }))
    );
    console.log("seeded movements and chapters");
    return movChaps_m;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function seed() {
  try {
    const catalog = read_catalog();
    const languages = await seed_languages(catalog["languages"]);
    const languageMap = {};
    languages.forEach((ln) => {
      languageMap[ln["name"]] = ln["_id"].toString();
    });
    console.log(languageMap);
    const types = await seed_types(catalog["types"]);
    const typeMap = {};
    types.forEach((ln) => {
      typeMap[ln["type_name"]] = ln["_id"].toString();
    });
    console.log(typeMap);
    const books = await seed_books(languageMap, typeMap, catalog["books"]);
    console.log(books);
    const booksMap = {};
    books.forEach((ln) => {
      booksMap[ln["name"]] = ln["_id"].toString();
    });
    console.log(booksMap);
    const movementChaps = await seed_movs_chaps(
      languageMap,
      booksMap,
      typeMap,
      catalog["movementChap"]
    );
    console.log(movementChaps);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
const main = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    await seed();
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(1);
  }
};
main();
