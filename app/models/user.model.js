module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
  },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    age: Sequelize.INTEGER,
    gender: Sequelize.STRING,
    department: Sequelize.STRING,
    city: Sequelize.STRING,
  },{
      timestamps: false
    }
  );
  return User;
};