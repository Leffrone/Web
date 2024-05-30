import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {PeerIdSelectComponent} from "../../components/peerId-select/index.js";

export class MainPage {
    constructor(parent, peerId = null) {
        this.parent = parent
        console.log('В конструкторе: ', peerId)
        this.peerId = peerId
    }

    getData(){
        ajax.post(urls.getConversationMembers(this.peerId), (data) => {
            console.log(`Данные запроса об участниках чата...`)
            console.log(data)
            this.renderData(data.response.items.slice(1))
        })
    }
    
    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"></div>
            `
        )
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
    
        const productPage = new ProductPage(this.parent, cardId, this.peerId)
        productPage.render()
    }

    handleOnChange()
    {
        this.peerId = document.getElementById("peerIdSelect").value
        this.render()
    }

    renderData(items) {
        console.log('Создание карточек...')
        items.forEach((item) => {
            console.log(item)

            ajax.post(urls.getUserInfo(item.member_id), (data) => {
                console.log(data)
                const productCard = new ProductCardComponent(this.pageRoot)
                productCard.render(data.response[0], this.clickCard.bind(this))
            })
        })
    }
        
    render() {
        console.log('peerId: ', this.peerId)
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        console.log('Создание селекта...')
        const peerIdSelect = new PeerIdSelectComponent(this.pageRoot, this.peerId)
        peerIdSelect.render(this.handleOnChange.bind(this))
    
        this.getData()
    }
}