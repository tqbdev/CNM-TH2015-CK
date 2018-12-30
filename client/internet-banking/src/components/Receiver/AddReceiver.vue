<template>
  <panel title="Add Receiver">
    <v-form ref="form" lazy-validation name="add-receiver-form" autocomplete="off">
      <v-text-field label="Account No." v-model="accountNumber" :rules="requiredRules" required></v-text-field>
      <v-text-field label="Custom Name" v-model="name"></v-text-field>
    </v-form>
    <v-btn :loading="loading" dark class="cyan" @click="addReceiver">Add</v-btn>
  </panel>
</template>

<script>
export default {
  name: "AddReceiver",
  data() {
    return {
      name: "",
      accountNumber: "",
      requiredRules: [v => !!v || "This field is required"]
    };
  },
  props: {
    loading: Boolean
  },
  methods: {
    addReceiver() {
      if (this.$refs.form.validate() && !this.loading) {
        this.$emit("add", {
          name: this.name,
          accountId: this.accountNumber
        });
      }
    }
  }
};
</script>

<style>
</style>
