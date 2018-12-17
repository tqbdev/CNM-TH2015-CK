<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <router-link class="home" tag="span" :to="{
          name: 'home'
        }">iB@nking</router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn flat :to="{
          name: 'home'
        }">Home</v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn v-if="!isUserLoggedIn" flat :to="{
          name: 'login'
        }">Login</v-btn>

      <v-btn v-if="isUserLoggedIn" flat @click="logout()">Log Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: black;
}
</style>
