const calculate = (min, max) => Math.floor(Math.random() * (max - min) + min);

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },

  computed: {
    monsterBar() {
      if (this.monsterHealth <= 0) return { width: '0%' };

      return { width: this.monsterHealth + '%' };
    },

    playerBar() {
      if (this.playerHealth <= 0) return { width: '0%' };

      return { width: this.playerHealth + '%' };
    },

    isCritAvailable() {
      return this.currentRound % 4 !== 0;
    },
  },

  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }
    },

    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
    },
  },

  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },

    attackMonster() {
      const damage = calculate(5, 12);

      this.monsterHealth -= damage;

      this.currentRound++;

      this.addLogMessage('player', 'attack', damage);

      this.attackPlayer();
    },

    attackPlayer() {
      const damage = calculate(8, 15);

      this.playerHealth -= damage;

      this.addLogMessage('monster', 'attack', damage);
    },

    criticalAttack() {
      const damage = calculate(12, 24);

      this.monsterHealth -= damage;

      this.currentRound++;

      this.addLogMessage('player', 'critical attack', damage);

      this.attackPlayer();
    },

    healPlayer() {
      const heal = calculate(12, 18);

      this.playerHealth + heal >= 100
        ? (this.playerHealth = 100)
        : (this.playerHealth += heal);

      this.currentRound++;

      this.addLogMessage('player', 'heal', heal);

      this.attackPlayer();
    },

    surrender() {
      this.winner = 'monster';
      this.logMessages = [];
    },

    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount('#game');
