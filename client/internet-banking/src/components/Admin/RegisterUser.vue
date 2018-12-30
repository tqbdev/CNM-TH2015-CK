<template>
  <panel title="Register User">
    <v-form ref="form" lazy-validation name="register-user-form" autocomplete="off">
      <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
      <v-text-field label="Name" v-model="name" :rules="requiredRules" required></v-text-field>
      <v-text-field label="Phone" v-model="phone" :rules="phoneRules" required></v-text-field>
    </v-form>
    <v-btn :loading="loading" dark class="cyan" @click="registerUser">Submit</v-btn>
  </panel>
</template>

<script>
import AuthencationService from "@/services/AuthencationService";
export default {
  name: "RegisterUser",
  data() {
    return {
      email: "",
      phone: "",
      name: "",
      loading: false,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      phoneRules: [
        v => !!v || "Phone is required",
        v => (v && /^[0-9]*$/.test(v)) || "Phone must be only numberics",
        v => (v && v.length == 10) || "Phone must be 10 numberics"
      ],
      requiredRules: [v => !!v || "This field is required"]
    };
  },
  methods: {
    async registerUser() {
      if (this.$refs.form.validate() && !this.loading) {
        try {
          this.loading = true;
          await AuthencationService.register({
            email: this.email,
            phone: this.phone,
            name: this.name
          });

          this.$snotify.success("Register user successfully");
          this.$snotify.success("Check register's email, getting login password");
        } catch (error) {
          this.$snotify.error(error.response.data.error);
        } finally {
          this.loading = false;
        }
      }
    }
  }
};
</script>

<style>
</style>
