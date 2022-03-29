import {html, nothing, render} from 'lit-html';
import { fetchImagesFromAPI, PhotoSearchAPIResult } from './pexels';
import { renderPhoto } from './photo-renderer';
import { loadLikes, saveLikes } from './storage';
import './style.css';


async function onFormSubmit(event: SubmitEvent) {
  event.preventDefault();
  if (!event.target)
    return;

  const formData = new FormData(event.target as HTMLFormElement);
  const query = formData.get('search-query');
  if (query && typeof query === 'string') {
    const results = await fetchImagesFromAPI(query, 10);
    renderApp(results);
  }
}

function renderApp(results: PhotoSearchAPIResult | null): void {
  const div = document.getElementById('app');
  if (!div)
    throw new Error('could not find app div');

  const likedData = loadLikes() || {
    photos: [],
    videos: [],
  };

  function onUserLikeClick(photoId: number): void {
    const photoIsLiked = likedData.photos.includes(photoId);
    if (photoIsLiked) {
      likedData.photos = likedData.photos.filter(id => id !== photoId);
    } else {
      likedData.photos.push(photoId);
    }
    saveLikes(likedData);
    renderApp(results);
  }

  const htmlToRender = html`
    <h1>Amazing Photo App</h1>

    <form id="search" @submit=${onFormSubmit}>
      <input type="text" name="search-query" placeholder="dogs" />
      <input type="submit" value="Search" />
    </form>
    <ul>
      ${results
        ? results.photos.map(photo => {
          const photoIsLiked = likedData.photos.includes(photo.id);
          return renderPhoto(photo, onUserLikeClick, photoIsLiked);
        })
        : nothing
      }
    </ul>
  `;
  render(htmlToRender, div);
}

renderApp(null);
