import {html, render} from 'lit-html';

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: string;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

interface PhotoSearchAPIResult {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
  next_page: string;
}

async function fetchImagesFromAPI(searchTerm: string, perPage: number): Promise<PhotoSearchAPIResult> {
  const result = await fetch(
    `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=${perPage}`,
    {
      headers: {
        Authorization: PEXELS_API_KEY
      },
    }
  );

  const json = (await result.json()) as PhotoSearchAPIResult;
  return json;
}

fetchImagesFromAPI('dogs', 5).then((data) => {
  const htmlToRender = html`
    <h1>Results for "dogs"</h1>
    <ul>
      ${data.photos.map((photo) => {
        return html`<li><img src=${photo.src.small} /></li>`;
      })}
    </ul>
  `;

  const div = document.getElementById('app');
  if (!div) {
    throw new Error('could not find app div');
  }

  render(htmlToRender, div);
});
