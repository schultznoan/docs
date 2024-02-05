<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
import auth from '~/middlewares/auth.js'
export default {
  middleware: auth
}
</script>
