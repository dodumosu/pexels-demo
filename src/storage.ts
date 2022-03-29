const LOCAL_STORAGE_KEY = '__PEXELS_LIKES__';

export function saveLikes(likes: StoredLikes): void {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(likes));
}

export function loadLikes(): StoredLikes | null {
  const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data)
    return null;

  return JSON.parse(data);
}

export enum LikedResource {
  Photo = 'PHOTO',
  Video = 'VIDEO',
}

interface StoredLike {
  id: number;
  resourceType: LikedResource;
}

type StoredLikes = StoredLike[];
