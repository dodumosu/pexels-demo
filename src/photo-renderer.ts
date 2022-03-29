import { html } from 'lit-html';
import { Photo } from './pexels';

export function renderPhoto(
  photo: Photo,
  onLikeClick: (photoId: number) => void,
  photoIsLiked: boolean
) {
  return html`
    <li class="photo">
      <img src=${photo.src.small} />
      <button class="like" @click=${() => onLikeClick(photo.id)}>
        ${ photoIsLiked ? 'Dislike' :'Like'}
      </button>
    </li>`;
}
