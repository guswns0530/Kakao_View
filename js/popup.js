export default class Popup {
  constructor(id) {
    this.id = id

    this.init()
  }

  async init() {
    const json = (await this.load()).filter((e) => e.userId === this.id)[0]

    this.render(json)
    this.addListener()
  }

  async load() {
    return await (await fetch('./json/friends.json')).json()
  }

  addListener() {
    //textarea
    const ta = this.popup.querySelector('textarea')

    ta.addEventListener('keydown', resize)
    ta.addEventListener('keyup', resize)

    function resize({ target: obj }) {
      obj.style.height = '0px'
      const { scrollHeight } = obj

      let line = scrollHeight / 18

      if (line > 5) {
        obj.style.overflowY = 'scroll'
        line = 5
      } else {
        obj.style.overflowY = 'hidden'
      }

      obj.style.height = line * 18 + 'px'
    }

    let isMove = false

    // 채팅창 옮기기
    const eventTarget = this.popup.querySelector('header')
    const header = this.popup.querySelector('header > .h')

    let clickX, clickY

    eventTarget.addEventListener('mousedown', (e) => {
      if (!(e.target === eventTarget || e.target === header)) return
      isMove = true

      const { offsetX, offsetY } = e

      clickX = offsetX
      clickY = offsetY

      if (e.target === header) {
        clickX += 15
        clickY += 15
      }
    })
    window.addEventListener('mouseup', (e) => {
      isMove = false
      clickX = 0
      clickY = 0
    })

    window.addEventListener('mousemove', (e) => {
      if (!isMove) return

      const { clientX, clientY } = e

      this.popup.style.left = clientX - clickX + 'px'
      this.popup.style.top = clientY - clickY + 'px'
    })

    //채팅창 닫기
    this.popup.querySelector('.exit').addEventListener('click', () => {
      this.remove()
    })
  }

  render({ name, image }) {
    if (!image) {
      image = '/image/profile.png'
    }
    this.popup = document.createElement('div')
    this.popup.setAttribute('id', 'popup')
    this.popup.innerHTML = `<header>
      <div class="h">
        <div class="image">
          <img src=".${image}" alt="" />
        </div>

        <div class="p_name">${name}</div>

        <div class="tab"> <!-- class css-none -->
          <div class="full_screen">
  
          </div>
          <div class="min_screen none">
            <div></div>
            <div></div>
          </div>
          <div class="exit">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </header>

    <div class="content">
      <div class="chat_log">
      </div>
      <div class="form">
        <form action="">
          <textarea name="" id=""></textarea>
          <button class="able">전송</button>
        </form>
      </div>
    </div>`
    this.popup.style.position = 'absolute'
    document.body.appendChild(this.popup)
  }

  remove() {
    window.app.popupMap.delete(this.id)
    this.popup.remove()
  }
}
