<template>
    <div class="bg-secondary h-100">
        <div class="container">
            Welcome to your personal dashboard {{user.given_name}}.
        </div>
    </div>
</template>

<script>
    import { useAuth0 } from "@auth0/auth0-vue";

    export default {
      setup() {
        const { user } = useAuth0();

        return {
          user
        }
      }
    }
</script>