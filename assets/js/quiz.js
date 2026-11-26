// SPDX-License-Identifier: GPL-3.0-or-later

fetch("data/questions.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((questions) => {
    let maxUnit = 0;
    let maxSpec = 0;
    let maxFede = 0;
    let maxPhil = 0;
    let maxMeth = 0;
    let maxSubj = 0;
    let maxRadi = 0;
    let maxMili = 0;
    let maxFocu = 0;
    let maxGend = 0;
    let maxProg = 0;
    let maxStru = 0;
    const unitArray = new Array(questions.length);
    const specArray = new Array(questions.length);
    const fedeArray = new Array(questions.length);
    const philArray = new Array(questions.length);
    const methArray = new Array(questions.length);
    const subjArray = new Array(questions.length);
    const radiArray = new Array(questions.length);
    const miliArray = new Array(questions.length);
    const focuArray = new Array(questions.length);
    const gendArray = new Array(questions.length);
    const progArray = new Array(questions.length);
    const struArray = new Array(questions.length);
    let questionNumber = 0;

    for (const question of questions) {
      maxUnit += Math.abs(question.effect.unit);
      maxSpec += Math.abs(question.effect.spec);
      maxFede += Math.abs(question.effect.fede);
      maxPhil += Math.abs(question.effect.phil);
      maxMeth += Math.abs(question.effect.meth);
      maxSubj += Math.abs(question.effect.subj);
      maxRadi += Math.abs(question.effect.radi);
      maxMili += Math.abs(question.effect.mili);
      maxFocu += Math.abs(question.effect.focu);
      maxGend += Math.abs(question.effect.gend);
      maxProg += Math.abs(question.effect.prog);
      maxStru += Math.abs(question.effect.stru);
    }

    function initQuestion() {
      document.getElementById("question-text").innerHTML = questions[questionNumber].question;
      document.getElementById("question-number").innerHTML =
        "Question " + (questionNumber + 1) + " of " + questions.length;
      if (questionNumber == 0) {
        document.getElementById("back_button").style.display = "none";
        document.getElementById("back_button_off").style.display = "block";
      } else {
        document.getElementById("back_button").style.display = "block";
        document.getElementById("back_button_off").style.display = "none";
      }
    }

    function calcScore(score, max) {
      return max === 0 ? "50.0" : ((100 * (max + score)) / (2 * max)).toFixed(1);
    }

    function results() {
      const scores = [
        unitArray.reduce((a, b) => a + b, 0),
        specArray.reduce((a, b) => a + b, 0),
        fedeArray.reduce((a, b) => a + b, 0),
        philArray.reduce((a, b) => a + b, 0),
        methArray.reduce((a, b) => a + b, 0),
        subjArray.reduce((a, b) => a + b, 0),
        radiArray.reduce((a, b) => a + b, 0),
        miliArray.reduce((a, b) => a + b, 0),
        focuArray.reduce((a, b) => a + b, 0),
        gendArray.reduce((a, b) => a + b, 0),
        progArray.reduce((a, b) => a + b, 0),
        struArray.reduce((a, b) => a + b, 0),
      ];
      const maxima = [maxUnit, maxSpec, maxFede, maxPhil, maxMeth, maxSubj, maxRadi, maxMili, maxFocu, maxGend, maxProg, maxStru];
      const ids = ["unit", "spec", "fede", "phil", "meth", "subj", "radi", "mili", "focu", "gend", "prog", "stru"];
      const params = ids.map((id, index) => `${id}=${calcScore(scores[index], maxima[index])}`).join("&");
      location.href = `results.html?${params}`;
    }

    window.next_question = function (mult) {
      unitArray[questionNumber] = mult * questions[questionNumber].effect.unit;
      specArray[questionNumber] = mult * questions[questionNumber].effect.spec;
      fedeArray[questionNumber] = mult * questions[questionNumber].effect.fede;
      philArray[questionNumber] = mult * questions[questionNumber].effect.phil;
      methArray[questionNumber] = mult * questions[questionNumber].effect.meth;
      subjArray[questionNumber] = mult * questions[questionNumber].effect.subj;
      radiArray[questionNumber] = mult * questions[questionNumber].effect.radi;
      miliArray[questionNumber] = mult * questions[questionNumber].effect.mili;
      focuArray[questionNumber] = mult * questions[questionNumber].effect.focu;
      gendArray[questionNumber] = mult * questions[questionNumber].effect.gend;
      progArray[questionNumber] = mult * questions[questionNumber].effect.prog;
      struArray[questionNumber] = mult * questions[questionNumber].effect.stru;
      questionNumber++;
      if (questionNumber < questions.length) initQuestion();
      else results();
    };

    window.prev_question = function () {
      if (questionNumber == 0) return;
      questionNumber--;
      initQuestion();
    };

    initQuestion();
  })
  .catch((error) => {
    console.error("Failed to load questions.", error);
    document.getElementById("question-number").innerHTML = "Failed to load questions";
  });
