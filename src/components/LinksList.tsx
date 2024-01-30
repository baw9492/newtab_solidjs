import { For, Setter, Show } from 'solid-js'
import { links } from '../store/links'
import { selectedId } from '../store/selectedId'
import { show_menu } from '../store/windows'
import col from '../store/col'

export default (props: {
  setPosition: Setter<{
    x: number
    y: number
  }>
}) => {
  return (
    <div
      class="grid gap-[5px]"
      style={`grid-template-columns: repeat(${col.value}, 1fr);`}>
      <For each={links.value}>
        {(v) => (
          <a
            href={v.linkUrl}
            oncontextmenu={(e) => {
              props.setPosition({ x: e.clientX, y: e.clientY })
              e.preventDefault()
              e.stopPropagation()
              selectedId.set(v.id)
              show_menu.show()
            }}
            class={`bg-[#353535] w-[100px] h-[100px] rounded flex justify-center items-center ${
              selectedId.value === v.id
                ? 'border-[#D7D7D7] border-[2.5px] hover:border-[#D7D7D7]'
                : 'hover:border-[2.5px] hover:border-[#9A9A9A]'
            }`}>
            <Show when={v.iconBase64}>
              <img
                class="w-12 h-12 rounded-md object-contain"
                src={v.iconBase64}
                alt=""
              />
            </Show>
          </a>
        )}
      </For>
    </div>
  )
}
