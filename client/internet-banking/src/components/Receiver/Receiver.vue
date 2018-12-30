<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <add-receiver :loading="loading" v-on:add="onAddReceiver"></add-receiver>
    </v-flex>
    <v-flex xs6 offset-xs3 mt-4>
      <list-receiver
        :loading="loading"
        :receivers="receivers"
        :pages="totalPages"
        :total="totalItems"
        v-on:paginationChanged="onPaginationChanged"
        v-on:delete="onDeleteReceiver"
        v-on:edit="onEditReceiver"
      ></list-receiver>
    </v-flex>
    <delete-receiver-dlg
      :isOpen="isDeleteDlgOpen"
      :receiver="selectedReceiver"
      v-on:accept="onAcceptDelete"
      v-on:reject="isDeleteDlgOpen = false"
    ></delete-receiver-dlg>
    <edit-receiver-dlg
      :isOpen="isEditDlgOpen"
      :receiver="selectedReceiver"
      v-on:accept="onAcceptEdit"
      v-on:reject="isEditDlgOpen = false"
    ></edit-receiver-dlg>
  </v-layout>
</template>

<script>
import AddReceiver from "./AddReceiver";
import ListReceiver from "./ListReceiver";
import DeleteReceiverDlg from "./DeleteReceiverDlg";
import EditReceiverDlg from "./EditReceiverDlg";

import ReceiversService from "@/services/ReceiversService";
export default {
  name: "Receiver",
  components: {
    AddReceiver,
    ListReceiver,
    DeleteReceiverDlg,
    EditReceiverDlg
  },
  data() {
    return {
      loading: false,
      receivers: [],
      pagination: {},
      isDeleteDlgOpen: false,
      isEditDlgOpen: false,
      selectedReceiver: {},
      totalPages: 0,
      totalItems: 0
    };
  },
  methods: {
    async onAddReceiver(receiver) {
      if (!this.loading) {
        try {
          this.loading = true;
          await ReceiversService.createReceiver(receiver);
          this.fetchReceiver();

          this.$snotify.success("Create receiver successfully");
        } catch (error) {
          this.$snotify.error(error.response.data.error);
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
        this.totalItems = data.totalReceivers;
        this.totalPages = data.totalPages;
      } catch (err) {
        this.$snotify.error(err.response.data.error);
      } finally {
        this.loading = false;
      }
    },
    async onAcceptDelete(receiver) {
      try {
        await ReceiversService.deleteReceiver(receiver.id);
        this.fetchReceiver();
      } catch (err) {
        this.$snotify.error(err.response.data.error);
      } finally {
        this.isDeleteDlgOpen = false;
      }
    },
    async onAcceptEdit(obj) {
      try {
        await ReceiversService.updateReceiver(obj.id, {
          attributes: {
            name: obj.name
          }
        });
        this.fetchReceiver();
      } catch (err) {
        this.$snotify.error(err.response.data.error);
      } finally {
        this.isEditDlgOpen = false;
      }
    },
    onPaginationChanged(pagination) {
      this.pagination = pagination;
      this.fetchReceiver();
    },
    onDeleteReceiver(receiver) {
      this.selectedReceiver = receiver;
      this.isDeleteDlgOpen = true;
    },
    onEditReceiver(receiver) {
      this.selectedReceiver = receiver;
      this.isEditDlgOpen = true;
    }
  }
};
</script>

<style>
</style>
