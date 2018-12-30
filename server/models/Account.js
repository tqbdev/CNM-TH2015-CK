module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    balance: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Account.associate = function(models) {
    Account.belongsTo(models.User);
  };

  return Account;
};
