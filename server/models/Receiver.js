module.exports = (sequelize, DataTypes) => {
  const Receiver = sequelize.define('Receiver', {
    name: DataTypes.STRING
  });

  Receiver.associate = function(models) {
    Receiver.belongsTo(models.User, {
      foreignKey: {
        name: 'UserEmail',
        allowNull: false,
        primaryKey: true
      }
    });
    Receiver.belongsTo(models.Account, {
      foreignKey: {
        name: 'AccountId',
        allowNull: false,
        primaryKey: true
      }
    });
  };

  return Receiver;
};
