const express = require("express");
const pessoasRoute = require("./pessoasRoute.js");
const cursosRoute = require("./cursosRoute.js");
const categoriasRoute = require("./categoriasRoute.js");

module.exports = (app) => {
  app.use(express.json(), pessoasRoute, cursosRoute, categoriasRoute);
};
