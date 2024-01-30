import { createSignal } from 'solid-js'

function createColState() {
  const initv = localStorage.getItem('col') ?? 8
  const [v, s] = createSignal(Number(initv))
  return {
    get value() {
      return v()
    },
    set: (v: number) => {
      s(v)
      localStorage.setItem('col', String(v))
    },
  }
}

export default createColState()
