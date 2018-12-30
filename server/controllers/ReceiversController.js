const _ = require('lodash');

const { Receiver, User, Account } = require('../models');

module.exports = {
  async getReceivers(req, res) {
    try {
      let pagination = null;
      if (req.query.pagination) {
        pagination = JSON.parse(req.query.pagination);
      } else {
        pagination = {
          descending: false,
          sortBy: null,
          rowsPerPage: 5,
          page: 1
        };
      }
      const { descending, sortBy, rowsPerPage, page } = pagination;

      const user = req.user;

      let params = {
        where: {
          UserEmail: user.email
        }
      };

      const totalReceivers = await Receiver.count(params);
      let totalPages = 1;

      if (+rowsPerPage > 0) {
        params.limit = +rowsPerPage;
        params.offset = (+page - 1) * +rowsPerPage;
        totalPages = Math.ceil(totalReceivers / +rowsPerPage);
      }

      if (sortBy) {
        params.order = [[sortBy, descending ? 'DESC' : 'ASC']];
      }

      const receivers = await Receiver.findAll(params);

      if (!receivers) {
        return res.status(404).send({
          error: 'Not found receivers belong to user has email ' + user.email
        });
      }

      res.send({
        receivers,
        totalReceivers,
        totalPages
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error in get receivers by user.'
      });
    }
  },

  async createReceiver(req, res) {
    try {
      let { name, accountId } = req.body;
      const user = req.user;

      const currentReceiver = await Receiver.findOne({
        where: {
          UserEmail: user.email,
          AccountId: accountId
        }
      });

      if (currentReceiver) {
        return res.status(406).send({
          error: `Can't create new receiver. Because existing!!!`
        });
      }

      let account = null;
      if (name) {
        account = await Account.findByPk(accountId);
      } else {
        account = await Account.findOne({
          where: {
            id: accountId
          },
          include: [
            {
              model: User
            }
          ]
        });
        name = account.User.name;
      }

      if (!account) {
        return res.status(406).send({
          error: 'Not found account has id ' + accountId
        });
      }

      const newReceiver = await Receiver.create({
        UserEmail: user.email,
        AccountId: accountId,
        name: name
      });

      res.send({
        receiver: newReceiver.toJSON()
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error in create a receiver by user.'
      });
    }
  },

  async updateReceiverById(req, res) {
    try {
      const user = req.user;
      const { receiverId } = req.params;
      const { attributes } = req.body;

      const receiver = await Receiver.findOne({
        where: {
          id: receiverId,
          UserEmail: user.email
        }
      });

      if (!receiver) {
        return res.status(404).send({
          error:
            'Not found receiver has id ' + receiverId + ' and belong to user'
        });
      }

      if (attributes.name === undefined) {
        return res.status(406).send({
          error: 'Not accepted. Required an attribute "name"'
        });
      }

      const name = attributes.name;
      delete attributes.name;
      if (!_.isEmpty(attributes)) {
        return res.status(406).send({
          error: 'Not accepted. We accepted only an attribute "name"'
        });
      }

      await receiver.update({
        name: name
      });

      res.send({
        receiver
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error in update a receiver by user.'
      });
    }
  },

  async deleteReceiverById(req, res) {
    try {
      const user = req.user;
      const { receiverId } = req.params;

      const receiver = await Receiver.findOne({
        where: {
          id: receiverId,
          UserEmail: user.email
        }
      });

      if (!receiver) {
        return res.status(404).send({
          error:
            'Not found receiver has id ' + receiverId + ' and belong to user'
        });
      }
      await receiver.destroy();

      res.send({});
    } catch (err) {
      res.status(500).send({
        error: 'Error in delete a receiver by user.'
      });
    }
  }
};
