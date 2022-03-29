import {html, nothing, render} from 'lit-html';
import { fetchImagesFromAPI, fetchVideosFromAPI, isPhoto, Resource } from './pexels';
import { renderResource } from './photo-renderer';
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
    const videos = await fetchVideosFromAPI(query, 10);

    const photosAndVideos: Array<Resource> = [];
    for (let i = 0; i < results.photos.length; i++) {
      photosAndVideos.push(results.photos[i]);
      photosAndVideos.push(videos.videos[i]);
    }

    renderApp(photosAndVideos);
  }
}

function renderApp(results: readonly Resource[] | null): void {
  const div = document.getElementById('app');
  if (!div)
    throw new Error('could not find app div');

  const likedData = loadLikes() || {
    photos: [],
    videos: [],
  };

  function onUserLikeClick(resource: Resource): void {
    let arrayOfLikes: number[] = [];

    if (isPhoto(resource))
      arrayOfLikes = likedData.photos;
    else
      arrayOfLikes = likedData.videos

    const resourceIsLiked = arrayOfLikes.includes(resource.id);
    if (resourceIsLiked) {
      arrayOfLikes = arrayOfLikes.filter(id => id !== resource.id);
    } else {
      arrayOfLikes.push(resource.id);
    }

    if (isPhoto(resource))
      likedData.photos = arrayOfLikes;
    else
      likedData.videos = arrayOfLikes;

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
        ? results.map(resource => {
          const resourceIsLiked = isPhoto(resource)
            ? likedData.photos.includes(resource.id)
            : likedData.videos.includes(resource.id);

          return renderResource(resource, onUserLikeClick, resourceIsLiked);

        })
      : nothing}
    </ul>
  `;
  render(htmlToRender, div);
}

renderApp(null);
