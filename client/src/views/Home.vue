<template>
  <div>
    <h2>Remaining Cards:{{ deck.length }}</h2>
    <button class="scores-button" @click="showScores">Scores</button>
    <player-hand
        :player-name="'dealer'"
        :player-hand="dealerHand"
        :player-sum="dealerSum"
        :is-game-completed="isGameCompleted">
    </player-hand>
    <div class="summary-container">
      <h1 v-if="isGameCompleted">{{ getResult }}</h1>
      <h1 v-if="isGameCompleted">your game will start in {{ countDownValue }} seconds</h1>
    </div>
    <player-hand
        :player-name="query.userName"
        :player-hand="playerHand"
        :player-sum="playerSum">
    </player-hand>
    <action-buttons
        :is-game-completed="isGameCompleted"
        @stand="stand"
        @hit="hit">
    </action-buttons>
    <scores-modal
     :scores-modal-status="scoresModalStatus"
     :scores-data="scoresData"
     @showScores="showScores">
    </scores-modal>
  </div>
</template>

<script>
  import axios from 'axios';
  import ActionButtons from '../components/ActionButtons';
  import PlayerHand from '../components/PlayerHand';
  import ScoresModal from '../components/ScoresModal';

  export default {
    name: 'Home',
    components: { ActionButtons, PlayerHand, ScoresModal },
    data () {
      return {
        playerHand: [],
        playerSum: 0,
        dealerHand: [],
        dealerSum:0,
        deck: [],
        numberOfAcesForPlayer: 0,
        numberOfAcesForDealer: 0,
        query: {},
        countDownValue: 0,
        isGameCompleted: false,
        scoresModalStatus: false,
        scoresData: []
      }
    },

    async beforeMount () {
      await this.fetchDeck();
      await this.setScoresData();

      this.query = this.$route.query;

      this.dealCards();
    },

    watch: {
      countDownValue: {
        immediate: true,
        handler (value) {
          if (value > 0){
            setTimeout(()=> {
              this.countDownValue--;
            }, 1000)
          }
        }
      }
    },

    computed: {
      /**
       * @return {string}
       */
      getResult () {
        if (this.playerSum > 21) {
          return `You Lose! hand(${this.dealerHand})`;
        }
        else if (this.dealerSum > 21) {
          return `You win! hand(${this.playerHand})`;
        }
        else if (this.playerSum === this.dealerSum) {
          return `Tie! hand(${this.dealerHand})`;
        }
        else if (this.playerSum > this.dealerSum) {
          return `You Win! hand(${this.playerHand}`;
        }
        else if (this.playerSum < this.dealerSum) {
          return `You Lose! hand(${this.dealerHand})`;
        }
      }
    },

    methods: {
      /**
       * @return {void}
       */
      async fetchDeck () {
        const { data: { deck } } = await axios.get('/deck/get');

        this.deck = deck;
      },

      /**
       * @return {void}
       */
      dealCards () {
        let index = 0;

        while (index < 2) {
          const playerCard = this.getCard();
          const dealerCard = this.getCard();

          this.playerHand.push(playerCard);
          this.dealerHand.push(dealerCard);

          this.setPlayerCardsValue(this.getCardValue(playerCard, 'player'));
          this.setDealerCardsValue(this.getCardValue(dealerCard, 'dealer'));

          index++;
        }
      },

      /**
       * @return {string}
       */
      getCard () {
        return this.deck.pop();
      },

      /**
       * @param {string} playerCard
       * @param {string} playerType
       * @return {number}
       */
      getCardValue (playerCard, playerType) {
        const value = playerCard.split('-')[0];

        if (value === 'A') {
          playerType === 'player' ? this.numberOfAcesForPlayer++ : this.numberOfAcesForDealer++;

          return 11;
        }

        if (isNaN(value)) {
          return 10;
        }

        return parseInt(value);
      },

      /**
       * @param {number} value
       * @return {void}
       */
      setPlayerCardsValue (value) {
        let playerValue = value;

        if (this.playerSum + playerValue > 21 && this.numberOfAcesForPlayer > 0) {
          playerValue = 1;

          this.numberOfAcesForPlayer -= 1;
        }

        this.playerSum += playerValue;
      },

      /**
       * @param {number} value
       * @return {void}
       */
      setDealerCardsValue (value) {
        let dealerValue = value;

        if (this.dealerSum + dealerValue > 21 && this.numberOfAcesForDealer > 0) {
          dealerValue = 1;

          this.numberOfAcesForDealer -= 1;
        }

        this.dealerSum += dealerValue;
      },

      /**
       * @return {void}
       */
      hit () {
        const playerCard = this.getCard();

        this.setPlayerCardsValue(this.getCardValue(playerCard, 'player'));

        this.playerHand.push(playerCard);

        if (this.playerSum >= 21) {
          this.isGameCompleted = true;

          this.resetTheGame();
        }
      },

      /**
       * @return {void}
       */
      stand () {
        const dealerCard = this.getCard();

        while (this.dealerSum < 17) {
          this.setDealerCardsValue(this.getCardValue(dealerCard, 'dealer'));

          this.dealerHand.push(dealerCard);
        }

        this.isGameCompleted = true;

        this.resetTheGame();
      },

      /**
       * @return {void}
       */
      async resetTheGame () {
        this.countDownValue = parseInt(this.query.delay);

        if (this.deck.length < 20) {
          await this.fetchDeck();
        }

        await this.saveResults();

        setTimeout(() => {
          this.playAgain();
        }, this.query.delay * 1000);
      },

      /**
       * @return {void}
       */
      playAgain () {
        this.playerHand = [];
        this.playerSum = 0;
        this.dealerHand = [];
        this.dealerSum = 0;
        this.numberOfAcesForPlayer = 0;
        this.numberOfAcesForDealer = 0;
        this.isGameCompleted = false;

        this.dealCards();
      },

      /**
       * @return {void}
       */
      async saveResults () {
        await axios.post('/scores/save', {
          playerHand: this.playerHand,
          dealerHand: this.dealerHand,
          gameResult: this.getResult.split('!')[0]
        });

        await this.setScoresData();
      },

      /**
       * @return {void}
       */
      async setScoresData () {
        const { data: { scores } } = await axios.get('/scores/get');

        this.scoresData = scores;
      },

      /**
       * @return {void}
       */
      showScores () {
        this.scoresModalStatus = !this.scoresModalStatus;
      }
    }
  }
</script>

<style>
  .summary-container {
    float: right;
    margin-right: 20px;
  }
  .scores-button {
    float: right;
    margin-right: 20px;
  }
</style>
