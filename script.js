gsap.registerPlugin(ScrollTrigger);

const pizza = "./assets/images/pizza.jpg";
const paneer = "./assets/images/paneer.jpg";
const salad = "./assets/images/salad.jpg";
const chocolateBrownie = "./assets/images/chocolateBrownie.jpg";

const data = [
  { id: 1, title: "Delicious Pizza", image: pizza, bg: "#FCFEFC" },
  { id: 2, title: "Fresh Salad", image: salad, bg: "#A9BD9E" },
  { id: 3, title: "Chocolate Brownie", image: chocolateBrownie, bg: "#B8AD58" },
  { id: 4, title: "Paneer Butter Masala", image: paneer, bg: "#5E995C" },
];

const container = document.getElementById("card-container");
data.forEach((item) => {
  const card = document.createElement("div");
  card.style.backgroundColor = "#f0f0f0";
  card.className =
    "flex flex-col justify-center items-center gap-4 p-6 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:scale-105";

  const imageContainer = document.createElement("div");
  imageContainer.style.backgroundImage = `url(${item.image})`;
  imageContainer.style.backgroundSize = "cover";
  imageContainer.style.backgroundPosition = "center";
  imageContainer.className = "h-48 md:h-96 w-full rounded-xl shadow-md";

  const title = document.createElement("h1");
  title.innerHTML = item.title;
  title.style.color = "#3f423f";
  title.className = "font-modak text-3xl md:text-5xl";

  const button = document.createElement("button");
  button.innerHTML = "COOK";
  button.style.backgroundColor = "#ff5100";
  button.style.color = "#FCFEFC";
  button.className =
    "h-10 px-6 rounded-lg font-inter drop-shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:scale-105";

  button.onclick = () => {
    window.location.href = `recipe.html?id=${item.id}`;
  };

  card.appendChild(imageContainer);
  card.appendChild(title);
  card.appendChild(button);
  container.appendChild(card);
});
gsap.utils.toArray("#card-container > div").forEach((card) => {
  gsap.from(card, {
    y: 30,
    opacity: 0,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
      end: "top 60%",
      scrub: true,
    },
  });
});
