import './style.css';
import dynamicScore from './modules/scores.js';
import sound from './audio/scary.mp3';

const song = new Audio(sound);
const toggleMute = document.getElementById('toggle-mute');
let isMuted = true;
const originalURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const id = '49UE7WNSjc9vGKaTdRhI';
const refreshButton = document.getElementById('refresh');
const user = document.getElementById('user');
const score = document.getElementById('score');
const submitButton = document.getElementById('submit');
const scoreList = document.getElementById('board');

const sendData = async () => {
  const response = await fetch(`${originalURL}/games/${id}/scores/`, {
    method: 'POST',
    body: JSON.stringify({
      user: user.value,
      score: score.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const success = await response.json();
  return success;
};
submitButton.addEventListener('click', sendData);

const receiveData = async () => {
  const response = await fetch(`${originalURL}/games/${id}/scores/`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const gamerArray = await response.json();
  const actualArray = gamerArray.result;
  scoreList.innerHTML = '';
  actualArray.forEach((item) => { dynamicScore(item.user, item.score); });
  user.value = null;
  score.value = null;
};
refreshButton.addEventListener('click', receiveData);

toggleMute.addEventListener('click', () => {
  isMuted = !isMuted;
  toggleMute.style.filter = `invert(${isMuted * 1 + !isMuted * 0})`;
  song.muted = isMuted;
});

document.addEventListener('mousemove', () => {
  song.play();
});

window.addEventListener('load', () => { refreshButton.dispatchEvent(new Event('click')); song.loop = true; });