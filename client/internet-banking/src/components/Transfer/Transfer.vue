<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <panel title="Transfer">
        <v-form ref="form" lazy-validation name="register-user-form" autocomplete="off">
          <v-text-field
            v-if="hasSenderAccountId"
            label="Sender Account"
            v-model="senderAccount"
            readonly
          ></v-text-field>
          <v-select
            v-if="!hasSenderAccountId && accounts.length > 0"
            :items="accounts"
            label="Sender Account"
            v-model="senderAccount"
            item-value="id"
            item-text="id"
            :rules="requiredRules"
            required
          ></v-select>
          <v-switch v-if="receivers.length > 0" label="Use receiver list" v-model="useReceiverList"></v-switch>
          <v-text-field
            v-if="!useReceiverList"
            label="Receiver Account ID"
            v-model="receiverAccount"
            :rules="requiredRules"
            required
          ></v-text-field>
          <!-- <v-overflow-btn
            v-if="useReceiverList && receivers.length > 0"
            :items="receivers"
            label="Receiver Account"
            editable
            v-model="receiverAccount"
            item-text="name"
            item-value="AccountId"
            :rules="requiredRules"
            required
          ></v-overflow-btn>-->
          <v-select
            v-if="useReceiverList && receivers.length > 0"
            :items="receivers"
            label="Receiver Account"
            v-model="receiverAccount"
            item-text="name"
            item-value="AccountId"
            :rules="requiredRules"
            required
          ></v-select>
          <v-text-field label="Amount" v-model="amount" type="number" :rules="amountRules" required></v-text-field>
          <v-textarea no-resize label="Message" v-model="message"></v-textarea>
        </v-form>
        <v-btn :loading="loading" dark class="cyan" @click="createTransaction">Submit</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

import AccountsService from "@/services/AccountsService";
import ReceiversService from "@/services/ReceiversService";
import TransactionsService from "@/services/TransactionsService";

export default {
  name: "Transfer",
  data() {
    return {
      hasSenderAccountId: false,
      senderAccount: null,
      receiverAccount: null,
      receivers: [],
      amount: null,
      message: "",
      loading: false,
      useReceiverList: false,
      amountRules: [
        v => !!v || "Amount is required",
        v => (v && +v > 0) || "Must be greater than 0"
      ],
      requiredRules: [v => !!v || "This field is required"],
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: -1,
        sortBy: null,
        totalItems: 0
      },
      accounts: []
    };
  },
  computed: {
    ...mapState(["route"])
  },
  async mounted() {
    const senderAccountId = this.route.params.senderAccountId;
    if (senderAccountId) {
      try {
        this.loading = true;
        await AccountsService.getAccount(senderAccountId);
      } catch (err) {
        this.$router.push({
          name: "404"
        });
      } finally {
        this.loading = false;
      }
      this.senderAccount = senderAccountId;
      this.hasSenderAccountId = true;
    } else {
      this.fetchAccount();
    }
    this.fetchReceiver();
  },
  methods: {
    async createTransaction() {
      if (this.$refs.form.validate() && !this.loading) {
        try {
          this.loading = true;
          const data = (await TransactionsService.createTransaction({
            senderAccountId: this.senderAccount,
            receiverAccountId: this.receiverAccount,
            amount: this.amount,
            message: this.message
          })).data;

          this.$router.push({
            name: "confirm-transaction",
            params: {
              transactionId: data.transaction.id
            }
          });
        } catch (err) {
          this.$snotify.error(err.response.data.error);
        } finally {
          this.loading = false;
        }
      }
    },
    async fetchReceiver() {
      try {
        this.loading = true;
        const data = (await ReceiversService.getReceivers(this.pagination))
          .data;
        this.receivers = data.receivers;
      } catch (err) {
        this.$snotify.error(err.response.data.error);
      } finally {
        this.loading = false;
      }
    },
    async fetchAccount() {
      try {
        this.loading = true;
        const data = (await AccountsService.getAccounts(this.pagination)).data;
        this.accounts = data.accounts;
      } catch (err) {
        this.$snotify.error(err.response.data.error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
</style>
