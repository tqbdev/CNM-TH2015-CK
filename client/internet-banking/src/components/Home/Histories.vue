<template>
  <panel title="Transaction History">
    <v-data-table
      :headers="headers"
      :items="transactions"
      :pagination.sync="pagination"
      class="elevation-1"
      :disable-initial-sort="true"
      :total-items="totalItems"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.senderAccountId}}</td>
        <td class="text-xs-left">{{ props.item.receiverAccountId}}</td>
        <td v-if="props.item.senderAccount" class="text-xs-left">- {{ props.item.amount}}</td>
        <td v-if="props.item.receiverAccount" class="text-xs-left">+ {{ props.item.amount}}</td>
        <td class="text-xs-left">{{ props.item.message}}</td>
        <td class="text-xs-left">{{ props.item.createdAt | convertDateTime}}</td>
        <td class="text-xs-left">{{ props.item.updatedAt | convertDateTime}}</td>
        <td class="text-xs-left">{{ props.item.isDone}}</td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="totalPages"></v-pagination>
    </div>
  </panel>
</template>

<script>
import TransactionsService from "@/services/TransactionsService";
export default {
  name: "Histories",
  data() {
    return {
      headers: [
        {
          text: "Sender",
          value: "senderAccountId"
        },
        {
          text: "Receiver",
          value: "receiverAccountId"
        },
        {
          text: "Amount",
          value: "amount"
        },
        {
          text: "Message",
          value: "message"
        },
        {
          text: "Created At",
          value: "createdAt"
        },
        {
          text: "Updated At",
          value: "updatedAt"
        },
        {
          text: "Done",
          value: "isDone"
        }
      ],
      transactions: [],
      loading: false,
      pagination: {},
      totalPages: 0,
      totalItems: 0
    };
  },
  watch: {
    pagination: {
      async handler() {
        try {
          this.loading = true;
          const data = (await TransactionsService.getTransactions(
            this.pagination
          )).data;
          this.transactions = data.transactions;
          this.totalPages = data.totalPages;
          this.totalItems = data.totalTransactions;
        } catch (err) {
          this.$snotify.error(err.response.data.error);
        } finally {
          this.loading = false;
        }
      },
      deep: true
    }
  }
};
</script>

<style>
</style>
