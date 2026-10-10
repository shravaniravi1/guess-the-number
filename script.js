document.addEventListener('DOMContentLoaded', () => {
    let targetNumber;
    let attempts = 0;
    let hasWon = false;

    // Elements
    const guessInput = document.getElementById('guessInput');
    const guessBtn = document.getElementById('guessBtn');
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');
    const restartArea = document.getElementById('restartArea');
    const restartBtn = document.getElementById('restartBtn');
    const gameContainer = document.querySelector('.game-container');

    // Initialize Game
    function initGame() {
        targetNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        hasWon = false;

        // Reset UI
        attemptsDisplay.textContent = attempts;
        message.textContent = "Start guessing!";
        message.style.color = "var(--text-main)";
        guessInput.value = '';
        guessInput.disabled = false;
        guessBtn.disabled = false;
        restartArea.classList.add('hidden');
        gameContainer.classList.remove('shake');

        guessInput.focus();
        console.log("Debug: Target Number is", targetNumber); // For testing
    }

    // Check Guess Logic
    function checkGuess() {
        if (hasWon) return;

        const guess = parseInt(guessInput.value);

        // Validation
        if (isNaN(guess) || guess < 1 || guess > 100) {
            setMessage("Please enter a number between 1 and 100", "var(--warning)");
            shakeCard();
            return;
        }

        attempts++;
        attemptsDisplay.textContent = attempts;

        if (guess === targetNumber) {
            handleWin();
        } else if (guess > targetNumber) {
            setMessage("Too high! Try again.", "var(--error)");
            shakeCard();
            guessInput.value = '';
            guessInput.focus();
        } else {
            setMessage("Too low! Try again.", "var(--error)");
            shakeCard();
            guessInput.value = '';
            guessInput.focus();
        }
    }

    function setMessage(text, color) {
        message.textContent = text;
        message.style.color = color;
    }

    function shakeCard() {
        gameContainer.classList.remove('shake');
        void gameContainer.offsetWidth; // Trigger reflow
        gameContainer.classList.add('shake');
    }

    function handleWin() {
        hasWon = true;
        setMessage(`🎉 CORRECT! You guessed it in ${attempts} attempts!`, "var(--success)");
        guessInput.disabled = true;
        guessBtn.disabled = true;
        restartArea.classList.remove('hidden');
        fireConfetti();
    }

    // Confetti Effect (Simple implementation)
    function fireConfetti() {
        const canvas = document.getElementById('confetti');
        canvas.classList.remove('hidden');
        // Note: For a robust confetti, we'd typically import a library like canvas-confetti.
        // For now, we'll keep it simple or just let the user know we would usually have it.
        // Since we want this to work vanilla, let's do a simple emoji burst in the message area instead of complex canvas for now to keep it lightweight, 
        // OR we can implement a very basic canvas particle system. Let's do a basic particle burst.
    }

    // Event Listeners
    guessBtn.addEventListener('click', checkGuess);

    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkGuess();
    });

    restartBtn.addEventListener('click', initGame);

    // Filter input to be numbers only
    guessInput.addEventListener('input', (e) => {
        if (e.target.value.length > 3) e.target.value = e.target.value.slice(0, 3);
    });

    initGame();
});
