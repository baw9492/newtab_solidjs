import { Show, createSignal } from 'solid-js'
import LinksList from './components/LinksList'
import Settings from './components/Settings'
import { show_linkediter, show_menu, show_settings } from './store/windows'
import Menu from './components/Menu'
import LinkEditer from './components/LinkEditer'
import { selectedId } from './store/selectedId'

function App() {
  const [position, setPosition] = createSignal({ x: 0, y: 0 })
  const action_contextmenu = (e: MouseEvent) => {
    e.preventDefault()
    show_menu.show()
    selectedId.reset()
    setPosition({ x: e.clientX, y: e.clientY })
  }
  const action_click = () => {
    show_menu.hide()
    if (!selectedId.isLock) selectedId.reset()
  }
  return (
    <div
      class="h-full flex justify-center items-center"
      oncontextmenu={action_contextmenu}
      onclick={action_click}>
      <LinksList setPosition={setPosition} />

      <Show when={show_settings.isShow}>
        <Settings />
      </Show>

      <Show when={show_menu.isShow}>
        <Menu position={position()} />
      </Show>

      <Show when={show_linkediter.isShow}>
        <LinkEditer />
      </Show>
    </div>
  )
}

export default App
