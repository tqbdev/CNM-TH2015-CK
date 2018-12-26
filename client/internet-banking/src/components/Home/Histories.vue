<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <panel title="Transaction History">
        <v-data-table
          :headers="headers"
          :items="accounts"
          :pagination.sync="pagination"
          class="elevation-1"
          :disable-initial-sort="true"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.id}}</td>
            <td class="text-xs-left">{{ props.item.balance}} VND</td>
            <td class="text-xs-left">{{ props.item.isOpen | accountStatus}}</td>
            <td class="text-xs-left">{{ props.item.createdAt | convertDateTime}}</td>
            <td class="justify-center">
              <v-icon v-if="props.item.isOpen" medium class="mr-2" @click="tranfer">attach_money</v-icon>
              <v-icon
                v-if="props.item.isOpen"
                medium
                dark
                class="mt-2 red"
                @click="closeAccount"
              >close</v-icon>
            </td>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import TransactionsService from "@/services/TransactionsService";
export default {
  name: "Histories",
  data() {
    return {
      headers: [
        {
          text: "ID",
          value: "id"
        },
        {
          text: "Balance",
          value: "balance"
        },
        {
          text: "Status",
          value: "isOpen"
        },
        {
          text: "Created At",
          value: "createdAt"
        },
        {
          text: "Action",
          value: "action",
          sortable: false
        }
      ],
      accounts: [],
      loading: false,
      pagination: {}
    };
  },
  watch: {
    pagination: {
      async handler() {
        try {
          this.loading = true;
          this.accounts = (await TransactionsService.getTransactions(
            this.pagination
          )).data;
        } catch (err) {
          this.$snotify.error(err.response.data.error);
        } finally {
          this.loading = false;
        }
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    closeAccount() {},
    tranfer() {}
  }
};
</script>

<style>
</style>
