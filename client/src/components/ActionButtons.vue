<template>
  <div>
    <button
        class="button"
        :disabled="isGameCompleted"
        @click="$emit('hit')">
      Hit
    </button>
    <button
        class="button"
        :disabled="isGameCompleted"
        @click="$emit('stand')">
      Stand
    </button>
  </div>
</template>

<script>
  export default {
    name: 'ActionButtons',

    props: {
      /**
       * @property {Boolean} isGameCompleted
       */
      isGameCompleted: {
        type: Boolean,
        required: true
      }
    }
  };
</script>

<style>
  .button {
    margin-left: 10px;
    margin-top: 10px;
  }
</style>
