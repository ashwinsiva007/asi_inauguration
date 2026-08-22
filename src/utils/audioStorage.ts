// IndexedDB helper for persisting uploaded ceremonial audio tracks across refreshes

const DB_NAME = 'ASICeremonyAudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'audioTracks';

export interface StoredTrackInfo {
  key: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  blob: Blob;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveAudioTrack(key: string, file: File): Promise<StoredTrackInfo> {
  const db = await openDB();
  const info: StoredTrackInfo = {
    key,
    name: file.name,
    size: file.size,
    type: file.type,
    uploadedAt: new Date().toISOString(),
    blob: file,
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(info);
    req.onsuccess = () => resolve(info);
    req.onerror = () => reject(req.error);
  });
}

export async function getAudioTrack(key: string): Promise<StoredTrackInfo | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not read from IndexedDB:', err);
    return null;
  }
}

export async function deleteAudioTrack(key: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
