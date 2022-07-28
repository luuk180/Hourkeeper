<template>
    <div class="bg-secondary h-100">
        <div class="container card-group">
            Welcome to your personal dashboard {{ user.given_name }}.
            <div class="container">
                <div class="card bg-dark text-white" v-if="currentMonthHours">
                    <div class="card-title">{{currentMonth}}</div>
                    <div class="card-content">{{currentMonthHours}}</div>
                </div>
                <div class="card bg-dark text-white" v-if="lastMonthHours">
                    <div class="card-title">{{lastMonth}}</div>
                    <div class="card-content">{{lastMonthHours}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useAuth0} from "@auth0/auth0-vue";


export default {
  data() {
    let months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return {
      currentMonth: (months[new Date().getMonth()+1] + " " + new Date().getFullYear()),
      lastMonth: (months[new Date().getMonth()] + " " + new Date().getFullYear()),
      currentMonthHours: 0,
      lastMonthHours: 0,
      user: {},
    }
  },
  created() {
    this.getCurrentMonthHours();
    this.getLastMonthHours();
    const {user} = useAuth0();
    this.user = user;
  },
  methods: {
    async getQuery(month, year) {
      const {getAccessTokenSilently} = useAuth0();
      const token = await getAccessTokenSilently();
      const response = await fetch('https://api.hourkeeper.net/read', {
        method: "post",
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "reqMonth": month,
          "reqYear": year
        })
      });
      return response.json();
    },
    async getCurrentMonthHours() {
      let currentDate = new Date();
      this.getQuery(currentDate.getMonth() + 1, currentDate.getFullYear()).then((data) => {
        let totalHours = 0;
        for (let i = 0; i < data.length; i++) {
          totalHours += parseFloat(data[i].hours);
        }
        this.currentMonthHours = totalHours;
      })
    },
    async getLastMonthHours() {
      let currentDate = new Date();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      if (month === 1) {
        month = 12;
        year--;
        this.getQuery(month, year).then((data) => {
          let totalHours = 0;
          for (let i = 0; i < data.length; i++) {
            totalHours += parseFloat(data[i].hours);
          }
          this.lastMonthHours = totalHours;
        })
      } else {
        month--;
        this.getQuery(month, year).then((data) => {
          let totalHours = 0;
          for (let i = 0; i < data.length; i++) {
            totalHours += parseFloat(data[i].hours);
          }
          this.lastMonthHours = totalHours;
        })
      }
    }
  }
}
</script>