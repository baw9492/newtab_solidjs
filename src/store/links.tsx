import { createSignal } from 'solid-js'
import { addData, deleteData, getAll, update } from '../tools/db'

function createLinkState() {
  const [v, s] = createSignal<link[]>([])
  ;(async () => {
    const _links = await getAll()
    console.log('初始化了links')
    s(_links)
  })()

  return {
    get value() {
      return v()
    },
    add: async (v: link[]) => {
      await addData(v)
      const newd = await getAll()
      s(newd)
    },
    delete: async (id: number) => {
      deleteData(id),
      s((oldv) => oldv.filter((v) => v.id !== id))
    },
    update: async (v: link) => {
      console.log(v)
      await update(v)
      const newd = await getAll()
      s(newd)
    },

  }
}

export const links = createLinkState()
