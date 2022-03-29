import { html } from 'lit-html';
import { isPhoto, Resource } from './pexels';

export function renderResource(
  resource: Resource,
  onLikeClick: (resource: Resource) => void,
  resourceIsLiked: boolean
) {
  const imageUrl = isPhoto(resource) ? resource.src.small : resource.image;

  return html`
    <li class="photo">
      <img src=${imageUrl} />
      <button class="like" @click=${() => onLikeClick(resource)}>
        ${ resourceIsLiked ? 'Dislike' :'Like'}
      </button>
    </li>`;
}
