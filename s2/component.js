customElements.define('x-counter', class Counter extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = "counter: !"
  }
})
