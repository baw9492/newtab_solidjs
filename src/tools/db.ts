import { openDB } from 'idb'

async function _openDB() {
  return openDB('myDatabase', undefined, {
    upgrade(db) {
      db.createObjectStore('links', { keyPath: 'id', autoIncrement: true })
    },
  })
}

export async function getAll(): Promise<link[]> {
  const db = await _openDB()
  const store = db.transaction('links', 'readonly').objectStore('links')
  return store.getAll()
}

export async function update(nd: link) {
  const db = await _openDB()
  const store = db.transaction('links', 'readwrite').objectStore('links')
  await store.put(nd)
}

export async function deleteData(id: number) {
  const db = await _openDB()
  const store = db.transaction('links', 'readwrite').objectStore('links')
  store.delete(id)
}

export async function addData(data: link[]) {
  const db = await _openDB()
  const store = db.transaction('links', 'readwrite').objectStore('links')
  data.forEach((v) => {
    store.add({ iconBase64: v.iconBase64, linkUrl: v.linkUrl })
  })
}

export async function outFile() {
  const db = await _openDB()
  const links: link[] = await db
    .transaction('links', 'readwrite')
    .objectStore('links')
    .getAll()
  const outData = links.map((v) => ({
    iconBase64: v.iconBase64,
    linkUrl: v.linkUrl,
  }))

  const blob = new Blob([JSON.stringify(outData)], { type: 'text/plain' })
  const _a = document.createElement('a')
  const _url = URL.createObjectURL(blob)
  _a.href = _url
  _a.download = 'data.json'
  document.body.appendChild(_a)
  _a.click()
  document.body.removeChild(_a)
  URL.revokeObjectURL(_url)
}
