import { html, render } from "lit-html";

export default class SignIn {
  constructor(page) {
    this.page = page;
    this.properties = {
      email: '',
      password: '',
    };

    this.renderView();
  }

  template() {
    return html`
      <section class="bg-gray-200">
        <form class="overflow-auto mx-4 py-4" @submit="${this.handleForm.bind(this)}">
          <label class="mt-4 block flex">
            <span class="block w-1/3">Email :</span>
            <input class="block h-10 rounded-sm focus:outline-none" type="email" name="email" id="email"
              @input="${e => this.properties.email = e.target.value}">
          </label>
          <label class="mt-4 block flex">
            <span class="block w-1/3">Password :</span>
            <input class="block h-10 rounded-sm focus:outline-none" type="password" name="password" id="password"
              @input="${e => this.properties.password = e.target.value}">
          </label>
          <button
            class="h-10 rounded-lg text-uppercase bg-blue-400 text-center px-3 uppercase text-white font-bold flex justify-center items-center"
            type="submit">Sign in</button>
        </form>
      </section>
    `
  }

  renderView() {
    const view = this.template();
    render(view, this.page);
  }

  handleForm(e) {
    e.preventDefault();
    const event = new CustomEvent('sing-in', {
      detail: {
        email: this.properties.email,
        password: this.properties.password,
      }
    });
    document.dispatchEvent(event);
    // const email = document.querySelector('[name="email"]');
    // const password = document.querySelector('[name="password"]');
    // email.value = '';
    // password.value = '';
  }
}
