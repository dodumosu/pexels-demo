import { html } from 'lit-html';
import { Photo, Video } from './pexels';

export function renderPhoto(
  photo: Photo,
  onLikeClick: (photo: Photo) => void,
  photoIsLiked: boolean
) {
  return html`
    <li class="photo">
      <img src=${photo.src.small} />
      <button class="like" @click=${() => onLikeClick(photo)}>
        ${ photoIsLiked ? 'Dislike' :'Like'}
      </button>
    </li>`;
}

export function renderVideo(
  video: Video,
  onLikeClick: (video: Video) => void,
  videoIsLiked: boolean
) {
  return html`
    <li class="photo">
      <img src=${video.image} />
      <button class="like" @click=${() => onLikeClick(video)}>
        ${ videoIsLiked ? 'Dislike' :'Like'}
      </button>
    </li>`;
}
