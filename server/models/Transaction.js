module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    amount: DataTypes.INTEGER,
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    codeVerify: DataTypes.STRING
  })

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Account, {
      foreignKey: {
        name: 'senderAccountId',
        allowNull: false
      }
    })
    Transaction.belongsTo(models.Account, {
      foreignKey: {
        name: 'receiverAccountId',
        allowNull: false
      }
    })
  }

  return Transaction
}
