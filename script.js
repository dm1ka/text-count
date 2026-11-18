const textInput = document.querySelector("#text-input");
const clearButton = document.querySelector("#clear-button");
const characterCount = document.querySelector("#character-count");
const wordCount = document.querySelector("#word-count");
const wordProgress = document.querySelector("#word-progress");
const goalStatus = document.querySelector("#goal-status");
const goalInput = document.querySelector("#word-goal");

function updateCharacterCount() {
    const characters = textInput.value.match(/[\p{L}\p{N}]/gu);

    if (characters === null) {
        characterCount.textContent = 0;
    } else {
        characterCount.textContent = characters.length;
    }
}

function updateWordCount() {
    const minimumWords = Number(goalInput.value);
    const parts = textInput.value.split(/\s+/);

    const words = parts.filter(function (part) {
        return /[\p{L}\p{N}]/u.test(part);
    });

    wordCount.textContent = words.length;
    const validGoal = Number.isInteger(minimumWords) && minimumWords >= 1;

    if (validGoal === true) {
        wordProgress.hidden = false;
        wordProgress.max = minimumWords;
        wordProgress.value = words.length;
    } else {
        wordProgress.hidden = true;
    }
    if (goalInput.value === "" || minimumWords === 0) {
        goalStatus.textContent = "";
    } else if (validGoal === false) {
        goalStatus.textContent = "Enter a whole number greater than 0.";
    } else if (words.length >= minimumWords) {
        goalStatus.textContent = "Goal reached!";
    } else {
        const remainingWords = minimumWords - words.length;
        goalStatus.textContent = `Words to go: ${remainingWords}`;
    }
}

textInput.addEventListener("input", function() {
    updateCharacterCount();
    updateWordCount();
});

clearButton.addEventListener("click", function() {
    textInput.value = "";
    updateCharacterCount();
    updateWordCount();
    textInput.focus();
});

goalInput.addEventListener("input", function() {
    updateWordCount();
})

updateWordCount();