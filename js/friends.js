export default class Friends {
  constructor() {}

  async init() {
    const friendList = await this.load()
    this.count = document.querySelector(
      'body > div.container.friends > section > ul > div > div > div.for',
    )
    this.list = []
    window.app.friendList = this.list

    this.render(friendList)
  }

  async load() {
    return await (await fetch('./json/friends.json')).json()
  }

  render(list) {
    this.count.innerHTML = list.length

    list.forEach((json) => {
      this.list.push(new Menu(json))
    })
  }
}

class Menu {
  constructor(json) {
    let { image, name, userId, message } = json

    if (!image) {
      image = '/image/profile.png'
    }

    this.message = message
    this.image = image
    this.name = name
    this.userId = userId
    this.dom = document.querySelector(
      'body > div.container.friends > section > ul',
    )

    this.render()
  }

  render() {
    this.div = document.createElement('li')

    this.div.innerHTML = `<div class="profile">
      <div class="image">
          <img src=".${this.image}" alt="">
      </div>
      <div class="context">
          <div class="name">${this.name}</div>
          <div class="msg">${this.message}</div>
      </div>
  </div>`

    this.dom.appendChild(this.div)
  }

  remove() {
    this.div.remove()
  }
}
