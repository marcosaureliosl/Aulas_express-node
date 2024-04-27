
const UserRepository = require("../repositories/UserRepository");

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async findAll(req, res) {
        try {
            // query params de nome e email
            const { nome, email } = req.query;

            // filtragem de ususarios por nome e email
            const users = await this.userService.findAll({ nome, email });

            return res.send(users);
        } catch (error) {
            return res.status(500).send({ error: "Erro ao buscar usuários" });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const user = await this.userService.findById(id);

            if (!user) {
                return res.status(404).send({ error: "Usuário não encontrado" });
            }

            return res.send(user);
        } catch (error) {
            return res.status(500).send({ error: "Erro ao buscar usuário" });
        }
    }

    async create(req, res) {
        try {
            const newUser = await this.userService.create(req.body);
            return res.status(201).send(newUser);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}

module.exports = UserController;
