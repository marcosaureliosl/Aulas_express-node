const fs = require("fs");
const path = require("path");

class UserRepository {
    constructor() {
        const filePath = path.join(__dirname, "../data/users.json");
        this.users = require(filePath);
    }

    async findAll(filters) {
        let filteredUsers = this.users;

        // Filtragem por nome
        if (filters.nome) {
            filteredUsers = filteredUsers.filter(user => user.name.toLowerCase() === filters.nome.toLowerCase());
        }

        // Filtragem por e-mail
        if (filters.email) {
            filteredUsers = filteredUsers.filter(user => user.email.toLowerCase() === filters.email.toLowerCase());
        }

        return filteredUsers;
    }

    async findById(id) {
        return this.users.find(user => user.id === parseInt(id));
    }

    async create(user) {
        const nextId = this.users.length + 1;
        user.id = nextId;
        this.users.push(user);

        const filePath = path.join(__dirname, "../data/users.json");
        fs.writeFileSync(filePath, JSON.stringify(this.users, null, 2));
        return user;
    }
}

module.exports = UserRepository;
