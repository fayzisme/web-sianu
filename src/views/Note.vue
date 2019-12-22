<template>
  <div class="note wrapper">
    <div class="main_content">
        <div class="container">
            <div v-if="!note" class="semua">
                <div class="header-table">
                    <div class="tittle">
                        <h2>
                            Participant
                        </h2>
                    </div>
                    <div class="button">
                        <input type="text" class="head-search" placeholder="search">
                        <button class="btn btn-sm btn-success" @click="() => doAddOrEdit()">Add</button>
                    </div>
                </div>
                <table class="content-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-if="data.length === 0">
                          <td>
                              <span v-if="isLoading">Memuat data...</span>
                              <span v-else>
                                <h5>Ooops</h5>
                                <p>You don't have participant</p>
                              </span>
                          </td>
                      </tr>
                      <tr v-else v-for="(item, index) in data" :key="index">
                          <td>{{item.title}}</td>
                          <td>{{item.description}}</td>
                          <td>{{item.content}}</td>
                          <td class="button-action" width="20%">
                              <button class="btn btn-sm btn-info" @click="() => doAddOrEdit(item)">Edit</button>
                              <button class="error" @click="() => doDelete(item)"><i class="fa fa-trash"></button>
                          </td>
                      </tr>
                    </tbody>
                </table>
            </div>
            <form v-else class="form-note" @submit="doSave">
              <h2 class="form-note-heading">
                  {{note.id ? "Change note" : "Add new note"}}
              </h2>
              <p>Insert Name</p>
              <input v-model="note.title" type="text" placeholder="Full Name" autofocus
                    class="form-control" :class="{'is-invalid': hasSubmit && note.title.length === 0}"/>
              <p>Phone Number</p>
              <input v-model="note.description" type="text" placeholder="eg: 6812116666"
                    class="form-control" :class="{'is-invalid': hasSubmit && note.description.length === 0}"/>
              <p>email</p>
              <input type="text" placeholder="eg: yourname@sinaukoding.id"
                    class="form-control"/>
              <p>Address</p>
              <input v-model="note.content" type="text" placeholder="valid address"
                    class="form-control" :class="{'is-invalid': hasSubmit && note.content.length === 0}"/>
              <div class="btn-submit text-lg-right">
                  <button class="btn btn-m btn-dark" type="button" @click="doReset">Cancel</button>
                  <button class="btn btn-m btn-primary" type="submit">
                      <template v-if="isLoading">
                          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span class="sr-only">Loading...</span>
                      </template>
                      <template v-else>
                          <span v-if="note.id">Update</span>
                          <span v-else>Save</span>
                      </template>
                  </button>
              </div>
          </form>          
        </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import axios from "axios";

  import Note from "../entity/Note";
  import User from "../entity/User";

  @Component({name: "note-page"})
  export default class NotePage extends Vue {

    public data: Array<Note> = [];

    public note: Note | null = null;

    public isLoading: boolean = false;

    public hasSubmit: boolean = false;

    public get isValid(): boolean {
      return this.note != null && this.note.title !== "" && this.note.description !== "" && this.note.content !== "";
    }

    public mounted() {
      this.doReset();
    }

    public doReset() {
      this.hasSubmit = false;
      this.isLoading = false;

      this.note = null;

      this.doFind();
    }

    public doFind() {
      this.isLoading = true;

      //@ts-ignore
      const user: User = this.$doCookieOperation("session");

      axios.get("http://192.168.0.152:9000/notes", {
        headers: {"Authorization": user.token}
      }).then((response) => {
        if (response.data.status == "200" && Array.isArray(response.data.data)) {
          this.data = response.data.data;
        }
      }).finally(() => {
        this.isLoading = false;
      });
    }

    public doAddOrEdit(note?: Note) {
      this.note = note ? note : new Note();
    }

    public doDelete(note: Note) {
       if (!this.isLoading && note.id) {
        if (confirm("are you sure to delete " + note.title + " ?")) {
          this.isLoading = true;

          //@ts-ignore
          const user: User = this.$doCookieOperation("session");

          this.handleResponse(axios.delete("http://192.168.0.152:9000/notes/" + note.id, {
            headers: {"Authorization": user.token}
          }));
        }
      }
    }

    public doSave(event: Event): void {
      event.preventDefault();

      this.hasSubmit = true;

      if (!this.isLoading && this.note != null) {
        if (this.isValid) {
          this.isLoading = true;

          //@ts-ignore
          const user: User = this.$doCookieOperation("session");

          this.handleResponse(axios.request({
            url: "http://192.168.0.152:9000/notes",
            method: this.note.id ? "PUT" : "POST",
            headers: {"Authorization": user.token},
            data: this.note,
          }));
        } else {
          this.$notify({
            group: 'default',
            type: 'error',
            title: 'Note',
            text: 'Please fill all field'
          });
        }
      }
    }

    public handleResponse(promise: Promise<any>) {
      promise.then(() => {
        this.$notify({
          group: 'default',
          type: 'success',
          title: 'Note',
          text: 'Success!'
        });

        this.doReset();
      }).catch((error) => {
        this.$notify({
          group: 'default',
          type: 'error',
          title: 'Note',
          text: error.toString()
        });
      });
    }

  }
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    position: relative;

    .main_content {
      width: 100%;
      margin-left: 260px;

      .container{
        margin: 60px !important;
        color: #717171 !important;
        line-height: 25px !important;

        div{
          margin-bottom: 20px;
        }

        .semua{
          background-color: white;
          border-radius: 7px;
          position: relative;
          padding-bottom: 30px;

          .header-table {
            background: #f5f8fc;
            height: 80px;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;

            .button {

                input {
                  height: 40px;
                  margin-bottom: 20px;
                  border: 1px solid rgb(206, 198, 198);
                  width: 80%;
                  background-repeat: 5px;
                  padding-left: 1rem;
                  transition: box-shadow 0.5s ease;
                  margin-right: 15px;
                  border-radius: 5px;
              }

              button {
                  height: 40px;
                  width: 70%;
                  border-radius: 5px;
                  padding: auto;
                  color: white;
                  background-color: #36c4ed;
                  border: none;
                  font-size: 14px;
                  font-weight: bold;
                  cursor: pointer;
                  transition: box-shadow 0.5 ease;
              }

              button:hover {
                  box-shadow: 0 0 10px #31b2d6;
                  background-color:#31b2d6;
              }
            } 

            .button input::placeholder {
                font-family: 'Montserrat', sans-serif;
                font-size: 14px;
                color: rgb(219, 210, 210);
                font-weight: bold;
            }

          }

          .content-table {

              tbody {
                
                button.error {
                  background-color: #df205b;
                  border: none;
                  color: white;
                  font-size: 16px;
                  padding: 4px;
                  border-radius: 7px;
                  text-decoration: none;
                  cursor: pointer;
                }

             } 
          } 

        }

        .tittle {
            float: left;
            height: inherit;
            padding: 21px;
        }

        .button {
          float: right;
          width: 50%;
          padding: 21px;
          list-style: none;
          height: inherit;
          display: flex;
          flex-direction: row;
        }

      }

    }
}
</style>
