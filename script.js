const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
  {
    album: "Bridge over Troubled Water",
    emblem: "In music find your peace.",
    "bg-color": ["#0396FF", "#0D1827"],
    "accent-color": "#0396FF",
    url: "https://songstoriesmatter.com/wp-content/uploads/2023/02/Simon_and_Garfunkel_1968-edited-1024x1024.jpg",
    spotify:
      "https://open.spotify.com/embed/track/6l8EbYRtQMgKOyc1gcDHF9?utm_source=generator",
  },
  {
    album: "The Boxer",
    emblem: "In music find your peace.",
    "bg-color": ["#3df5a7", "#0D1827"],
    "accent-color": "#3df5a7",
    url: "https://faroutmagazine.co.uk/static/uploads/1/2023/04/Simon-and-Garfunkel-folk-Far-Out-Magazine.jpg",
    spotify:
      "https://open.spotify.com/embed/track/76TZCvJ8GitQ2FA1q5dKu0?utm_source=generator",
  },
  {
    album: "Homeward Bound",
    emblem: "In music find your peace.",
    "bg-color": ["#727272", "#0D1827"],
    "accent-color": "#727272",
    url: "https://www.rollingstone.com/wp-content/uploads/2020/01/simon-and-garfunkel.jpg",
    spotify:
      "https://open.spotify.com/embed/track/4Xl2PrS3DJqqSKXCo6Uhv9?utm_source=generator",
  },
  {
    album: "El Condor Pasa (If I Could)",
    emblem: "In music find your peace.",
    "bg-color": ["#f687ff", "#0D1827"],
    "accent-color": "#f687ff",
    url: "https://www.grunge.com/img/gallery/the-story-behind-simon-garfunkels-concert-at-central-park/l-intro-1650650781.jpg",
    spotify:
      "https://open.spotify.com/embed/track/1eN42Q7IWRzRBq8eW2Y2TE?utm_source=generator",
  },
];

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
  heroDiv.classList.remove("album-transition");
  document.addEventListener("keydown", handleKeyScroll);
  scrollLeft.disabled = false;
  scrollRight.disabled = false;
  scrollLeft.classList.remove("key-press-hover-left");
  scrollRight.classList.remove("key-press-hover-right");

  for (const text of texts) text.classList.add("show-texts");
});

const handleClickScroll = (val) => {
  if (index + val >= 0 && index + val < albums.length) {
    updateDisplay((index += val));
  }
};

const handleKeyScroll = (e) => {
  if (e.key == "ArrowLeft") {
    scrollLeft.classList.add("key-press-hover-left");
    handleClickScroll(-1);
  }
  if (e.key == "ArrowRight") {
    scrollRight.classList.add("key-press-hover-right");
    handleClickScroll(1);
  }
};
let index = 0;

const updateDisplay = (index) => {
  let DELIMITER = "";

  const album = albums[index];

  for (const text of texts) text.classList.remove("show-texts");
  emblemDiv.innerHTML = "";
  scrollLeft.disabled = true;
  scrollRight.disabled = true;
  document.removeEventListener("keydown", handleKeyScroll);

  sectionContainer.id = `hero-${album.album.toLowerCase().replace(" ", "-")}`;
  bodyContainer.style.background = `linear-gradient(180deg, ${album["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
  heroDiv.style.backgroundImage = `url(${album.url})`;
  albumTitleSpan.textContent = album.album;
  spotifyWidget.src = album.spotify;

  const number = index + 1;
  albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
  albumNum.style.color = album["accent-color"];

  if (index === 3) scrollRight.classList.add("hide-arrow");
  else scrollRight.classList.remove("hide-arrow");

  createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
    emblemDiv.append(node)
  );

  heroDiv.classList.add("album-transition");
};

const createEmblem = (string, delimiter = "•") => {
  const spans = [];

  string = string.trim().replaceAll(" ", delimiter) + delimiter;
  const numChars = string.length;
  const degVal = 90 / (numChars / 4);

  string.split("").forEach((char, idx) => {
    const span = document.createElement("span");
    span.innerText = char;
    span.style.transform = `rotate(${180 - degVal * idx}deg)`;
    if (char === delimiter) span.style.color = albums[index]["accent-color"];
    spans.push(span);
  });

  return spans;
};

updateDisplay(index);
