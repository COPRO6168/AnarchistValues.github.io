// SPDX-License-Identifier: GPL-3.0-or-later

var max_unit = 0,
  max_spec = 0,
  max_fede = 0,
  max_phil = 0,
  max_meth = 0,
  max_subj = 0,
  max_radi = 0,
  max_mili = 0,
  max_focu = 0,
  max_gend = 0,
  max_prog = 0,
  max_stru = 0;
let unit_array = new Array(questions.length);
let spec_array = new Array(questions.length);
let fede_array = new Array(questions.length);
let phil_array = new Array(questions.length);
let meth_array = new Array(questions.length);
let subj_array = new Array(questions.length);
let radi_array = new Array(questions.length);
let mili_array = new Array(questions.length);
let focu_array = new Array(questions.length);
let gend_array = new Array(questions.length);
let prog_array = new Array(questions.length);
let stru_array = new Array(questions.length);
var qn = 0; // Question number
init_question();
for (var i = 0; i < questions.length; i++) {
  max_unit += Math.abs(questions[i].effect.unit);
  max_spec += Math.abs(questions[i].effect.spec);
  max_fede += Math.abs(questions[i].effect.fede);
  max_phil += Math.abs(questions[i].effect.phil);
  max_meth += Math.abs(questions[i].effect.meth);
  max_subj += Math.abs(questions[i].effect.subj);
  max_radi += Math.abs(questions[i].effect.radi);
  max_mili += Math.abs(questions[i].effect.mili);
  max_focu += Math.abs(questions[i].effect.focu);
  max_gend += Math.abs(questions[i].effect.gend);
  max_prog += Math.abs(questions[i].effect.prog);
  max_stru += Math.abs(questions[i].effect.stru);
}
function init_question() {
  document.getElementById("question-text").innerHTML = questions[qn].question;
  document.getElementById("question-number").innerHTML = "Question " + (qn + 1) + " of " + questions.length;
  if (qn == 0) {
    document.getElementById("back_button").style.display = "none";
    document.getElementById("back_button_off").style.display = "block";
  } else {
    document.getElementById("back_button").style.display = "block";
    document.getElementById("back_button_off").style.display = "none";
  }
}

function next_question(mult) {
  unit_array[qn] = mult * questions[qn].effect.unit;
  spec_array[qn] = mult * questions[qn].effect.spec;
  fede_array[qn] = mult * questions[qn].effect.fede;
  phil_array[qn] = mult * questions[qn].effect.phil;
  meth_array[qn] = mult * questions[qn].effect.meth;
  subj_array[qn] = mult * questions[qn].effect.subj;
  radi_array[qn] = mult * questions[qn].effect.radi;
  mili_array[qn] = mult * questions[qn].effect.mili;
  focu_array[qn] = mult * questions[qn].effect.focu;
  gend_array[qn] = mult * questions[qn].effect.gend;
  prog_array[qn] = mult * questions[qn].effect.prog;
  stru_array[qn] = mult * questions[qn].effect.stru;
  qn++;
  if (qn < questions.length) {
    init_question();
  } else {
    results();
  }
}

function prev_question() {
  if (qn == 0) {
    return;
  }
  qn--;
  init_question();
}

function calc_score(score, max) {
  if (max === 0) {
    return "50.0";
  }
  return ((100 * (max + score)) / (2 * max)).toFixed(1);
}

function results() {
  let final_unit = unit_array.reduce((a, b) => a + b, 0);
  let final_spec = spec_array.reduce((a, b) => a + b, 0);
  let final_fede = fede_array.reduce((a, b) => a + b, 0);
  let final_phil = phil_array.reduce((a, b) => a + b, 0);
  let final_meth = meth_array.reduce((a, b) => a + b, 0);
  let final_subj = subj_array.reduce((a, b) => a + b, 0);
  let final_radi = radi_array.reduce((a, b) => a + b, 0);
  let final_mili = mili_array.reduce((a, b) => a + b, 0);
  let final_focu = focu_array.reduce((a, b) => a + b, 0);
  let final_gend = gend_array.reduce((a, b) => a + b, 0);
  let final_prog = prog_array.reduce((a, b) => a + b, 0);
  let final_stru = stru_array.reduce((a, b) => a + b, 0);
  location.href =
    `results.html` +
    `?unit=${calc_score(final_unit, max_unit)}` +
    `&spec=${calc_score(final_spec, max_spec)}` +
    `&fede=${calc_score(final_fede, max_fede)}` +
    `&phil=${calc_score(final_phil, max_phil)}` +
    `&meth=${calc_score(final_meth, max_meth)}` +
    `&subj=${calc_score(final_subj, max_subj)}` +
    `&radi=${calc_score(final_radi, max_radi)}` +
    `&mili=${calc_score(final_mili, max_mili)}` +
    `&focu=${calc_score(final_focu, max_focu)}` +
    `&gend=${calc_score(final_gend, max_gend)}` +
    `&prog=${calc_score(final_prog, max_prog)}` +
    `&stru=${calc_score(final_stru, max_stru)}`;
}
