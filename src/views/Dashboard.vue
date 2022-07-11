<template>
    <div class="bg-secondary h-100">
        <div class="container">
            Welcome to your personal dashboard {{ user.given_name }}.
            <div v-if="lastMonthHours">Last month you worked {{ lastMonthHours }} hours.</div>
            <div v-if="currentMonthHours">This month you worked {{ currentMonthHours }} hours.</div>
        </div>
    </div>
</template>

<script>
import {useAuth0} from "@auth0/auth0-vue";


export default {
  data() {
    return {
      currentMonthHours: 0,
      lastMonthHours: 0,
      user: {}
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