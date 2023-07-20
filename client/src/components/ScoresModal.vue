<template>
  <div
      v-if="scoresModalStatus"
      class="modal">
    <div
        class="close-button"
        @click="$emit('showScores')">
      x
    </div>
    <h2>Scores</h2>
    <h3 v-if="scoresData.length === 0">No Results</h3>
    <table v-else>
      <thead>
      <tr>
        <td>No</td>
        <td>Player Hand</td>
        <td>Dealer Hand</td>
        <td>Result</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(score, index) in scoresData">
        <td>{{ ++index }}</td>
        <td>{{ getValue(score.playerHand) }}</td>
        <td>{{ getValue(score.dealerHand) }}</td>
        <td>{{ score.gameResult }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'ActionButtons',

    props: {
      /**
       * @property {Boolean} scoresModalStatus
       */
      scoresModalStatus: {
        type: Boolean,
        required: true
      },
      /**
       * @property {Array<Object>} scoresData
       */
      scoresData: {
        type: Array,
        required: true
      }
    },

    methods: {
      /**
       * @param {Array<String>} value
       * @return {string}
       */
      getValue(value) {
        return value.join('|');
      }
    }
  };
</script>

<style scoped>
  .modal {
    width: 600px;
    height: 600px;
    background: gray;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0 auto;
    top: 20%;
    text-align: center;
    padding: 20px;
    overflow: scroll;
  }
  .close-button {
    width: fit-content;
    float: right;
    cursor: pointer;
    font-size: 20px;
  }
  td {
    width: 35%;
    border: 1px solid;
  }
  table {
    margin: 0 auto;
    width: 90%;
  }
  td:first-child {
    width: 10% !important;
  }
</style>
