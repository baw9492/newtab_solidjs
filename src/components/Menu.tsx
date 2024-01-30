import { For, Show } from 'solid-js'
import { links } from '../store/links'
import { selectedId } from '../store/selectedId'
import { show_linkediter, show_settings } from '../store/windows'

export default (props: { position: { x: number; y: number } }) => {
  const lob = () => (selectedId.value === -1 ? 'b' : 'l')
  const menuItems = [
    {
      title: '添加',
      type: 'b',
      fn: () => {
        show_linkediter.show()
      },
    },
    {
      title: '修改',
      type: 'l',
      fn: () => {
        show_linkediter.show()
        selectedId.lock()
      },
    },
    {
      title: '删除',
      type: 'l',
      fn: () => {
        links.delete(selectedId.value)
      },
    },
    {
      title: '设置',
      type: 'b',
      fn: () => {
        show_settings.show()
      },
    },
  ]

  return (
    <ul
      class="fixed bg-[#2B2B2B] text-[aliceblue] w-[100px] text-xs border border-black"
      style={`top: ${props.position.y}px;left: ${props.position.x}px;`}>
      <For each={menuItems}>
        {(item) => (
          <Show when={item.type === lob()}>
            <li
              class="p-2 text-center cursor-pointer hover:bg-[#404040]"
              onclick={item.fn}>
              {item.title}
            </li>
          </Show>
        )}
      </For>
    </ul>
  )
}
