"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const diceInput = document.getElementById("diceInput");
    const rollButton = document.getElementById("rollButton");
    const resultOutput = document.getElementById("result");
    const noAdvantage = document.getElementById("none")
    ,advantage = document.getElementById("advantage")
    ,disadvantage = document.getElementById("disadvantage");

    rollButton.addEventListener("click", function () {
        const inputText = diceInput.value.trim();

        if (inputText === "") {
            resultOutput.textContent = "Please enter a valid dice roll.";
            return;
        }

        // Регулярное выражение для сопоставления ввода кубика (например, "2d6+3")
        const regex = /^(\d+)d(\d+)([-+]\d+)?$/;

        if (!regex.test(inputText)) {
            resultOutput.textContent = "Invalid dice roll format. Use XdY±Z.";
            return;
        }

        const [, numDice, numSides, modifier] = inputText.match(regex);

        let total = 0;

        if(noAdvantage.checked){
            for (let i = 0; i < numDice; i++) {
                const roll = Math.floor(Math.random() * numSides) + 1;
                total += roll;
            }
        }else if(advantage.checked){
            let tempTotal1 = 0
            ,   tempTotal2 = 0;
            for (let i = 0; i < numDice; i++) {
                const roll = Math.floor(Math.random() * numSides) + 1;
                tempTotal1 += roll;
            }
            for (let i = 0; i < numDice; i++) {
                const roll = Math.floor(Math.random() * numSides) + 1;
                tempTotal2 += roll;
            }
            total = tempTotal1 > tempTotal2 ? tempTotal1 : tempTotal2;
        }else{
            let tempTotal1 = 0
            ,   tempTotal2 = 0;
            for (let i = 0; i < numDice; i++) {
                const roll = Math.floor(Math.random() * numSides) + 1;
                tempTotal1 += roll;
            }
            for (let i = 0; i < numDice; i++) {
                const roll = Math.floor(Math.random() * numSides) + 1;
                tempTotal2 += roll;
            }
            total = tempTotal1 < tempTotal2 ? tempTotal1 : tempTotal2;
        }
        if (modifier) {
            total += parseInt(modifier);
        }

        resultOutput.textContent = total >= 1 ? total : 1;
    });
});
