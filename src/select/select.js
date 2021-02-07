const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'Placeholder по умолчанию'

  const items = data.map(item => {
    let cls = ''
    if (item.id === selectedId) {
      text = item.value
      cls = 'selected'
    }
    return `
      <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
    `
  })

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span data-type="value">${text}</span>
      <i class="fa fa-chevron-down" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join('')}
      </ul>
    </div>
  `
}

const getMultipleTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'Placeholder по умолчанию'
  let selectedItems = []
  const items = data.map(item => {
    let cls = ''
    if (item.id === selectedId) {
      selectedItems.push(item.value)
      cls = 'selected'
    }
    return `
      <li class="select__item-multiple ${cls}" data-type="item-multiple" data-id="${item.id}">${item.value}</li>
    `
  })
  if (selectedItems.length) {
    text = selectedItems.join(', ')
  }


  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span class"multiple-choice" data-type="value">${text}</span>
      <i class="fa fa-chevron-down" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join('')}
      </ul>
    </div>
  `
}

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId

    this.#render()
    this.#setup()
  }

  #render() {
    const { placeholder, data } = this.options
    this.$el.classList.add('select')
    if (this.$el.classList.contains('multiple')) {
      this.$el.innerHTML = getMultipleTemplate(data, placeholder, this.selectedId)
    }
    else { this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId) }
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
    this.$value = this.$el.querySelector('[data-type="value"]')
  }

  clickHandler(event) {
    const { type } = event.target.dataset

    if (type === 'input' || type === 'value') {
      this.toggle()
    } else if (type === 'item') {
      const id = event.target.dataset.id
      this.select(id)
    }
    else if (type === 'item-multiple') {
      const id = event.target.dataset.id
      this.selectMultiple(id)
    }
    else if (type === 'backdrop') {
      this.close()
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open')
  }

  get currentSingle() {
    return this.options.data.find(item => item.id === this.selectedId)
  }
  get currentMultiple() {
    return this.options.data.filter(item => this.selectedId.includes(item.id))
  }


  selectMultiple(id) {
    let selectedItem = this.$el.querySelector(`[data-id="${id}"]`)

    if (selectedItem.classList.contains('selected')) {
      selectedItem.classList.remove('selected');
    }
    else {
      selectedItem.classList.add('selected');
    }
    this.selectedId = Array.from(this.$el.querySelectorAll('.selected')).map((item) => item.dataset.id)
    this.$value.textContent = Array.from(this.$el.querySelectorAll('.selected')).map((item) => item.innerText).join(', ')

    this.options.onSelect ? this.options.onSelect(this.currentMultiple) : null
  }


  select(id) {
    this.selectedId = id
    this.$value.textContent = this.currentSingle.value

    this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
      el.classList.remove('selected')
    })
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')

    this.options.onSelect ? this.options.onSelect(this.currentSingle) : null

    this.close()
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.$el.classList.add('open')
    this.$arrow.classList.remove('fa-chevron-down')
    this.$arrow.classList.add('fa-chevron-up')
  }

  close() {
    this.$el.classList.remove('open')
    this.$arrow.classList.add('fa-chevron-down')
    this.$arrow.classList.remove('fa-chevron-up')
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
    this.$el.innerHTML = ''
  }
}