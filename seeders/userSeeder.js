const { faker } = require('@faker-js/faker');
const User = require('../models/Users');

const seedUsers = async () => {
    for (let i = 0; i < 100; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const email = faker.internet.email();
        const password = faker.internet.password()
        const country = faker.location.country();
        const avatar = faker.image.avatar();
        await User.create({firstname, lastname, email, password, country, avatar });
    }
    console.log('50 utilisateurs ajoutés.');
};

module.exports = seedUsers;
