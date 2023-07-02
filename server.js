const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Set EJS as the template engine

app.use(
  sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'src/scss'),
    dest: path.join(__dirname, 'public/css'),
    outputStyle: 'compressed', // Compress the generated CSS
    prefix: '/css', // Where prefix is at <link rel="stylesheet" href="prefix/style.css"/>
    debug: true,
    mime: 'text/css', // Specify the correct MIME type for CSS files
  })
);

// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index'); // Render the form template
});



function calculateRizzScore(age, income, height, weight, physique) {
  const ageDifference = Math.abs(age - 30);
  const ageScore = Math.max(0, 100 - ageDifference); // The closer to 30, the higher the score

  const incomeNormalized = (income - 5000) / (200000 - 5000); // Normalize income between 0 and 1
  const incomeScore = incomeNormalized * 100;

  const heightNormalized = (height - 150) / (220 - 150);
  const heightScore = heightNormalized * 100; // Normalize height between 0 and 100

  const weightDifference = Math.abs(weight - 85);
  const weightScore = Math.max(0, 100 - weightDifference); // The closer to 85, the higher the score

  const physiqueScore = physique * 25; // Convert physique rating to a score out of 100

  // Combine the scores with weights to get the overall worthiness score
  const rizz = Math.round(
    (ageScore * 0.2 +
    incomeScore * 0.3 +
    heightScore * 0.1 +
    weightScore * 0.2 +
    physiqueScore * 0.2) * 100) / 100;;

  // round rizz to 2 decimal places

  return rizz;
}

const mehRizzMessages = [
  "You're meh",
  "Ayoooooo you from detroit?",
  "Do you even rizz bro?",
  "McDonalds is hiring",
  "Your mom is a nice lady but you look like a bum",
  "Ehhh sign up for the gym bro",
  "Whats the difference between you and a potato? Potatoes are healthy",
  "Stop eating so much",
  "LMAO",
  "Get your ass up man",
];

const okRizzMessages = [
  "Okaaayy",
  "You're okay",
  "Gotty work on your rizz bro",
  "You're alright",
  "Keep it up man",
  "You're not bad",
  "You're definitely not good",
];

const wowRizzMessages = [
  "Maaan you're good",
  "You studied rizz huh?",
  "You're a real rizz master",
  "Man whatch out the ladies are gonna be all over you",
  "Huuuuuuu you hot!",
  "Where have you learned to rizz like that?",
  "Sheeesh",
  "You're nailing it",
  "Cutie alert!"
];

const gigaChadRizzMessages = [
  "You're a champ",
  "You're a real champ",
  "Damn bro you're a real chad",
  "Are you the giga chad?",
  "You're a real giga chad",
  "Winner winner chicken dinner",
  "Can I visit your house?",
  "Knock knock, who's there? It's the giga chad!",
  "FBI OPEN UP!",
];

function getRandomMessage(messagesArray) {
  const randomIndex = Math.floor(Math.random() * messagesArray.length);
  return messagesArray[randomIndex];
}

function rizzMessage(rizz) {
  if (rizz < 50) {
    return getRandomMessage(mehRizzMessages);
  } else if (rizz < 75) {
    return getRandomMessage(okRizzMessages);
  } else if (rizz < 90) {
    return getRandomMessage(wowRizzMessages);
  } else {
    return getRandomMessage(gigaChadRizzMessages);
  }
}


app.post('/result', (req, res) => {
  const { age, weight, height, physique, income } = req.body;

  let rizz = calculateRizzScore(age, income, height, weight, physique);

//  console.log(rizz);

  const message = rizzMessage(rizz);

  const dummyData = {
    rizz,
    message,
  };

  res.render('result', dummyData); // Render the result template with dummy data
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


