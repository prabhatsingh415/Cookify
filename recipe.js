const pizza = "./assets/images/pizza.jpg";
const paneer = "./assets/images/paneer.jpg";
const salad = "./assets/images/salad.jpg";
const chocolateBrownie = "./assets/images/chocolateBrownie.jpg";

const data = [
  {
    id: 1,
    title: "Delicious Pizza",
    image: pizza,
    ingredients: [
      "1 cup flour",
      "100g cheese",
      "Tomato sauce",
      "Toppings of choice",
    ],
    steps: [
      "Preheat the oven to 220°C.",
      "Roll out the dough and spread tomato sauce.",
      "Add cheese and toppings.",
      "Bake for 12-15 minutes.",
    ],
  },
  {
    id: 2,
    title: "Fresh Salad",
    image: salad,
    ingredients: [
      "Lettuce",
      "Tomatoes",
      "Cucumber",
      "Olive oil",
      "Lemon juice",
    ],
    steps: [
      "Wash and chop all vegetables.",
      "Mix them in a large bowl.",
      "Add olive oil and lemon juice.",
      "Toss gently and serve fresh.",
    ],
  },
  {
    id: 3,
    title: "Chocolate Brownie",
    image: chocolateBrownie,
    ingredients: [
      "200g chocolate",
      "100g butter",
      "150g sugar",
      "2 eggs",
      "50g flour",
    ],
    steps: [
      "Preheat oven to 180°C.",
      "Melt chocolate and butter together.",
      "Mix in sugar and eggs.",
      "Add flour and bake for 25 minutes.",
    ],
  },
  {
    id: 4,
    title: "Paneer Butter Masala",
    image: paneer,
    ingredients: ["200g paneer", "Butter", "Tomato puree", "Cream", "Spices"],
    steps: [
      "Cut paneer into cubes.",
      "Heat butter and sauté spices.",
      "Add tomato puree and simmer.",
      "Add paneer and cream, cook for 5 minutes, then serve hot.",
    ],
  },
];

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const recipe = data.find((item) => item.id === id);

const container = document.getElementById("recipe-container");
const title = document.getElementById("recipeTitle");
const image = document.getElementById("image-container");

// Back Button
const backButton = document.createElement("button");
backButton.innerHTML = "← Back";
backButton.style.backgroundColor = "#ff5100";
backButton.style.color = "#FCFEFC";
backButton.className =
  "h-8 w-24 mb-4 px-3 py-1 rounded font-inter text-sm hover:opacity-90 transition-opacity";
backButton.onclick = () => window.history.back();
document.getElementById("assest-container").prepend(backButton);

if (recipe) {
  title.innerHTML = recipe.title;
  image.style.backgroundImage = `url(${recipe.image})`;
  image.style.backgroundSize = "cover";
  image.style.backgroundPosition = "center";
  image.className = "h-48 md:h-96 w-full rounded-xl shadow-md";

  // Ingredients
  const ingredientsContainer = document.getElementById("ingredients-list");
  recipe.ingredients.forEach((item, i) => {
    const li = document.createElement("li");
    li.className = "flex items-center gap-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `ingredient-${i}`;
    checkbox.className = "w-5 h-5 accent-[#ff5100]";

    const label = document.createElement("label");
    label.htmlFor = `ingredient-${i}`;
    label.textContent = item;
    label.className = "text-[#262915] font-inter";

    li.appendChild(checkbox);
    li.appendChild(label);
    ingredientsContainer.appendChild(li);
  });

  // Steps with Timer
  const stepsContainer = document.getElementById("steps-list");
  const timerDisplay = document.getElementById("timer");

  let timer;
  let timeLeft = 0;
  let currentStep = 0;
  const stepTime = 60; // seconds per step

  recipe.steps.forEach((step, i) => {
    const li = document.createElement("li");
    li.className = "flex items-center gap-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `step-${i}`;
    checkbox.className = "w-5 h-5 accent-[#ff5100]";

    const label = document.createElement("label");
    label.htmlFor = `step-${i}`;
    label.textContent = step;
    label.className = "text-[#262915] font-inter";

    li.appendChild(checkbox);
    li.appendChild(label);
    stepsContainer.appendChild(li);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        if (i === currentStep) {
          startTimer();
          currentStep++;
        }
        updateProgress();
      }
    });
  });

  function startTimer() {
    clearInterval(timer);
    timeLeft = stepTime;
    updateTimerDisplay();

    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(timer);
        highlightFailedStep();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    timerDisplay.textContent = `⏱️ Time left: ${timeLeft}s`;
  }

  function highlightFailedStep() {
    const failedStep = document.querySelector(`#step-${currentStep}`);
    if (failedStep) {
      failedStep.parentElement.querySelector("label").style.color = "red";
    }
  }

  // Progress Bar
  const ingredientsCheckboxes = document.querySelectorAll(
    "#ingredients-list input"
  );
  const stepsCheckboxes = document.querySelectorAll("#steps-list input");
  const progressFill = document.getElementById("progressFill");

  function updateProgress() {
    const ingredientChecked = document.querySelectorAll(
      "#ingredients-list input:checked"
    ).length;
    const stepChecked = document.querySelectorAll(
      "#steps-list input:checked"
    ).length;
    const ingredientProgress =
      (ingredientChecked / ingredientsCheckboxes.length) * 30;
    const stepProgress = (stepChecked / stepsCheckboxes.length) * 70;
    progressFill.style.width = `${ingredientProgress + stepProgress}%`;
  }

  ingredientsCheckboxes.forEach((cb) =>
    cb.addEventListener("change", updateProgress)
  );
  stepsCheckboxes.forEach((cb) =>
    cb.addEventListener("change", updateProgress)
  );
} else {
  document.body.innerHTML = `
    <div class="flex flex-col items-center justify-center h-screen text-center">
      <div class="bg-[#1E1E1E] p-8 rounded-2xl shadow-lg max-w-md">
        <div class="text-6xl mb-4">🍳</div>
        <h2 class="text-3xl font-bold text-[#C64B3F] mb-2">Recipe Not Found</h2>
        <p class="text-[#f2f2f2] my-4">The recipe you’re looking for doesn’t exist or was removed.</p>
        <button 
          onclick="window.location.href='index.html'" 
          class="px-6 py-2 bg-[#ff5100] text-white rounded-xl hover:opacity-90 transition">
          🔙 Go Home
        </button>
      </div>
    </div>
  `;
}
