<template>
  <div class="wrapper">
    <div class="login-page">
        <form class="form-login" @submit="doSave">
            <div class="box">
                <div class="form-head">
                    <h2>Login to Sinau Koding</h2>
                    <p>Let We Know Your Participant</p>
                </div>
                <div class="form-body">
                    <input
                      v-model="user.username"
                      type="text"
                      placeholder="Username"
                      autofocus
                      class="form-control"
                      :class="{'is-invalid': hasSubmit && user.username.length === 0}"
                    />
                    <input
                      v-model="user.password"
                      type="password"
                      placeholder="Password"
                      class="form-control"
                      :class="{'is-invalid': hasSubmit && user.password.length === 0}"
                    />
                    <label class="checkbox">
                     <p><input v-model="rememberMe" type="checkbox"/>Remember me</p>
                    </label>
                </div>
                <div class="form-footer">
                    <button class="btn btn-lg btn-primary btn-block" type="submit">
                      <template v-if="isLoading">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span class="sr-only">Loading...</span>
                      </template>
                      <template v-else>Login</template>
                    </button>
                </div>
            </div>
        </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
// import Cookies from "js-cookie";

import User from "../entity/User";

@Component({ name: "login" })
export default class Login extends Vue {
  public user: User = new User();

  public rememberMe: boolean = false;

  public hasSubmit: boolean = false;

  public isLoading: boolean = false;

  public get isValid(): boolean {
    return this.user.username !== "" && this.user.password !== "";
  }

  public doSave(event: Event): void {
    event.preventDefault();

    this.hasSubmit = true;

    if (!this.isLoading && this.isValid) {
      this.isLoading = true;

      axios
        .post("http://192.168.0.152:9000/login", {
          username: this.user.username,
          password: this.user.password
        })
        .then(response => {
          if (response.data.status == "200") {
            this.hasSubmit = false;

            this.user = new User();

            //@ts-ignore
            this.$doCookieOperation("session", response.data.data);

            this.$notify({
              group: 'default',
              type: 'success',
              title: 'Login',
              text: 'Succes'
            });

            this.$router.push("/note");
          } else {
             this.$notify({
              group: 'default',
              type: 'warn',
              title: 'Login',
              text: 'Invalid !'
            });
          }
        })
        .catch(error => {
          this.$notify({
              group: 'default',
              type: 'error',
              title: 'Login',
              text: error.toString()
            });
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  margin-top: 80px;
  margin-bottom: 80px;
  
  .login-page {
    
    height: 100vh;
    position: relative;

    .box {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      width: 320px;
      padding: 40px 20px;
      // border: 0.5px solid #36c4ed;
      // box-shadow: 0px 0px 10px #edf1f8;
      border-radius: 10px;

      .form-head {

        h2 {
          text-align: center;
          margin: 10px 0 20px !important;
          color: #01111c;
          margin-bottom: 2rem;
          font-size: 1.5em;
          font-weight: bold;
        }

        p {
          text-align: center;
          margin: 10px 0px 40px !important;
          color: rgb(214, 210, 210);
          margin-bottom: 3rem;
          font-size: 0.9em;
        }

      }

      .form-body {
        display: flex;
        flex-direction: column;

        input {
          height: 40px;
          margin-bottom: 20px;
          border: 1px solid #ffff;
          width: 100%;
          border-radius: 5px;
          padding-left: 1rem;
          transition: box-shadow 0.5s ease;
        }

        input::placeholder {
          font-size: 14px;
          color: rgb(214, 210, 210);

        }

        .checkbox {
          
          margin: 10px 10px;

          p {
            font-size: 0.8em;
            margin-left: 25px;
          }
          
          input {
            height: 13px;
            position: absolute;
            right: 120px;
            bottom: 89px;
          }
        }

      }

      .form-footer {

        button {
          height: 40px;
          width: 100%;
          border-radius: 5px;
          padding: 0 50px;
          color: #edf1f8;
          background-color: #df205b;
          border: none;
          text-transform: uppercase;
          transition: trnsform 80ms ease-in;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
        }

        button:hover {
          box-shadow: 0px 0px 10px #df205b;
          background-color: #a81141;
        }

      }

    } 

  }
}
</style>
