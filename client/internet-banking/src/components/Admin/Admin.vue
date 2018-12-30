<template>
  <v-layout row wrap justify-center>
    <v-flex md4 xs12>
      <register-user></register-user>
    </v-flex>
    <v-flex md4 xs12 offset-md1>
      <create-account></create-account>
    </v-flex>
    <v-flex md4 xs12 mt-4>
      <charge-account></charge-account>
    </v-flex>
  </v-layout>
</template>

<script>
import RegisterUser from "./RegisterUser";
import CreateAccount from "./CreateAccount";
import ChargeAccount from "./ChargeAccount";
export default {
  name: "Admin",
  components: {
    RegisterUser,
    CreateAccount,
    ChargeAccount
  }
};
</script>

<style>
</style>
