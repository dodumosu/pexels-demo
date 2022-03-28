import {html, nothing, render} from 'lit-html';

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

  const htmlToRender = html`
    <h1>Amazing Photo App</h1>

    <form id="search" @submit=${onFormSubmit}>
      <input type="text" name="search-query" placeholder="dogs" />
      <input type="submit" value="Search" />
    </form>
    <ul>
      ${results
        ? results.photos.map(photo => {
          return html`<li><img src=${photo.src.small} /></li>`;
        })
        : nothing
      }
    </ul>
  `;
  render(htmlToRender, div);
}

renderApp(null);
