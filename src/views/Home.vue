<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <div class="logout-wrapper">
      <button @click="doLogout">Logout</button>
    </div> -->
  </div>
</template>



<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

// @Component({ name: "home", components: { HelloWorld } })
// export default class Home extends Vue {
//   public doLogout() {
//     // set data session
//     //@ts-ignore
//     this.$doCookieOperation("session", null);

//     this.$router.push("/");
//   }
// }
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
}
</style>
