import col from '../store/col'
import { links } from '../store/links'
import { show_settings } from '../store/windows'
import { outFile } from '../tools/db'
export default () => {
  let input: HTMLInputElement | undefined

  async function daoru() {
    if (input!.files && input!.files[0]) {
      const file = input!.files[0]
      const _str = await file.text()
      const _parse = JSON.parse(_str)
      console.log(_parse)
      links.add(_parse)
      // $links.forEach((v) => {})
      show_settings.hide()
    }
  }

  return (
    <div class="fixed w-[600px] h-[400px] bg-[#4A4A4A] text-white">
      <button class="cursor-pointer hover:opacity-50" onclick={() => outFile()}>
        导出数据
      </button>
      <button
        class="cursor-pointer hover:opacity-50"
        onclick={() => input?.click()}>
        导入数据
      </button>
      <input
        ref={input}
        class="hidden"
        onchange={daoru}
        type="file"
        accept=".json"
      />
      <div>
        <label for="col">列数</label>
        <input
          id="col"
          type="number"
          class="text-black"
          value={col.value}
          onchange={(v) => {
            col.set(Number(v.currentTarget.value))
          }}
        />
      </div>
      <button
        class="absolute top-2 right-2 hover:opacity-50"
        onclick={() => {
          show_settings.hide()
        }}>
        close
      </button>
    </div>
  )
}
