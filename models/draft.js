module.exports = function(sequelize, DataTypes) {
  const Draft = sequelize.define("Drafts", {
    team: DataTypes.STRING,
    pickName: DataTypes.STRING,
    pickID: DataTypes.STRING,
    month: DataTypes.STRING,
    total: DataTypes.INTEGER,
    cut: DataTypes.BOOLEAN
  });
  return Draft;
};
