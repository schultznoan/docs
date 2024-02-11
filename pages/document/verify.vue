<template>
  <div class="container">
    <div class="main">
      <div class="main-header" @click="$router.push('/')">INPFORSPHERE.COM</div>
      <div class="main-content">
        <div class="main-content_header">Верификация</div>
        <div class="main-content__form">
          <div class="main-content__form__list">
            <div class="main-content__form__list__info">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10" cy="10" r="10" fill="#567BF3" />
                <path
                  d="M9.992 14.6667V6.74666L10.508 7.31066H8.096V6.26666H11.18V14.6667H9.992Z"
                  fill="white"
                />
              </svg>
              <div>
                Какие 5 букв отсутствуют в фамилии, имени Автора?
              </div>
            </div>
            <div class="main-content__form__list__input">
              <div class="main-content__form__list__input__head">
                Введите 5 букв
              </div>
              <ui-input
                :verify="true"
                :value="form.verifyAuthor"
                :keyForm="'verifyAuthor'"
                @onChange="onChange"
              />
            </div>
            <div
              class="main-content__form__list__info"
              style="margin-top: 20px"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10" cy="10" r="10" fill="#567BF3" />
                <path
                  d="M7.444 15V14.184L10.864 10.884C11.168 10.596 11.392 10.344 11.536 10.128C11.688 9.904 11.788 9.7 11.836 9.516C11.892 9.324 11.92 9.14 11.92 8.964C11.92 8.532 11.768 8.192 11.464 7.944C11.16 7.696 10.716 7.572 10.132 7.572C9.684 7.572 9.28 7.648 8.92 7.8C8.56 7.944 8.248 8.172 7.984 8.484L7.168 7.776C7.488 7.368 7.916 7.056 8.452 6.84C8.996 6.616 9.592 6.504 10.24 6.504C10.824 6.504 11.332 6.6 11.764 6.792C12.196 6.976 12.528 7.244 12.76 7.596C13 7.948 13.12 8.364 13.12 8.844C13.12 9.116 13.084 9.384 13.012 9.648C12.94 9.912 12.804 10.192 12.604 10.488C12.404 10.784 12.116 11.116 11.74 11.484L8.692 14.424L8.404 13.956H13.48V15H7.444Z"
                  fill="white"
                />
              </svg>

              <div>
                Какие 5 букв отсутствуют в фамилии, имени Адресата?
              </div>
            </div>
            <div class="main-content__form__list__input">
              <div class="main-content__form__list__input__head">
                Введите 5 букв
              </div>
              <ui-input
                :verify="true"
                :value="form.verifyAddresse"
                :keyForm="'verifyAddresse'"
                @onChange="onChange"
              />
            </div>
            <ui-button
              :title="'VERIFY'"
              :disabled="
                (validate.verifyAuthor && validate.verifyAddresse) || loading
              "
              @action="action"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        verifyAuthor: "",
        verifyAddresse: "",
      },
      validate: {
        verifyAuthor: false,
        verifyAddresse: false,
      },
      loading: false,
    };
  },
  methods: {
    onChange({ key, value, valide }) {
      this.form[key] = value.toUpperCase();
      this.validate[key] = valide;
    },
    async action() {
      if (this.loading) {
        this.$toast.warning("Идет загрузка");
        return
      }

      this.loading = true;

      try {
        await this.$axios.post("/document/verify", this.form);

        window.location.href = this.form.link
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

    &__form {
      &__list {
        &__info {
          border-radius: 10px;
          padding: 10px;
          display: flex;
          font-weight: 500;
          line-height: 20px;
          font-size: 14px;
          background-color: #ecf0f9;

          svg {
            margin-right: 5px;
          }
        }
        &__input {
          margin-top: 15px;

          &__head {
            font-weight: 400;
            font-size: 12px;
            line-height: 17px;
          }

          .input-group {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>