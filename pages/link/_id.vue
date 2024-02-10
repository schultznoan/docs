<template>
  <div v-if="$route.query?.type === 'addresat'" class="container">
    здесь будет инструкция
  </div>
</template>

<script>
export default {
//   asyncData (ctx) {
//     const isAdr = ctx.route.query?.type

//     console.log(ctx.req.protocol)

//     // if (isAdr !== 'addresat') {
//     //   ctx.store.getters.getAuth ? ctx.redirect('/document/list') : ctx.redirect({ path: '/document/signin' })
//     //   return
//     // }

//     return
//   }
  mounted () {
    const isAdr = this.$route.query?.type
    
    if (isAdr !== 'addresat') {
      this.$store.getters.getAuth ? this.$router.push('/document/list') : this.$router.push({ path: '/document/signin', query: { ...this.$route.query, link: window.location.href } })
      return
    }
  }
}
</script>