const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  // Listar Usuários

  async index(request, response) {
    const users = await connection("users").select("*");

    return response.json(users);
  },

  //------------------------------------

  // Criar Usuário

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(5).toString("HEX");

    await connection("users").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  },

  //-------------------------------------
};
