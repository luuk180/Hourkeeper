<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand">Hourkeeper</a>
                <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">Home</router-link>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <button class="btn btn-outline-success me-2" type="button" @click="login">Login</button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import { useAuth0 } from '@auth0/auth0-vue';

    export default {
      setup() {
        const { loginWithRedirect } = useAuth0();

        return {
          login: () => {
            loginWithRedirect();
          }
        }
      }
    }
</script>