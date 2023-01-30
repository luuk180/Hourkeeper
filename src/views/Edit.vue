<template>
    <div class="bg-secondary h-100 align-content-center pb-2">
        <div v-if="!gotReturn">
            <form class="container w-75 pt-2 pb-2">
                <div class="form-group mb-2">
                    <label for="month">Month:</label>
                    <input type="number" v-model="month" class="form-control">
                </div>
                <div class="form-group mb-2">
                    <label for="year">Year:</label>
                    <input type="number" v-model="year" class="form-control">
                </div>
                <button @click="getQuery" type="submit" class="btn btn-primary">Get</button>
            </form>
        </div>
        <div v-if="gotReturn && dbRows.length > 0" class="container">
            <h1 class="pt-2">Entries for {{requestMonth}}</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Date:</th>
                        <th scope="col">Hours:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row) in dbRows" :key="row.date">
                        <th scope="row">{{row.date}}</th>
                        <td>{{row.hours}}</td>
                    </tr>
                </tbody>
            </table>
            <button @click="resetForm" type="submit" class="btn btn-primary">Reset</button>
        </div>
        <div v-if="gotReturn && dbRows.length === 0" class="container">
            <h1 class="pt-2 pb-2">This month is empty!</h1>
            <button @click="resetForm" type="submit" class="btn btn-primary">Reset</button>
        </div>
    </div>
</template>

<script>
import {useAuth0} from "@auth0/auth0-vue";
let currentDate = new Date();

export default{
  name: "Edit-Page",
  data() {
    return{
      dbRows: {},
      gotReturn: false,
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      accessToken: "",
      requestMonth: "",
    }
  },
  created() {
    this.getAccessToken();
  },
  methods: {
    async getAccessToken() {
      const {getAccessTokenSilently} = useAuth0();
      this.accessToken = await getAccessTokenSilently();
    },
    resetForm() {
      this.gotReturn = false;
    },
    async getQuery (e) {
      e.preventDefault();
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const response = await fetch('https://api.hourkeeper.net/read', {
        method: "post",
        headers: {
          Authorization: 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "reqMonth": this.month,
          "reqYear": this.year
        })
      });
      this.gotReturn = true;
      this.dbRows = await response.json();
      for(let i = this.dbRows.length - 1; i >= 0; i--){
        this.dbRows[i].date = this.dbRows[i].date.substring(8, 10);
      }
      this.requestMonth = months[this.month - 1];
    }
  }
}
</script>