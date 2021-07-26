const seedUsers = require('./user-seed');

const sequelize = require('../connection');

const seedAll = async () => {
    await sequelize.sync({ force:true });
    console.log('Connected to Database!');
    await seedUsers();
    console.log('Users have been seeded!');
    process.exit(0);
}

seedAll();