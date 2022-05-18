// USE WITH FIREBASE AUTH
// import checkLoginStatus from './helpers/auth';
import axios from 'axios';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';

const renderToDom = (divID, textToRender) => {
  const selectedDiv = document.querySelector(divID);
  selectedDiv.innerHTML = textToRender;
};

const renderForm = () => {
  const domString = `
  <form id="text-search-form">
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Enter Name of Artist</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Enter Name of Song</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <button type="submit">Submit</button>
  </form>
  <div id="lyricsRender"></div>
  `;
  renderToDom('#app', domString);
};

const renderLyrics = (artist, song, response) => {
  const domString = `
    <div class="card">
      <div class="card-header">
        ${song}
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>${response.lyrics}</p>
          <footer class="blockquote-footer">${artist} <cite title="Source Title">${song}</cite></footer>
        </blockquote>
      </div>
    </div>
      `;
  renderToDom('#lyricsRender', domString);
};

const getLyrics = (artist, song) => new Promise((resolve, reject) => {
  axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const lyricsOnDom = (artist, song) => {
  getLyrics(artist, song).then((response) => {
    // document.querySelector('#app').innerHTML = response.lyrics;
    renderLyrics(artist, song, response);
  });
};

const eventListener = () => {
  const formSelector = document.querySelector('#text-search-form');
  formSelector.addEventListener('submit', (e) => {
    e.preventDefault();
    const artist = e.target[0].value;
    const song = e.target[1].value;
    lyricsOnDom(artist, song);
  });
};

const startApp = () => {
  renderForm();
  eventListener();
};

startApp();
