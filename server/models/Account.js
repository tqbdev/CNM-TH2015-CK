module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    // id: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV1,
    //   primaryKey: true
    // },
    balance: DataTypes.INTEGER
  })

  Account.associate = function (models) {
    Account.belongsTo(models.User)
  }

  return Account
}