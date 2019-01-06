<template>
  <panel title="Your accounts">
    <v-data-table
      :headers="headers"
      :items="accounts"
      :pagination.sync="pagination"
      class="elevation-1"
      :disable-initial-sort="true"
      :total-items="total"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id}}</td>
        <td class="text-xs-left">{{ props.item.balance}} VND</td>
        <td class="text-xs-left">{{ props.item.isOpen | accountStatus}}</td>
        <td class="text-xs-left">{{ props.item.createdAt | convertDateTime}}</td>
        <td class="justify-center">
          <v-icon
            v-if="props.item.isOpen"
            medium
            class="mr-2"
            @click="tranfer(props.item)"
          >attach_money</v-icon>
          <v-icon
            v-if="props.item.isOpen"
            medium
            dark
            class="red"
            @click="closeAccount(props.item)"
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
</template>

<script>
export default {
  name: "ListAccount",
  props: {
    accounts: Array,
    pages: Number,
    loading: Boolean,
    total: Number
  },
  data() {
    return {
      pagination: {},
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
      ]
    };
  },
  methods: {
    closeAccount(account) {
      this.$emit("close", account);
    },
    tranfer(account) {
      this.$emit("transfer", account);
    }
  },
  watch: {
    pagination: {
      handler() {
        this.$emit("paginationChanged", this.pagination);
      },
      deep: true
    }
  }
};
</script>

<style>
</style>
