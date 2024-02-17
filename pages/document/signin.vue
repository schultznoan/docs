<template>
  <div class="container">
    <div class="main">
      <div class="main-header" @click="$router.push('/')">INPFORSPHERE.COM</div>
      <div class="main-content">
        <div class="main-content_header">Авторизация для автора</div>
        <div class="main-content__head">Пароль</div>
        <ui-input
          type="password"
          placeholder="Введите пароль"
          :value="form.password"
          :keyForm="'password'"
          @onChange="onChange"
        />
        <ui-button
          :title="'SUBMIT'"
          :disabled="validate.password || loading"
          @action="action"
        />
      </div>
      <div class="main-content" style="margin-top: 20px">
        <div class="main-content_header">Авторизация для адресата</div>
        <div class="main-content__head">Линк</div>
        <div class="main-content__action">
          <ui-input
            placeholder="Введите ссылку"
            :value="form.link"
            :keyForm="'link'"
            @onChange="onChange"
          />
          <div :class="{ disabled: !validate.link }" @click="changepage(false)">
            <img src="/btn.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
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
      },
      validate: {
        password: false,
        link: true
      },

      loading: false,
    };
  },
  methods: {
    ...mapMutations({
      setAuth: "setAuth",
    }),
    changepage () {
      window.location.href = `${this.form.link}?type=addresat`
    },
    onChange({ key, value, valide }) {
      this.form[key] = value;
      this.validate[key] = valide;
    },
    async action() {
      if (this.loading) {
        this.$toast.warning("Идет загрузка");
        return;
      }

      this.loading = true;

      try {
        await this.$axios.post("/document/signin", this.form);

        this.setAuth(true);

        window.location.href = this.form.link;
      } catch (error) {
        this.$toast.error(error?.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },
  },
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
      background-color: #ecf0f9;
      display: flex;

      svg {
        margin-right: 5px;
      }
    }

    &__action {
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        margin-left: 20px;
        cursor: pointer;
        margin-top: 5px;
      }
    }
  }
}
</style>