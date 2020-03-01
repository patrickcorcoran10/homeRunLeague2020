module.exports = function(sequelize, DataTypes) {
  const Draft = sequelize.define("Drafts", {
    team: DataTypes.STRING,
    pickName: DataTypes.STRING,
    pickID: DataTypes.STRING,
    month: DataTypes.STRING,
    total: DataTypes.INTEGER,
    cut: DataTypes.BOOLEAN,
    aprilPickTotal: DataTypes.STRING,
    mayPickTotal: DataTypes.STRING,
    junePickTotal: DataTypes.STRING,
    julyPickTotal: DataTypes.STRING,
    augustPickTotal: DataTypes.STRING,
    septemberPickTotal: DataTypes.STRING
  });
  return Draft;
};
