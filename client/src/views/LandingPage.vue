<template>
  <div>
    <form class="container">
      <h3>BlackJack Game</h3>
      <input
          placeholder="Enter Your Name"
          required
          v-model="userName"/>
      <input
          placeholder="Delay"
          type="number"
          required
          min="0"
          v-model="delay"/>
      <input type="submit" @click="submit" value="Start The Game">
    </form>
  </div>

</template>

<script>
  export default {
    name: 'LandingPage',

    data () {
      return {
        userName: '',
        delay: ''
      };
    },

    methods: {
      /**
       * @return {void}
       */
      submit () {
        if (this.userName && this.delay) {
          this.$router.push(`/home?userName=${this.userName}&delay=${this.delay}`);
        }
      }
    }
  }
</script>

<style>
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    height: 100%;
  }
  input, form {
    width: 30%;
    height: 30px;
    margin-bottom: 20px;
  }
  button {
    width: 20%;
    height: 30px;
    margin-bottom: 20px;
  }
</style>
