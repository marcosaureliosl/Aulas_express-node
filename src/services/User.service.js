
const User = require("../models/User");

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async findAll(filters) {
        return await this.userRepository.findAll(filters);
    }

    async findById(id) {
        return await this.userRepository.findById(id);
    }

    async create(user) {
        // Validação do usuário
        if (!user.name || !user.email || !user.birthDate) {
            throw new Error("Nome, email e data de nascimento são obrigatórios");
        }

        // Criação do novo usuário
        const newUser = new User(user.name, user.email, user.birthDate, true);
        return await this.userRepository.create(newUser);
    }
}

module.exports = UserService;
