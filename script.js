const memes = [
  {
    cat: "relatable",
    emoji: "😭",
    title: "Me opening the fridge again",
    text: "Maybe new food spawned this time."
  },
  {
    cat: "school",
    emoji: "📚",
    title: "Teacher: this is easy",
    text: "The question: x = 8472???"
  },
  {
    cat: "gaming",
    emoji: "🎮",
    title: "One more game",
    text: "3 hours later: bro said one more."
  },
  {
    cat: "random",
    emoji: "🗿",
    title: "Bro really thought",
    text: "Confidence: 100%. Accuracy: 0%."
  },
  {
    cat: "relatable",
    emoji: "💀",
    title: "I should sleep",
    text: "Anyway, here's a 47-minute video."
  },
  {
    cat: "school",
    emoji: "🫠",
    title: "Group project",
    text: "One person works. Everyone gets the grade."
  },
  {
    cat: "gaming",
    emoji: "🔥",
    title: "Lag at the worst moment",
    text: "Ping: 999. Aim: nonexistent."
  },
  {
    cat: "random",
    emoji: "🐸",
    title: "The frog has arrived",
    text: "No explanation. Just vibes."
  }
];

const grid = document.querySelector("#grid");
const search = document.querySelector("#search");
const random = document.querySelector("#random");

let cat = "all";

function render() {
  const q = search.value.toLowerCase();

  const list = memes.filter(m =>
    (cat === "all" || m.cat === cat) &&
    (m.title + " " + m.text).toLowerCase().includes(q)
  );

  grid.innerHTML = list.map((m, i) => `
    <article class="card">
      <div class="pic">${m.emoji}</div>

      <div class="copy">
        <h3>${m.title}</h3>
        <p>${m.text}</p>

        <div class="actions">
          <button onclick="copyMeme(${i})">📋 Copy</button>
          <button onclick="shareMeme(${i})">↗ Share</button>
        </div>
      </div>
    </article>
  `).join("") || "<p>No memes found 😭</p>";
}

window.copyMeme = i => {
  navigator.clipboard?.writeText(
    memes[i].title + " — " + memes[i].text
  );

  alert("Copied 😭");
};

window.shareMeme = i => {
  if (navigator.share) {
    navigator.share({
      title: memes[i].title,
      text: memes[i].text
    });
  } else {
    copyMeme(i);
  }
};

document.querySelectorAll("nav button").forEach(button => {
  button.onclick = () => {
    document.querySelector("nav .active").classList.remove("active");
    button.classList.add("active");
    cat = button.dataset.cat;
    render();
  };
});

search.oninput = render;

random.onclick = () => {
  const m = memes[Math.floor(Math.random() * memes.length)];
  alert(m.emoji + " " + m.title + "\n\n" + m.text);
};

render();
