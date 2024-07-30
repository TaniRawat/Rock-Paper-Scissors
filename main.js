const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image"),
  playAgainBtn = document.getElementById("play_again"),
  restartBtn = document.getElementById("restart"),
  userScoreEl = document.getElementById("user_score"),
  cpuScoreEl = document.getElementById("cpu_score");

let userScore = 0;
let cpuScore = 0;

// Function to generate CPU choice
function generateCpuChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
  return ["R", "P", "S"][randomNumber];
}

// Function to determine game outcome
function determineOutcome(userValue, cpuValue) {
  let outcomes = {
    RR: "Draw",
    RP: "Cpu",
    RS: "User",
    PP: "Draw",
    PR: "User",
    PS: "Cpu",
    SS: "Draw",
    SR: "Cpu",
    SP: "User",
  };
  return outcomes[userValue + cpuValue];
}

// Function to update scores
function updateScores(outcome) {
  if (outcome === "User") {
    userScore++;
    userScoreEl.textContent = userScore;
    result.textContent = "User Won!!";
  } else if (outcome === "Cpu") {
    cpuScore++;
    cpuScoreEl.textContent = cpuScore;
    result.textContent = "Cpu Won!!";
  } else {
    result.textContent = "Match Draw";
  }
}

// Function to reset game state
function resetGameState() {
  optionImages.forEach((image) => image.classList.remove("active"));
  userResult.src = cpuResult.src = "images/rock.png";
  result.textContent = "Let's Play!!";
  gameContainer.classList.remove("start");
}

// Function to handle user choice
function handleUserChoice(index) {
  let userValue = ["R", "P", "S"][index];
  let cpuValue = generateCpuChoice();
  let outcome = determineOutcome(userValue, cpuValue);
  updateScores(outcome);
  cpuResult.src = ["images/rock.png", "images/paper.png", "images/scissors.png"][["R", "P", "S"].indexOf(cpuValue)];
  userResult.src = ["images/rock.png", "images/paper.png", "images/scissors.png"][index];
}

// Event listeners for option images
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");
    userResult.src = cpuResult.src = "images/rock.png"; // Show rock image for animation
    result.textContent = "Wait...";
    optionImages.forEach((image2, index2) => {
      index !== index2 && image2.classList.remove("active");
    });
    gameContainer.classList.add("start");
    setTimeout(() => {
      gameContainer.classList.remove("start");
      handleUserChoice(index);
    }, 2500);
  });
});

// Event listeners for play again and restart buttons
playAgainBtn.addEventListener("click", resetGameState);
restartBtn.addEventListener("click", () => {
  userScore = 0;
  cpuScore = 0;
  userScoreEl.textContent = userScore;
  cpuScoreEl.textContent = cpuScore;
  resetGameState();
});
