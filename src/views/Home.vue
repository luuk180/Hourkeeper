<template>
    <div class="bg-secondary h-100">
        <div class="container">
            <h1>Welcome to Hourkeeper!</h1>
        </div>
    </div>
</template>

<script>
import {useAuth0} from "@auth0/auth0-vue";
import router from "@/router";

export default{
  setup() {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }
}
</script>