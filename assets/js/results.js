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

unitArray = [
  "Platform",
  "Strongly Platform",
  "Platform",
  "Balanced",
  "Synthesis",
  "Strongly Synthesis",
  "Synthesis",
];
specArray = ["Dualism", "Strongly Dualist", "Dualist", "Balanced", "Unitary", "Strongly Unitary", "Unitary"];
fedeArray = [
  "Coordination",
  "Strongly Coordinating",
  "Coordinating",
  "Balanced",
  "Autonomy",
  "Strongly Autonomous",
  "Autonomy",
];
philArray = [
  "Materialism",
  "Strongly Materialist",
  "Materialist",
  "Balanced",
  "Idealism",
  "Strongly Idealist",
  "Idealism",
];
methArray = [
  "Dialectic",
  "Strongly Dialectical",
  "Dialectical",
  "Balanced",
  "Empirical",
  "Strongly Empirical",
  "Empirical",
];
subjArray = [
  "Class",
  "Strongly Class-Based",
  "Class-Based",
  "Balanced",
  "Identity",
  "Strongly Identity-Based",
  "Identity",
];
radiArray = [
  "Revolution",
  "Strongly Revolutionary",
  "Revolutionary",
  "Balanced",
  "Reform",
  "Strongly Reformist",
  "Reform",
];
miliArray = [
  "Violence",
  "Strongly Militant",
  "Militant",
  "Balanced",
  "Peaceful",
  "Strongly Peaceful",
  "Peaceful",
];
focuArray = [
  "Activism",
  "Strongly Activism-Focused",
  "Activism-Focused",
  "Balanced",
  "Organizing",
  "Strongly Organizing-Focused",
  "Organizing",
];
gendArray = [
  "Abolition",
  "Strongly Abolitionist",
  "Abolitionist",
  "Balanced",
  "Equality",
  "Strongly Egalitarian",
  "Equality",
];
progArray = [
  "Technology",
  "Strongly Technological",
  "Technological",
  "Balanced",
  "Nature",
  "Strongly Nature-Based",
  "Nature",
];
struArray = [
  "Central",
  "Strongly Central",
  "Centralized",
  "Balanced",
  "Loose",
  "Strongly Decentralized",
  "Loose",
];

function setLabel(val, ary) {
  if (val > 100) {
    return "";
  } else if (val > 90) {
    return ary[0];
  } else if (val > 75) {
    return ary[1];
  } else if (val > 60) {
    return ary[2];
  } else if (val >= 40) {
    return ary[3];
  } else if (val >= 25) {
    return ary[4];
  } else if (val >= 10) {
    return ary[5];
  } else if (val >= 0) {
    return ary[6];
  } else {
    return "";
  }
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

document.getElementById("unity-label").innerHTML = setLabel(platform, unitArray);
document.getElementById("specificity-label").innerHTML = setLabel(dualism, specArray);
document.getElementById("federalism-label").innerHTML = setLabel(coordination, fedeArray);
document.getElementById("philosophy-label").innerHTML = setLabel(materialism, philArray);
document.getElementById("methodology-label").innerHTML = setLabel(dialectic, methArray);
document.getElementById("subject-label").innerHTML = setLabel(class_, subjArray);
document.getElementById("radicalness-label").innerHTML = setLabel(revolution, radiArray);
document.getElementById("militancy-label").innerHTML = setLabel(violence, miliArray);
document.getElementById("focus-label").innerHTML = setLabel(activism, focuArray);
document.getElementById("genders-label").innerHTML = setLabel(abolition, gendArray);
document.getElementById("progress-label").innerHTML = setLabel(technology, progArray);
document.getElementById("structure-label").innerHTML = setLabel(central, struArray);

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
  Promise.all(
    bannerImages.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          }),
    ),
  ).then(() => {
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

    const axes = [
      ["Unity", "platform", "synthesis", "#CCFFAA", "#558800"],
      ["Specificity", "dualism", "unitary", "#AAFFAA", "#008800"],
      ["Federalism", "coordination", "autonomy", "#AAFFCC", "#008855"],
      ["Philosophy", "materialism", "idealism", "#AAFFFF", "#008888"],
      ["Methodology", "dialectic", "empirical", "#AACCFF", "#005588"],
      ["Subject", "class", "identity", "#AAAAFF", "#000088"],
      ["Radicalness", "revolution", "reform", "#CCAAFF", "#550088"],
      ["Militancy", "violence", "peaceful", "#FFAAFF", "#880088"],
      ["Focus", "activism", "organizing", "#FFAACC", "#880055"],
      ["Genders", "abolition", "equality", "#FFAAAA", "#880000"],
      ["Progress", "technology", "nature", "#FFCCAA", "#885500"],
      ["Structure", "central", "loose", "#FFFFAA", "#888800"],
    ];

    ctx.font = "300 24px Montserrat";
    axes.forEach((axis, index) => {
      const y = 180 + index * 105;
      const leftScore = parseFloat(document.getElementById(axis[1]).innerHTML) || 0;
      const rightScore = parseFloat(document.getElementById(axis[2]).innerHTML) || 0;

      ctx.fillStyle = "#222222";
      ctx.fillRect(120, y, 560, 60);
      ctx.fillStyle = axis[3];
      ctx.fillRect(120, y + 4, 5.6 * leftScore - 2, 52);
      ctx.fillStyle = axis[4];
      ctx.fillRect(682 - 5.6 * rightScore, y + 4, 5.6 * rightScore - 2, 52);

      ctx.fillStyle = "#222222";
      ctx.textAlign = "center";
      ctx.fillText(axis[0], 400, y - 10);
      ctx.textAlign = "left";
      if (leftScore > 30) ctx.fillText(leftScore + "%", 130, y + 38);
      ctx.textAlign = "right";
      if (rightScore > 30) ctx.fillText(rightScore + "%", 670, y + 38);

      ctx.drawImage(document.getElementById("img-" + axis[1]), 20, y - 20, 100, 100);
      ctx.drawImage(document.getElementById("img-" + axis[2]), 680, y - 20, 100, 100);
    });

    document.getElementById("banner").src = c.toDataURL();
  });
};
