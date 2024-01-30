import { createSignal } from 'solid-js'

export const selectedId = createState()
function createState() {
  const [v, s] = createSignal(-1)
  const [v2, s2] = createSignal(false)
  return {
    get value() {
      return v()
    },
    get isLock() {
      return v2()
    },
    set: (v: number) => s(v),
    reset: () => {
      s(-1)
      s2(false)
    },
    lock: () => s2(true),
  }
}
