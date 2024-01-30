import { Show, createSignal, onMount } from 'solid-js'
import { show_linkediter } from '../store/windows'
import { links } from '../store/links'
import { selectedId } from '../store/selectedId'
import { compressImage } from '../tools/compressImage'

export default () => {
  let input: HTMLInputElement | undefined
  const [link_info, set_link_info] = createSignal({
    linkUrl: '',
    iconBase64: '',
  })

  onMount(() => {
    if (selectedId.value !== -1) {
      const _sl = links.value.find((v) => v.id === selectedId.value)
      set_link_info({
        linkUrl: _sl?.linkUrl ?? '',
        iconBase64: _sl?.iconBase64 ?? '',
      })
      // console.log(_sl)
    }
  })

  function inputFile() {
    const i = URL.createObjectURL(input!.files![0])
    const _img = new Image()
    _img.src = i
    _img.onload = () => {
      set_link_info({ ...link_info(), iconBase64: compressImage(_img) })
    }
  }
  async function submit_action(e: SubmitEvent) {
    e.preventDefault()
    console.log(selectedId.value)

    if (
      !link_info().linkUrl.startsWith('http://') &&
      !link_info().linkUrl.startsWith('https://')
    ) {
      console.log('咋没有协议前缀呢, 没事我帮你加了')
      set_link_info({
        ...link_info(),
        linkUrl: 'http://' + link_info().linkUrl,
      })
      console.log(link_info())
    }
    if (selectedId.value === -1) {
      /* 添加 */
      // @ts-ignore 按理来说link需要一个 id 属性, 但是这里其实 indexedDB 在插入数据时会自动添加自增id, 所以这里不需要主动写id
      let newlink: link = {
        ...link_info(),
      }
      console.log(newlink)
      await links.add([newlink])
    } else {
      /* 修改 */

      links.update({ ...link_info(), id: selectedId.value })
    }
    show_linkediter.hide()
  }
  function dragover_action(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    const _div = e.currentTarget as HTMLElement
    _div.style.backgroundColor = 'black'
  }
  function dragleave_action(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    const _div = e.currentTarget as HTMLElement
    _div.setAttribute('style', '')
  }
  function drop_action(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    const _div = e.currentTarget as HTMLElement
    console.log(e.dataTransfer?.types)
    const file = e.dataTransfer?.files[0]
    if (file && file.type.includes('image')) {
      const i = URL.createObjectURL(file)
      const _img = new Image()
      _img.src = i
      _img.onload = () => {
        set_link_info({ ...link_info(), iconBase64: compressImage(_img) })
      }
    } else alert('请选择图片文件')
    _div.setAttribute('style', '')
  }

  return (
    <form
      class="fixed w-[400px] h-[200px] bg-[#4A4A4A] p-[20px] flex flex-col justify-between rounded shadow-md"
      onsubmit={submit_action}>
      <div class=" flex justify-between">
        <div
          onclick={() => {
            input!.click()
          }}
          ondragover={dragover_action}
          ondragleave={dragleave_action}
          ondrop={drop_action}
          class="w-[100px] h-[100px] bg-[#353535] flex justify-center items-center rounded cursor-pointer">
          <Show
            when={link_info().iconBase64 !== ''}
            fallback={<div class="text-white text-lg">+</div>}>
            <img
              class="w-12 h-12 object-contain rounded-md"
              src={link_info().iconBase64}
              alt=""
            />
          </Show>
        </div>
        <input
          ref={input}
          type="file"
          oninput={inputFile}
          accept="image/*"
          class="hidden"
        />
        <div class="flex flex-col justify-between h-[100px] py-4">
          <div>
            <label for="title" class="mr-2 text-white">
              标题
            </label>
            <input type="text" name="title" id="title" class="px-1" />
          </div>
          <div>
            <label for="url" class="mr-2 text-white">
              地址
            </label>
            <input
              type="text"
              name="url"
              id="url"
              class="px-1"
              value={link_info().linkUrl}
              onchange={(e) => {
                set_link_info({
                  ...link_info(),
                  linkUrl: e.currentTarget.value,
                })
              }}
            />
          </div>
        </div>
      </div>
      <div class="flex">
        <button
          type="button"
          class="bg-slate-300 block flex-1 h-10 mr-1 hover:opacity-50"
          onclick={() => {
            show_linkediter.hide()
            selectedId.reset()
          }}>
          取消
        </button>
        <button
          type="submit"
          class="bg-slate-300 block flex-1 h-10 ml-1 hover:opacity-50">
          确定
        </button>
        {/* <button type="button" onclick={() => console.log(selectedId.value)}>
          log
        </button> */}
      </div>
    </form>
  )
}
