const { User } = require('../../models');

const userData = [
    {
        first_name: 'Christian',
        last_name: 'Tielking',
        email: 'tielking5@gmail.com',
        password: 'qwerty',
        genre1: 'Rock',
        genre2: 'Country',
        genre3: 'Jazz'
    }
]

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true, returning: true });

module.exports = seedUsers;