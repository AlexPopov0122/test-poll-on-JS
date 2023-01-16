"use strict";

let button = document.querySelector("button");
let testQuestions = document.querySelectorAll(".testQuestions");

// Массив хранения ответов
let arrayAnswers = [];

// Добавляю в массив подмассивы исходя из колличества вопросов (в подмассивах хранятся индексы ответов)
testQuestions.forEach((elem, index) => {
  arrayAnswers.push([]);
});

button.addEventListener("click", checkInputs);

function checkInputs() {
  displayInputs("none");

  for (let i = 0; i < testQuestions.length; i++) {
    let inputs = testQuestions[i].querySelectorAll(".input");

    // Добавляю вновь отменченный пункт в массив ответов
    inputs.forEach((elem, index) => {
      if (elem.checked == true) {
        arrayAnswers[i].push(index);
      }
    });

    // Прокручиваю все инпуты одного вопроса и вывожу проценты ответов
    for (let j = 0; j < inputs.length; j++) {
      let right = 0;

      // Проверяю количество ответов на один из пунктов
      for (let k = 0; k < arrayAnswers[i].length; k++) {
        if (arrayAnswers[i][k] == j) {
          right += 1;
        }
      }

      // Вычисление процента для каждого пункта
      inputs[j].nextElementSibling.innerHTML =
        "(" + Math.round((right / arrayAnswers[i].length) * 100) + "%)";

      // Если процент отличен от нуля или NaN то выводим его спаном
      if ((right / arrayAnswers[i].length) * 100 > 0) {
        inputs[j].nextElementSibling.style.display = "inline";
      }
    }
  }
  checkOrTryAgain();
}

// Смена кнопки и следующая попытка
function TryAgain() {
  displayInputs("inline");
  clearInputs();
  checkOrTryAgain();
}

// Смена кнопки на показ результатов, либо на следующую попытку
function checkOrTryAgain() {
  if (button.innerHTML == "Check") {
    button.removeEventListener("click", checkInputs);
    button.addEventListener("click", TryAgain);
    button.innerHTML = "Try again";
  } else {
    button.removeEventListener("click", TryAgain);
    button.addEventListener("click", checkInputs);
    button.innerHTML = "Check";
  }
}

// Удаляем инпуты из основного потока документа или возвращаем
function displayInputs(display) {
  let inputs = document.querySelectorAll(".input");

  inputs.forEach((elem, index) => {
    inputs[index].style.display = display;
  });
}

// Очищаем инпуты при переходе на следующую попытку
function clearInputs() {
  let inputs = document.querySelectorAll(".input");
  inputs.forEach((elem, index) => {
    inputs[index].checked = false;
    inputs[index].nextElementSibling.style.display = "none";
  });

  let ownAnswer = document.querySelectorAll(".ownAnswer");
  ownAnswer.forEach((elem, index) => {
    ownAnswer[index].value = "";
  });
}