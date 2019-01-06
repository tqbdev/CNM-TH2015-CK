<template>
  <div>
    <list-account
      :loading="loading"
      :accounts="accounts"
      :pages="totalPages"
      :total="totalItems"
      v-on:paginationChanged="onPaginationChanged"
      v-on:close="onCloseAccount"
      v-on:transfer="onTransfer"
    ></list-account>
    <close-account-dlg
      :isOpen="isCloseDlgOpen"
      :account="selectedAccount"
      v-on:accept="onAcceptClose"
      v-on:reject="isCloseDlgOpen = false"
    ></close-account-dlg>
  </div>
</template>

<script>
import ListAccount from "./ListAccount";
import CloseAccountDlg from "./CloseAccountDlg";

import AccountsService from "@/services/AccountsService";
export default {
  name: "Account",
  components: {
    ListAccount,
    CloseAccountDlg
  },
  data() {
    return {
      accounts: [],
      loading: false,
      pagination: {},
      isCloseDlgOpen: false,
      selectedAccount: {},
      totalPages: 0,
      totalItems: 0
    };
  },
  methods: {
    async fetchAccount() {
      try {
        this.loading = true;
        const data = (await AccountsService.getAccounts(this.pagination)).data;
        this.accounts = data.accounts;
        this.totalPages = data.totalPages;
        this.totalItems = data.totalAccounts;
      } catch (err) {
        this.$snotify.error(err.response.data.error);
      } finally {
        this.loading = false;
      }
    },
    async onAcceptClose(account) {
      try {
        await AccountsService.updateAccount(account.id, {
          attributes: {
            isOpen: false
          }
        });
        this.fetchAccount();
      } catch (err) {
        this.$snotify.error(err.response.data.error);
      } finally {
        this.isCloseDlgOpen = false;
      }
    },
    onPaginationChanged(pagination) {
      this.pagination = pagination;
      this.fetchAccount();
    },
    onCloseAccount(account) {
      this.selectedAccount = account;
      this.isCloseDlgOpen = true;
    },
    onTransfer(account) {
      this.$router.push({
        name: "transfer",
        params: {
          senderAccountId: account.id
        }
      });
    }
  }
};
</script>

<style>
</style>
