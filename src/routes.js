const express = require("express");
const UserController = require("./controllers/UserController");
const JobController = require("./controllers/JobController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

//Rota de Login
routes.post("/sessions", SessionController.create);

//Rota de Perfil
routes.get("/profile", ProfileController.index);

// Rotas de Usuários
routes.get("/users", UserController.index);
routes.post("/users", UserController.create);

// Rotas de Jobs
routes.get("/jobs", JobController.index);
routes.post("/jobs", JobController.create);
routes.delete("/jobs/:id", JobController.delete);

module.exports = routes;
