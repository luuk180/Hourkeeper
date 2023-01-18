<template>
    <div class="bg-secondary h-100">
        <div class="container">
            <div class="text-white mb-2 pt-2">Welcome to your personal dashboard {{ user.given_name }}.</div>
                <div class="card-group pb-4">
                    <div class="card bg-secondary text-white border-4" v-if="currentMonthHours">
                        <div class="card-body w-30">
                            <div class="card-title">{{currentMonth}}</div>
                            <div class="card-content">{{currentMonthHours}}</div>
                        </div>
                    </div>
                    <div class="card bg-secondary text-white border-4" v-if="lastMonthHours">
                        <div class="card-body w-30">
                            <div class="card-title">{{lastMonth}}</div>
                            <div class="card-content">{{lastMonthHours}}</div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import {useAuth0} from "@auth0/auth0-vue";


export default {
  data() {
    return {
      currentMonth: "Loading...",
      lastMonth: "Loading...",
      currentMonthHours: 0,
      lastMonthHours: 0,
      user: {},
    }
  },
  created() {
    const {user} = useAuth0();
    this.user = user;
    this.monthString()
    this.getCurrentMonthHours();
    this.getLastMonthHours();
  },
  methods: {
    monthString() {
      const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      const date = new Date()
      this.currentMonth = months[date.getMonth()] + " " + date.getFullYear()
      let month = date.getMonth()
      let year = date.getFullYear()
      if (month === 0) {
        month = 11
        year--
      }else{
        month--
      }
      this.lastMonth = months[month] + " " + year
    },

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