<template>
  <div class="input-group">
    <input
      v-if="view === 'input'"
      v-model="localValue"
      class="input-group__input"
      :type="localType"
      :placeholder="placeholder"
      :maxlength="verify ? 5 : 1000"
      :class="startValide ? (!errorMessage ? 'valid' : 'error') : ''"
    />
    <textarea
      v-else
      v-model="localValue"
      class="input-group__textarea"
      rows="10"
      :placeholder="placeholder"
    />
    <div v-if="startValide && errorMessage" class="form-error">
      {{ errorMessage }}
    </div>
    <div
      v-if="startValide"
      class="icons"
      :style="startValide && type === 'password' ? 'right: 30px' : ''"
    >
      <div v-if="!errorMessage" class="icons-valid" />
      <div v-if="errorMessage" class="icons-error" />
    </div>
    <div v-if="type === 'password'" class="icons" @click="changeType">
      <div v-if="localType === 'password'" class="icons-password-close" />
      <div v-else class="icons-password-open"></div>
    </div>
  </div>
</template>

<script>
function validateLink(link) {
  if (link?.length < 10) {
    return "Некорректная ссылка";
  }

  if (!(link?.startsWith("http://") || link?.startsWith("https://"))) {
    return "Некорректная ссылка";
  }

  return "";
}

function validateEmptry(value) {
  if (!value) {
    return "Некорректное значение";
  }

  return "";
}

function validateEmail(email) {
  if (!/^[a-zA-Z0-9._%+@-]+@[a-zA-Z0-9.@-]+\.[a-zA-Z]+$/i.test(email)) {
    return "Некорректный e-mail";
  }

  return "";
}

function validatePassword(pass) {
  if (pass?.length < 6) {
    return "Пароль должен быть не менее 6 символов";
  }

  return "";
}

function validateVerify(pass) {
  if (!/^[a-zA-ZА-Яа-яЁё]+$/.test(pass)) {
    return "Код может содержать только буквы";
  }
  if (pass?.length < 5) {
    return "Код должен состоять из 5 букв";
  }

  return "";
}

export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    view: {
      type: String,
      default: "input",
    },
    value: {
      required: true,
    },
    keyForm: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localType: this.type,
      startValide: false,
      errorMessage: "",
      validatorList: {
        link: validateLink,
        addresat: validateLink,
        email: validateEmail,
        comment: validateEmptry,
        password: validatePassword,
        verifyPassword: validatePassword,
        verifyAuthor: validateVerify,
        verifyAddresse: validateVerify,
      },
    };
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.startValide = true;
        this.errorMessage = this.validatorList[this.keyForm](value);
        this.$emit("onChange", {
          key: this.keyForm,
          valide: !this.validatorList[this.keyForm](value).length,
          value,
        });
      },
    },
  },
  watch: {
    value(value) {
      if (value) {
        this.startValide = true;
      } else {
        this.startValide = false;
      }
    },
  },
  methods: {
    changeType() {
      if (this.localType === "password") {
        this.localType = "text";
        return;
      }

      this.localType = "password";
    },
  },
};
</script>

<style lang="scss" scoped>
.input-group {
  width: 100%;
  position: relative;

  &:not(:first-child) {
    margin-top: 10px;
  }

  &__input,
  &__textarea {
    padding: 10px 15px;
    border-radius: 10px;
    border: 1px solid #0184ff7e;
    font-size: 14px;
    line-height: 20px;
    width: -webkit-fill-available;
    resize: none;
    font-family: Montserrat, sans-serif;
    outline: none;

    &.valid {
      background-color: #fafafa;
    }

    &.error {
      border-color: #f0b6b8;
      color: #e1262d;
      background-color: #ffecec;
      border: 1px solid #f1a9a9;
    }

    &:focus {
      border: 1px solid #012abf;

      &.error {
        border: 1px solid #ef8686;
      }
    }

    &:hover {
      border: 1px solid #012abf;

      &.error {
        border: 1px solid #ef8686;
      }
    }
  }

  .form-error {
    color: #ef8686;
    font-size: 12px;
  }
}

.icons {
  position: absolute;
  right: 5px;
  top: 7px;

  &-password-open {
    width: 26px;
    height: 28px;
    cursor: pointer;
    background: url("data:image/svg+xml,%3Csvg width='14' height='10' viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.9712 4.83076C14.0073 4.73262 14.0097 4.62609 13.9771 4.52673C13.2887 2.42955 10.7866 0 6.99929 0C3.2094 0 0.808244 2.33022 0.02719 4.5239C-0.00878996 4.62496 -0.00915187 4.7345 0.0266441 4.83561C0.77223 6.9418 3.21332 9.35941 6.99929 9.35941C10.789 9.35941 13.1891 6.95751 13.9712 4.83076ZM6.99929 7.48752C8.65696 7.48752 10.0008 6.2256 10.0008 4.66894C10.0008 3.11229 8.65696 1.85037 6.99929 1.85037C5.34163 1.85037 3.99783 3.11229 3.99783 4.66894C3.99783 6.2256 5.34163 7.48752 6.99929 7.48752Z' fill='%23333333'/%3E%3C/svg%3E%0A")
      50% no-repeat;
  }

  &-password-close {
    width: 26px;
    height: 28px;
    cursor: pointer;
    background: url("data:image/svg+xml,%3Csvg width='14' height='15' viewBox='0 0 14 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.36148 11.7019C9.40948 11.7469 9.38998 11.8256 9.32498 11.8453C5.47498 13.0012 1.30898 11.1408 0.0279766 7.65372C-0.00802344 7.55529 -0.00802344 7.4456 0.0279766 7.34669C0.399476 6.3356 1.02298 5.44966 1.82198 4.73435C1.85248 4.70716 1.90098 4.7081 1.93048 4.73576L4.08148 6.75232C4.09648 6.76638 4.10198 6.78607 4.09698 6.80529C3.53898 8.84201 5.57098 10.7404 7.73498 10.2244C7.75948 10.2183 7.78248 10.2225 7.80048 10.2394C7.97948 10.4067 9.02298 11.3845 9.36148 11.7019Z' fill='%23333333'/%3E%3Cpath d='M11.3401 10.9059C12.5431 10.1128 13.4806 8.9939 13.9731 7.65234C14.0091 7.5539 14.0091 7.44609 13.9731 7.34765C12.9771 4.635 10.1751 2.8125 7.00013 2.8125C5.76063 2.8125 4.57963 3.09234 3.53963 3.59296L0.853625 1.07484C0.658125 0.891558 0.342125 0.891558 0.146625 1.07484C-0.048875 1.25812 -0.048875 1.55437 0.146625 1.73765L13.1466 13.9252C13.3421 14.1084 13.6581 14.1084 13.8536 13.9252C14.0491 13.7419 14.0491 13.4456 13.8536 13.2623L11.3401 10.9059ZM7.00013 4.6875C8.65463 4.6875 10.0001 5.9489 10.0001 7.5C10.0001 8.10656 9.79213 8.66718 9.44263 9.12703L5.26463 5.21015C5.75513 4.8825 6.35313 4.6875 7.00013 4.6875Z' fill='%23333333'/%3E%3C/svg%3E%0A")
      50% no-repeat;
  }

  &-error {
    height: 28px;
    width: 28px;
    background: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L15 15' stroke='%23E1262D' stroke-width='2'/%3E%3Cpath d='M15 1L1 15' stroke='%23E1262D' stroke-width='2'/%3E%3C/svg%3E")
      calc(100% - 8px) 50% no-repeat;
    color: #e1262d;
  }

  &-valid {
    height: 28px;
    width: 28px;
    background: url("data:image/svg+xml,%3Csvg width='16' height='12' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 1L5.375 10.625L1 6.25' stroke='%2321B443' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E")
      calc(100% - 8px) 50% no-repeat;
  }
}
</style>