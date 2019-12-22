<template>
  <div id="app">
      <header>
        <!-- <div v-if="$isLogin" id="nav">
            <router-link v-if="$route.path !== '/home'" to="/home">Home</router-link>
            <router-link v-if="$route.path !== '/about'" to="/about">About</router-link>
            <router-link v-if="$route.path !== '/note'" to="/note">Participant</router-link>
        </div> -->
        <div class="logo">
            <a href="">
                <img class="logo-text" src="./assets/Logo.svg" alt="logo">
            </a>
        </div>
        <ul class="nav">
            <li>
                <a href="">Find Training</a>
            </li>
            <li>
                <a href="">Community</a>
            </li>
            <li>
                <a href="">About Us</a>
            </li>
            <li v-if="$isLogin">
                <a href="#"><i class="fa fa-user"></i></a>
                <ul>
                    <li><a href="#"><button @click="doLogout">Logout</button></a></li>
                </ul>
            </li>
        </ul>
    </header>
    <router-view></router-view>

    <notifications group="default" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "App"})
export default class App extends Vue {
  public doLogout() {
    // set data session
    //@ts-ignore
    this.$doCookieOperation("session", null);

    this.$router.push("/");
  }
}
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.min.css";
@import url('https://fonts.googleapis.com/css?family=Montserrat:500&display=swap');

* {
    box-sizing: border-box;
}

body {
    background-color: #edf1f8;
    font-family: 'Montserrat', sans-serif;

    header {
      background:white;
      height: 66px;

      *{
        color: #01111c;
      }

      .logo {
          float: left;
          height: inherit;
          margin-left: 2em;
          line-height: 60px;

          img {
            height: 50%;
          }

          a {
            text-decoration: none;
          }
      }

      .logo-text {
        margin: 9px;
      }

      ul {
        float: right;
        margin: 0;
        padding: 0;
        list-style: none;
        height: inherit;

        li {
          float: left;
          position: relative;
          height: inherit;

          a {
            display: block;
            padding: 21px;
            font-size: 1em;
            text-decoration: none;
            height: inherit;
          }

          a:hover {
            background: #df205b;
            transition: 0.5s;
            color: #edf1f8;
            text-decoration: none;
          }

          

          ul {
            position: absolute;
            top: 66px;
            right: 0px;
            width: 180px;
            display: none;

            li {
              width: 100%;

              a {
                padding: 21px;
                background: white;
                color: #444;
                text-align: center;
              }
            }
          }

        }

        li:hover ul{
          display: block;
        }

      }

    }
}
</style>
