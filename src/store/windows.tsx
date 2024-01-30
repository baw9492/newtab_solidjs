import { createSignal } from 'solid-js'

export const show_menu = createWindowsState()
export const show_settings = createWindowsState()
export const show_linkediter = createWindowsState()

function createWindowsState() {
  const [v, s] = createSignal(false)
  return {
    get isShow() {
      return v()
    },
    show: () => s(true),
    hide: () => s(false),
  }
}
