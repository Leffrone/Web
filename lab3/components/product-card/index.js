export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 300px;">
                    <img ${data.popverTabindex}
                        class="card-img-top" 
                        src="${data.src}" 
                        data-bs-toggle="popover"
                        ${data.popoverTrigger}
                        data-bs-placement="bottom"
                        ${data.popoverTitle}
                        ${data.popoverContent}
                        data-bs-delay='{"show":${data.showDelay},"hide":${data.hideDelay}}'
                        style="height: 200px;" 
                        alt="картинка">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                    </div>
                </div>
            `
        )
    }
    
    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }
    
    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}