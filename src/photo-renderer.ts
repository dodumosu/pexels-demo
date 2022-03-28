import { html } from 'lit-html';
import { Photo } from './pexels';

export function renderPhoto(photo: Photo) {
  return html`<li><img src=${photo.src.small} /></li>`;
}
