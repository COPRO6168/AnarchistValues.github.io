// SPDX-License-Identifier: GPL-3.0-or-later

var version = "Test Edition #1";

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return NaN;
}

function setBarValue(name, value) {
  innerel = document.getElementById(name);
  outerel = document.getElementById("bar-" + name);
  outerel.style.width = value + "%";
  innerel.innerHTML = value + "%";
  if (innerel.offsetWidth + 20 > outerel.offsetWidth) {
    innerel.style.visibility = "hidden";
  }
}

function setLabel(val, labels) {
  if (val < 0 || val > 100) return "";
  else if (val < 15) return labels.veryLow;
  else if (val < 30) return labels.moderatelyLow;
  else if (val < 45) return labels.slightlyLow;
  else if (val < 55) return labels.balanced;
  else if (val < 70) return labels.slightlyHigh;
  else if (val < 85) return labels.moderatelyHigh;
  else               return labels.veryHigh;
}

platform = getQueryVariable("unit");
dualism = getQueryVariable("spec");
coordination = getQueryVariable("fede");
materialism = getQueryVariable("phil");
dialectic = getQueryVariable("meth");
class_ = getQueryVariable("subj");
revolution = getQueryVariable("radi");
violence = getQueryVariable("mili");
activism = getQueryVariable("focu");
abolition = getQueryVariable("gend");
technology = getQueryVariable("prog");
central = getQueryVariable("stru");
synthesis = (100 - platform).toFixed(1);
unitary = (100 - dualism).toFixed(1);
autonomy = (100 - coordination).toFixed(1);
idealism = (100 - materialism).toFixed(1);
empirical = (100 - dialectic).toFixed(1);
identity = (100 - class_).toFixed(1);
reform = (100 - revolution).toFixed(1);
peaceful = (100 - violence).toFixed(1);
organizing = (100 - activism).toFixed(1);
equality = (100 - abolition).toFixed(1);
nature = (100 - technology).toFixed(1);
loose = (100 - central).toFixed(1);

setBarValue("platform", platform);
setBarValue("synthesis", synthesis);
setBarValue("dualism", dualism);
setBarValue("unitary", unitary);
setBarValue("coordination", coordination);
setBarValue("autonomy", autonomy);
setBarValue("materialism", materialism);
setBarValue("idealism", idealism);
setBarValue("dialectic", dialectic);
setBarValue("empirical", empirical);
setBarValue("class", class_);
setBarValue("identity", identity);
setBarValue("revolution", revolution);
setBarValue("reform", reform);
setBarValue("violence", violence);
setBarValue("peaceful", peaceful);
setBarValue("activism", activism);
setBarValue("organizing", organizing);
setBarValue("abolition", abolition);
setBarValue("equality", equality);
setBarValue("technology", technology);
setBarValue("nature", nature);
setBarValue("central", central);
setBarValue("loose", loose);

import("../../data/axis-labels.js").then(({ axisLabels }) => {
  document.getElementById("unity-label").innerHTML = setLabel(platform, axisLabels.unity);
  document.getElementById("specificity-label").innerHTML = setLabel(dualism, axisLabels.specificity);
  document.getElementById("federalism-label").innerHTML = setLabel(coordination, axisLabels.federalism);
  document.getElementById("philosophy-label").innerHTML = setLabel(materialism, axisLabels.philosophy);
  document.getElementById("methodology-label").innerHTML = setLabel(dialectic, axisLabels.methodology);
  document.getElementById("subject-label").innerHTML = setLabel(class_, axisLabels.subject);
  document.getElementById("radicalness-label").innerHTML = setLabel(revolution, axisLabels.radicalness);
  document.getElementById("militancy-label").innerHTML = setLabel(violence, axisLabels.militancy);
  document.getElementById("focus-label").innerHTML = setLabel(activism, axisLabels.focus);
  document.getElementById("genders-label").innerHTML = setLabel(abolition, axisLabels.genders);
  document.getElementById("progress-label").innerHTML = setLabel(technology, axisLabels.progress);
  document.getElementById("structure-label").innerHTML = setLabel(central, axisLabels.structure);
}).catch((error) => {
  console.error("Failed to load axis labels.", error);
});

ideology = "";
ideodist = Infinity;
for (var i = 0; i < ideologies.length; i++) {
  dist = 0;
  dist += Math.pow(Math.abs(ideologies[i].stats.unit - platform), 2);
  dist += Math.pow(Math.abs(ideologies[i].stats.spec - dualism), 2);
  dist += Math.pow(Math.abs(ideologies[i].stats.fede - coordination), 2);
  dist += Math.pow(Math.abs(ideologies[i].stats.phil - materialism), 2);
  dist += Math.pow(Math.abs(ideologies[i].stats.meth - dialectic), 2);
  dist += Math.pow(Math.abs(ideologies[i].stats.subj - class_), 2);
  dist += Math.pow(Math.abs(ideologies[i].stats.radi - revolution), 2);
  dist += Math.pow(Math.abs(ideologies[i].stats.mili - violence), 2);
  dist += Math.pow(Math.abs(ideologies[i].stats.focu - activism), 2);
  dist += Math.pow(Math.abs(ideologies[i].stats.gend - abolition), 2);
  dist += Math.pow(Math.abs(ideologies[i].stats.prog - technology), 2);
  dist += Math.pow(Math.abs(ideologies[i].stats.stru - central), 2);
  if (dist < ideodist) {
    ideology = ideologies[i].name;
    ideodist = dist;
  }
}
document.getElementById("ideology-label").innerHTML = ideology;

function createImage(src, x, y, w, h) {
  img = new Image();
  img.src = src;
  img.onLoad = function () {
    ctx.drawImage(img, x, y, w, h);
  };
}

window.onload = function () {
  const bannerImages = Array.from(document.querySelectorAll(".axis img"));
  Promise.all([
    import("../../data/axes.js"),
    Promise.all(
      bannerImages.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            }),
      ),
    ),
  ]).then(([{ axes }]) => {
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    c.width = 800;
    c.height = 1500;
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, 800, 1500);

    ctx.fillStyle = "#222222";
    ctx.font = "700 80px Montserrat";
    ctx.textAlign = "left";
    ctx.fillText("LOGO", 20, 90);
    ctx.font = "50px Montserrat";
    ctx.fillText(ideology, 20, 140);

    ctx.font = "300 30px Montserrat";
    ctx.fillText("AnarchistValues.github.io", 780, 60);
    ctx.fillText(version, 780, 90);

    ctx.font = "300 24px Montserrat";
    axes.forEach((axis, index) => {
      const y = 180 + index * 105;
      const leftScore = parseFloat(document.getElementById(axis.leftValueId).innerHTML) || 0;
      const rightScore = parseFloat(document.getElementById(axis.rightValueId).innerHTML) || 0;

      ctx.fillStyle = "#222222";
      ctx.fillRect(120, y, 560, 60);
      ctx.fillStyle = axis.leftColor;
      ctx.fillRect(120, y + 4, 5.6 * leftScore - 2, 52);
      ctx.fillStyle = axis.rightColor;
      ctx.fillRect(682 - 5.6 * rightScore, y + 4, 5.6 * rightScore - 2, 52);

      ctx.fillStyle = "#222222";
      ctx.textAlign = "center";
      ctx.fillText(axis.label, 400, y - 10);
      ctx.textAlign = "left";
      if (leftScore > 30) ctx.fillText(leftScore + "%", 130, y + 38);
      ctx.textAlign = "right";
      if (rightScore > 30) ctx.fillText(rightScore + "%", 670, y + 38);

      ctx.drawImage(document.getElementById("img-" + axis.leftValueId), 20, y - 20, 100, 100);
      ctx.drawImage(document.getElementById("img-" + axis.rightValueId), 680, y - 20, 100, 100);
    });

    document.getElementById("banner").src = c.toDataURL();
  }).catch((error) => {
    console.error("Failed to load axis data.", error);
  });
};
