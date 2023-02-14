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
                    <div class="card bg-secondary text-white border-4" v-if="nothingFound">
                        <div class="card-body w-30">
                            <div class="card-Title">No hours found!</div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import {useAuth0} from "@auth0/auth0-vue";


export default {
  name: "Dashboard-Page",
  data() {
    return {
      currentMonth: "Loading...",
      lastMonth: "Loading...",
      currentMonthHours: 0,
      lastMonthHours: 0,
      user: {},
      nothingFound: false,
    }
  },
  created() {
    const {user} = useAuth0();
    this.user = user;
    this.getCurrentMonthHours();
    this.getLastMonthHours();
  },
  methods: {
    async getQuery(month, year) {
      const {getAccessTokenSilently} = useAuth0();
      const token = await getAccessTokenSilently();
      const response = await fetch('https://api.hourkeeper.net/HoursEntry/monthTotal/' + year + "/" + month, {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
      if(response.ok){
        return response.json();
      }else{
        this.nothingFound = true;
      }
    },
    async getCurrentMonthHours() {
      let currentDate = new Date();
      this.getQuery(currentDate.getMonth() + 1, currentDate.getFullYear()).then((data) => {
        this.currentMonth = data.monthName;
        this.currentMonthHours = data.monthHours;
      })
    },
    async getLastMonthHours() {
      let currentDate = new Date();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      if (month === 1) {
        month = 12;
        year--;
      }else{
        month--;
      }
      this.getQuery(month, year).then((data) => {
        this.lastMonth = data.monthName;
        this.lastMonthHours = data.monthHours;
      });
    }
  }
}
</script>