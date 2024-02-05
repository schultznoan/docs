<template>
  <div class="container">
    <div class="main">
      <div class="main-header" @click="$router.push('/')">INPFORSPHERE.COM</div>
      <div class="main-content">
        <div class="main-content_header">Авторизация</div>
        <div class="main-content__head">Пароль</div>
        <ui-input
          type="password"
          placeholder="Введите пароль"
          :value="form.password"
          :keyForm="'password'"
          @onChange="onChange"
        />
        <div class="main-content__head" style="margin-top: 10px">
          Повторите пароль
        </div>
        <ui-input
          type="password"
          placeholder="Введите пароль"
          :value="form.verifyPassword"
          :keyForm="'verifyPassword'"
          @onChange="onChange"
        />
        <ui-button
          :title="'SAVE'"
          :disabled="(validate.password && validate.verifyPassword) || loading"
          @action="action"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  validate({ query }) {
    if (!query.link) {
      return false;
    }

    return true;
  },
  data() {
    return {
      form: {
        link: this.$route.query.link,
        password: "",
        verifyPassword: "",
      },
      validate: {
        password: false,
        verifyPassword: false,
      },
      loading: false
    };
  },
  methods: {
    ...mapMutations({
      setAuth: 'setAuth'
    }),
    onChange({ key, value, valide }) {
      this.form[key] = value;
      this.validate[key] = valide;
    },
    async action () {
      if (this.form.password !== this.form.verifyPassword) {
        this.$toast.error('Пароли не совпадают')
        return
      }

      if (this.loading) {
        this.$toast.warning('Идет загрузка')
      }

      this.loading = true

      try {
        await this.$axios.post('/document/signin', this.form)

        this.setAuth(true)

        this.$router.push("/document/list")
      } catch (error) {
        this.$toast.error(error?.response?.data?.message)
      } finally {
        this.loading = false
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  &-header {
    color: #567bf3;
    font-size: 18px;
    line-height: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    cursor: pointer;
  }

  &-content {
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;

    &_header {
      text-align: center;
      line-height: 27px;
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .input-group {
      margin-top: 5px;
    }

    &__head {
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
    }

    &__info {
      margin-top: 20px;
      padding: 10px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: #333;
      background-color: #ECF0F9;
      display: flex;

      svg {
        margin-right: 5px;
      }
    }
  }
}
</style>