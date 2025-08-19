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

  container.innerHTML = `
    <div class="bg-[#f2f2f2] p-6 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold mb-2 font-inter text-[#262915]">Ingredients</h2>
      <ul id="ingredients-list" class="list-none space-y-2 mb-4">
        ${recipe.ingredients
          .map(
            (item, i) => `
          <li class="flex items-center gap-2">
            <input type="checkbox" id="ingredient-${i}" class="w-5 h-5 accent-[#ff5100]" />
            <label for="ingredient-${i}" class="text-[#262915] font-inter">${item}</label>
          </li>`
          )
          .join("")}
      </ul>
      <h2 class="text-2xl font-bold mb-2 font-inter text-[#262915]">Steps</h2>
      <ol id="steps-list" class="list-decimal list-inside space-y-2">
        ${recipe.steps
          .map(
            (item, i) => `
          <li class="flex items-center gap-2">
            <input type="checkbox" id="step-${i}" class="w-5 h-5 accent-[#ff5100]" />
            <label for="step-${i}" class="text-[#262915] font-inter">${item}</label>
          </li>`
          )
          .join("")}
      </ol>
    </div>
  `;

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
  document.body.innerHTML = `<p class="text-center text-[#C64B3F] text-2xl mt-20">Recipe not found!</p>`;
}
