<template>
  <panel title="Your receivers">
    <v-data-table
      :headers="headers"
      :items="receivers"
      :pagination.sync="pagination"
      class="elevation-1"
      :disable-initial-sort="true"
      :loading="loading"
      :total-items="total"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.AccountId}}</td>
        <td class="text-xs-left">{{ props.item.name}}</td>
        <td class="text-xs-left">{{ props.item.createdAt | convertDateTime}}</td>
        <td class="text-xs-left">{{ props.item.updatedAt | convertDateTime}}</td>
        <td class="justify-center">
          <v-icon medium class="mr-2" @click="editReceiver(props.item)">edit</v-icon>
          <v-icon medium @click="deleteReceiver(props.item)">delete</v-icon>
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
  name: "ListReceiver",
  props: {
    receivers: Array,
    pages: Number,
    loading: Boolean,
    total: Number
  },
  data() {
    return {
      pagination: {},
      headers: [
        {
          text: "Account Receiver ID",
          value: "AccountId"
        },
        {
          text: "Receiver's Name",
          value: "name"
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
          text: "Action",
          value: "action",
          sortable: false
        }
      ]
    };
  },
  methods: {
    editReceiver(receiver) {
      this.$emit("edit", receiver);
    },
    deleteReceiver(receiver) {
      this.$emit("delete", receiver);
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
