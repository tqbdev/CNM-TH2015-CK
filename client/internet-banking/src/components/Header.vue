<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <router-link class="home" tag="span" :to="{
          name: 'home'
        }">iB@nking</router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn :to="{
          name: 'home'
        }">Home</v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn v-if="!isUserLoggedIn" :to="{
          name: 'login'
        }">Login</v-btn>

      <v-menu offset-y v-if="isUserLoggedIn">
        <v-btn slot="activator" dark>
          {{user.name}}
          <v-icon dark right>mdi-menu-down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="logout()">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
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
