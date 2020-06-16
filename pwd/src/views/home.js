import { html, render } from "lit-html";

export default class Home {
  constructor(page) {
    this.page = page;
    this.properties = {
      message: '',
      messages: []
    };

    this.renderView(this.properties.messages);
  }

  set messages(value) {
    this.properties.messages = value;
  }

  get messages() {
    return this.properties.messages;
  }

  template() {
    return html`
      <section>
        <main>
          <ul>
            ${this.properties.messages.map(message => html`
            <li class="block ${false ? 'bg-gray-200' : 'bg-blue-300'}">
              <strong class="block">${message.email} said :</strong>
              ${message.content} - ${this.getDate(message.date)}
            </li>
          `)}
          </ul>
        </main>
        <footer class="h-16 bg-gray-300 fixed bottom-0 inset-x-0">
          <form @submit="${this.handleForm.bind(this)}" id="addTodo" class="w-full h-full flex justify-between items-center px-4 py-3">
            <label class="flex-1" aria-label="Add todo input">
              <input
                autocomplete="off"
                .value="${this.properties.message}"
                @input="${e => this.properties.message = e.target.value}"
                class="py-3 px-4 rounded-sm w-full h-full"
                type="text"
                placeholder="Enter a new message ..."
                name="message">
            </label>
            <button
              aria-label="Add"
              class="ml-4 rounded-lg text-uppercase bg-blue-400 h-full text-center px-3 uppercase text-white font-bold flex justify-center items-center"
              type="submit">Add</button>
          </form>  
        </footer>
      </section>
    `;
  }

  renderView() {
    const view = this.template();
    render(view, this.page);
  }

  handleForm(e) {
    e.preventDefault();
    const event = new CustomEvent('send-message', { detail: this.properties.message });
    document.dispatchEvent(event);
    const input = document.querySelector('[name="message"]');
    input.value = '';
  }

  getDate(timestamp) {
    const date = new Date(timestamp);
    // Hours part from the timestamp
    const hours = date.getHours();
    // Minutes part from the timestamp
    const minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    const seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
    return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  }
};
