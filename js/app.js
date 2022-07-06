import Friends from './friends.js'
import Popup from './popup.js'

export default class App {
  constructor() {
    this.init()
  }

  addEvent() {
    const [friends, rooms] = [
      document.querySelector('.friends'),
      document.querySelector('.rooms'),
    ]

    function changeNav(to, from, e) {
      to.style.display = 'none'
      from.style.display = 'block'

      const { parentNode } = e.currentTarget

      document.querySelectorAll('.main_nav a').forEach((d) => {
        if (d !== parentNode) {
          d.classList.remove('select')
          return
        }

        d.classList.add('select')
      })
    }

    document.querySelector('#nav_1').addEventListener('click', (e) => {
      changeNav(rooms, friends, e)
    })

    document.querySelector('#nav_2').addEventListener('click', (e) => {
      changeNav(friends, rooms, e)
    })

    this.friendList.forEach((e) => {
      const { userId } = e
      e.div.addEventListener('click', () => {
        if (this.popupMap.get(userId)) {
          return
        }

        const popup = new Popup(userId)

        this.popupMap.set(userId, popup)
      })
    })
  }

  async init() {
    this.friends = new Friends()
    this.popupMap = new Map()

    await this.friends.init()

    this.addEvent()
  }
}
