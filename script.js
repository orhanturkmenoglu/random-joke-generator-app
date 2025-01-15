// DOM Elementlerini Seç
const jokeContainer = document.querySelector("#joke");
const btn = document.querySelector("#btn");
const languageSelector = document.querySelector("#language");

const emojiContainer = document.querySelector("span"); // Emoji için kullanılan span

// Espri API'sinden veri alma işlevi
const fetchJoke = (language) => {
  const url = `https://v2.jokeapi.dev/joke/Any?lang=${language}&blacklistFlags=religious,political,racist&type=single`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch joke");
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error("Error fetching joke:", error);
      throw error;
    });
};

/// Emoji'yi Espri Türüne Göre Belirle
const getJokeEmoji = (jokeType) => {
  const emojis = {
    Programming: "💻", // Programlama türü için emoji
    Miscellaneous: "🎭", // Çeşitli espriler için emoji
    Dark: "🌑", // Karanlık türde espri için emoji
    Any: "😂", // Genel espri türü için emoji
  };
  return emojis[jokeType] || "😂"; // Belirtilmeyen türler için varsayılan emoji
};

/// Espriyi ve Emojiyi Güncelle
const updateJoke = (language) => {
  fetchJoke(language)
    .then((data) => {
      const joke = data.joke || `${data.setup} ... ${data.delivery}`;
      const jokeType = data.category; // API'den gelen espri türü
      jokeContainer.innerHTML = joke;

      // Espri türüne göre emojiyi güncelle
      const emoji = getJokeEmoji(jokeType);
      emojiContainer.innerHTML = emoji;
    })
    .catch(() => {
      jokeContainer.textContent = "Failed to load a joke.";
      emojiContainer.innerHTML = "⚠️"; // Hata durumunda gösterilecek emoji
    });
};

// Butona Tıklama Olayı
btn.addEventListener("click", () => {
  const selectedLanguage = languageSelector.value;
  console.log(`Selected language: ${selectedLanguage}`);
  updateJoke(selectedLanguage);
});
