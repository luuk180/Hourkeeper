<template>
  <div id="nav">
      <navbar></navbar>
  </div>
  <router-view/>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {Navbar}
}
</script>