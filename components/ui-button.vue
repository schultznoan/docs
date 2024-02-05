<template>
  <div class="input-button">
    <button
      :class="{ disabled: !disabled }"
      @click="$emit('action')"
    >
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.input-button {
  margin-top: 20px;
  button {
    font-size: 16px;
    font-weight: 600;
    line-height: 21px;
    text-align: center;
    padding: 15px;
    width: 100%;
    outline: none;
    border-radius: 10px;
    background-color: var(--color-blue);
    color: #fff;
    border: none;
    cursor: pointer;
  }
}
</style>