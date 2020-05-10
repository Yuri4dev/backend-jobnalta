const connection = require("../database/connection");

module.exports = {
  // Listagem de Jobs
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection("jobs").count();

    const jobs = await connection("jobs")
      .join("users", "users.id", "=", "jobs.user_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "jobs.*",
        "users.name",
        "users.email",
        "users.whatsapp",
        "users.city",
        "users.uf",
      ]);

    response.header("X-Total-Count", count["count(*)"]);
    return response.json(jobs);
  },

  // Criação de Job
  async create(request, response) {
    const { title, description, value } = request.body;
    const user_id = request.headers.authorization;

    const [id] = await connection("jobs").insert({
      title,
      description,
      value,
      user_id,
    });

    return response.json({ id });
  },

  // Deletar Job
  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.headers.authorization;

    const job = await connection("jobs")
      .where("id", id)
      .select("user_id")
      .first();

    if (job.user_id !== user_id) {
      return response.status(401).json({ error: "Operation not permitted." });
    }

    await connection("jobs").where("id", id).delete();

    return response.status(204).send();
  },
};
