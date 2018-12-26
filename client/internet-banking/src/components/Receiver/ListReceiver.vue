<template>
  <panel title="Your receivers">
    <v-data-table
      :headers="headers"
      :items="receivers"
      :pagination.sync="pagination"
      class="elevation-1"
      :disable-initial-sort="true"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.AccountId}}</td>
        <td class="text-xs-left">{{ props.item.name}}</td>
        <td class="text-xs-left">{{ props.item.createdAt | convertDateTime}}</td>
        <td class="text-xs-left">{{ props.item.updatedAt | convertDateTime}}</td>
        <td class="justify-center">
          <v-icon medium class="mr-2" @click="editReceiver">edit</v-icon>
          <v-icon medium class="mt-2" @click="deleteReceiver">delete</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
    <div class="text-xs-left pt-2">
      <strong>Auto refresh every 5s</strong>
    </div>
  </panel>
</template>

<script>
import ReceiversService from "@/services/ReceiversService";
export default {
  name: "ListReceiver",
  data() {
    return {
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
      ],
      receivers: [],
      loading: false,
      pagination: {}
    };
  },
  watch: {
    pagination: {
      handler() {
        this.fetchReceiver();
      },
      deep: true
    }
  },
  mounted() {
    setInterval(this.fetchReceiver, 5000);
  },
  methods: {
    async fetchReceiver() {
      try {
        this.loading = true;
        this.receivers = (await ReceiversService.getReceivers(
          this.pagination
        )).data;
      } catch (err) {
        this.$snotify.error(err.response.data.error);
      } finally {
        this.loading = false;
      }
    },
    editReceiver() {},
    deleteReceiver() {}
  }
};
</script>

<style>
</style>
