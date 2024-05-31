export class ProductCardComponent {
	constructor(parent) {
		this.parent = parent
		this.initPopovers()
	}

	initPopovers() {
		const popoverTriggerList = document.querySelectorAll(
			'[data-bs-toggle="popover"]'
		)
		const popoverList = [...popoverTriggerList].map(
			popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl)
		)
	}

	getHTML(data) {
		return `
                <div class="card" style="width: 300px;">
                    <img class="card-img-top" style="height: 200px; width: 300px" src="${data.src}" alt="картинка">	
                    <div class="card-body">
						<h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
					</div>  
                    <div class="card-body p-2 d-flex align-items-end">
                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                        <a tabindex="0" class="btn btn-lg btn-danger" role="button" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="focus" title="${data.title}" data-bs-content="${data.text_button}">Кратко</a>
                    </div> 
                </div>
            `
	}

	addListeners(data, listener) {
		document
			.getElementById(`click-card-${data.id}`)
			.addEventListener('click', listener)
	}

	render(data, listener) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
		this.addListeners(data, listener)
	}
}
