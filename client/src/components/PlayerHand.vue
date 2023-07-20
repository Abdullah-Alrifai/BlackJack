<template>
  <div>
    <h2 class="header">{{ playerName }}: {{ getPlayerSum }}</h2>
    <img
        v-for="(card, index) in playerHand"
        class="image"
        :key="index"
        :src="getImageType(card, index)"/>
  </div>
</template>

<script>
  export default {
    name: 'ActionButtons',

    props: {
      /**
       * @property {String} playerName
       */
      playerName: {
        type: String,
        default: ''
      },
      /**
       * @property {Array} playerHand
       */
      playerHand: {
        type: Array,
        default: () => []
      },
      /**
       * @property {Number} playerSum
       */
      playerSum: {
        type: Number,
        default: 0
      },
      /**
       * @property {Boolean} isGameCompleted
       */
      isGameCompleted: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      /**
       * @return {string}
       */
      getCoveredCard () {
        return require('../assets/cards/BACK.png');
      },

      /**
       * @return {boolean}
       */
      isDealer () {
        return this.playerName === 'dealer';
      },

      /**
       * @return {string}
       */
      getPlayerSum () {
        return this.isDealer && !this.isGameCompleted ? '?' : this.playerSum;
      }
    },

    methods: {
      /**
       * @param {string} value
       * @return {string}
       */
      getImageSrc (value) {
        return require(`../assets/cards/${value}.png`);
      },

      /**
       * @param {string} card
       * @param {number} index
       * @return {string}
       */
      getImageType (card, index) {
        return this.isDealer && index === 0 && !this.isGameCompleted
            ? this.getCoveredCard
            : this.getImageSrc(card);
      }
    }
  };
</script>

<style scoped>
  .image {
    width: 200px;
    height: 200px;
    margin-left: 10px;
  }
</style>
