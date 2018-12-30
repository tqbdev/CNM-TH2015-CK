const randtoken = require('rand-token');

function createCodeVerify(transaction, options) {
  const code = randtoken.generate(6);
  transaction.setDataValue('codeVerify', code);
}

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      amount: DataTypes.INTEGER,
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      message: DataTypes.TEXT,
      codeVerify: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: createCodeVerify
      }
    }
  );

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Account, {
      foreignKey: {
        name: 'senderAccountId'
      }
    });
    Transaction.belongsTo(models.Account, {
      foreignKey: {
        name: 'receiverAccountId',
        allowNull: false
      }
    });
  };

  Transaction.prototype.compareCode = function(codeVerify) {
    return codeVerify === this.codeVerify;
  };

  return Transaction;
};
