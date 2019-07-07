
require("./prepend.js");
const $for = require("for-next");
const BezierEasing = require("bezier-easing");

(function(){

  const $ = query => Array.from(document.querySelectorAll(query));

  const spinner = {
    element: {
      btn: $(".js--spin")[0],
      diff: $(".js--diff"),
      container: $(".js--spinner")[0]
    },
    isSpinning: false,
    minChallenges: 10,
    interval: 150,
    ease: BezierEasing(.66,.28,.99,.4),
    levels: [{
      color: "green",
      char: "!"
    }, {
      color: "yellow",
      char: "!!"
    }, {
      color: "red",
      char: "!!!"
    }, {
      color: "purple",
      char: "!?!"
    }],
    getDifficultySettings(){
      return this.element.diff
        .filter(element => element.checked)
        .map(element => parseInt(element.dataset.level))
      ;
    },
    getChallenges(minChallenges = this.minChallenges){
      const diffSettings = this.getDifficultySettings();
      const targetChallenges = []
      const filteredChallenges = window["programming challenges v4.0"]
        .filter(challenge => diffSettings.indexOf(challenge.level) !== -1)
      ;
      for(let i = 0; i < minChallenges; i++){
        targetChallenges.push(
          filteredChallenges[Math.floor(Math.random() * filteredChallenges.length)]
        );
      }
      return targetChallenges;
    },
    createChallengeCards(minChallenges){
      const challenges = []
      this.getChallenges(minChallenges)
        .forEach(challenge => {
          const level = this.levels[challenge.level];
          const challengeElement = document.createElement("li");
          Object.assign(challengeElement, {
            className: `flex spinner__card border--radius margin--pxauto js--spinner-card border--${level.color}`,
            innerHTML: `
              <section class="flex__section margin--autopx">
                <span class="span span--large strict--center color--${level.color}">${level.char}</span>
              </section>
              <section class="flex__section flex--column margin--autopx">
                <h3 class="margin--autopx">${challenge.label}</h3>
                <small class="margin--autopx">${challenge.notes}</small>
              </section>
            `
          });
          challenges.push(challengeElement);
        })
      ;
      return challenges;
    },
    insertChallenges(amount){
      const challenges = spinner.createChallengeCards(amount);
      const length = challenges.length;
      for(let index = 0; index < length; index++){
        const easeInterval = (this.ease(index / length) * length) * this.interval;
        setTimeout(() => {
          this.element.container.prepend(challenges[index]);
          if(this.cards.length > 7) this.cards[this.cards.length - 1].remove();
        }, easeInterval)
      }
    },
    spin(){
      if(!this.isSpinning){
        this.insertChallenges(Math.floor(Math.random() * 100) + this.minChallenges);
      }
    },
    get cards(){
      return $(".js--spinner-card");
    },
    setPosition(index = Math.floor(this.cards.length / 2)){

      const cardHeight = this.cards[0].offsetHeight;
      // get card height
      console.log("Set position: ", index);

    }
  };

  spinner.element.btn.addEventListener("click", () => spinner.spin.call(spinner));
  spinner.insertChallenges(6);

})();



