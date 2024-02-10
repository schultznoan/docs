<template>
  <div v-if="$route.query?.type === 'addresat'" class="container">
    здесь будет инструкция
  </div>
  <div v-else />
</template>

<script>
export default {
  created() {
    if (process.client) {
      const isAdr = this.$route.query?.type;

      if (isAdr !== "addresat") {
        this.$store.getters.getAuth
          ? this.$router.push("/document/list")
          : this.$router.push({
              path: "/document/signin",
              query: { ...this.$route.query, link: window.location.href },
            });
      }
    }
  },
};
</script>