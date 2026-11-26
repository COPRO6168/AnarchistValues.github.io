// SPDX-License-Identifier: GPL-3.0-or-later

fetch("data/questions.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((questions) => {
    document.getElementById("numOfQuestions").innerHTML = questions.length;
  })
  .catch((error) => {
    console.error("Failed to load questions.", error);
  });
