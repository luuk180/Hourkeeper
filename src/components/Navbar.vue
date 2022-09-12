<template>
    <div v-if="!isAuthenticated">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand"
                   style="-webkit-user-select: none; /* Safari */
                        -moz-user-select: none; /* Firefox */
                        -ms-user-select: none; /* IE10+/Edge */
                        user-select: none; /* Standard */">Hourkeeper</a>
                <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">Home</router-link>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <button v-if="!isAuthenticated" class="btn btn-outline-success me-2" type="button"
                                @click="login">Login
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
    <div v-if="isAuthenticated">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand"
                   style="-webkit-user-select: none; /* Safari */
                        -moz-user-select: none; /* Firefox */
                        -ms-user-select: none; /* IE10+/Edge */
                        user-select: none; /* Standard */">Hourkeeper</a>
                <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/edit" class="nav-link">Edit</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/create" class="nav-link">Create</router-link>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <button class="btn btn-outline-success me-2" type="button" @click="logout">Logout</button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import {useAuth0} from '@auth0/auth0-vue';

export default {
  setup() {
    const {loginWithRedirect, logout, isAuthenticated, user} = useAuth0();

    return {
      login: () => {
        loginWithRedirect();
      },
      logout: () => {
        logout({returnTo: window.location.origin});
      },
      isAuthenticated,
      user,
    }
  },
}
</script>