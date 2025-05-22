const jokeElement = document.getElementById('joke');
const memeElement = document.getElementById('meme');
const button = document.getElementById('getJoke');

// Async function to fetch joke and meme
async function getJoke() {
  // Show "Loading..." message
  jokeElement.textContent = 'Loading...';
  memeElement.src = ''; // Clear the previous meme

  try {
    // Fetch random joke
    const jokeResponse = await fetch('https://official-joke-api.appspot.com/random_joke');
    if (!jokeResponse.ok) {
      throw new Error('Failed to fetch joke');
    }
    const jokeData = await jokeResponse.json();
    const joke = `${jokeData.setup} — ${jokeData.punchline}`;
    jokeElement.textContent = joke;

    // Fetch random meme
    const memeResponse = await fetch('https://api.imgflip.com/get_memes');
    if (!memeResponse.ok) {
      throw new Error('Failed to fetch meme');
    }
    const memeData = await memeResponse.json();
    const randomMeme = memeData.data.memes[Math.floor(Math.random() * memeData.data.memes.length)];
    memeElement.src = randomMeme.url; // Set the meme image
  } catch (error) {
    console.error('Error:', error);
    jokeElement.textContent = "Couldn't load a joke or meme. Please try again.";
  }
}
