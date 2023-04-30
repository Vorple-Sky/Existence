function generateSentence() {
    const nouns = [
      document.getElementById("noun1").value,
      document.getElementById("noun2").value,
      document.getElementById("noun3").value,
      document.getElementById("noun4").value,
      document.getElementById("noun5").value,
    ];
  
    const adjectives = [
      "red",
      "blue",
      "green",
      "happy",
      "sad",
      "angry",
      "silly",
      "serious",
      "playful",
      "curious",
      "hot",
      "annoyed"
    ];
  
    const verbs = [
      "ran",
      "jumped",
      "ate",
      "slept",
      "cooked",
      "laughed",
      "cried",
      "danced",
      "sang",
      "talked",
      "listened"
    ];
  
    const randomNoun1 = nouns[Math.floor(Math.random() * nouns.length)];
    const randomAdjective1 = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomVerb1 = verbs[Math.floor(Math.random() * verbs.length)];
    const randomNoun2 = nouns[Math.floor(Math.random() * nouns.length)];
    const randomAdjective2 = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomVerb2 = verbs[Math.floor(Math.random() * verbs.length)];

    const sentence = `The ${randomAdjective1} ${randomNoun1} ${randomVerb1} and ${randomAdjective2} ${randomNoun2} ${randomVerb2}.`;
  
    document.getElementById("sentence").textContent = sentence;
  }
  