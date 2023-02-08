<template>
    <div class="bg-secondary h-100 align-content-center">
        <form class="w-75 container pt-2 pb-2">
            <div class="form-group mb-2">
                <label for="hours">Hours worked: {{ hours }}</label>
                <input type="range" min="0" max="24" step=".25" class="form-control" v-model.number="hours" />
            </div>
            <div class="form-group mb-2">
                <label for="date">Date:</label>
                <input type="date" class="form-control" v-model="date">
            </div>
            <button @click="submitForm" type="submit" class="btn btn-primary">Add</button>
            <div v-if="result" class="mt-4">
                <span>{{result}}</span>
            </div>
        </form>
    </div>
</template>

<script>
import {useAuth0} from "@auth0/auth0-vue";

export default {
  name: "Create-Page",
  data() {
    return {
      date: (new Date()).toISOString().split('T')[0],
      hours: 0,
      accessToken: "",
      result: "",
    }
  },
  methods: {
    async getAccessToken() {
      const {getAccessTokenSilently} = useAuth0();
      this.accessToken = await getAccessTokenSilently();
    },
    async submitForm (e) {
      e.preventDefault();
      const response = await fetch('https://api.hourkeeper.net/HoursEntry/addEntry/', {
        method: "POST",
        headers: {
          Authorization: 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          Date: this.date,
          Hours: this.hours
        }),
      });
      if(response.ok){
        this.result = "Success!"
      }else{
        this.result = "Failed to add hours."
      }
    }
  },
  created() {
    this.getAccessToken()
  },
}
</script>