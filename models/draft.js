module.exports = function(sequelize, DataTypes) {
  const Draft = sequelize.define("Drafts", {
    team: DataTypes.STRING,
    pick: DataTypes.STRING,
    month: DataTypes.STRING,
    total: DataTypes.INTEGER
  });
  return Draft;
};
