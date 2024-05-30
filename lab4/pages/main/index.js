import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        ajax.post(urls.getGroupMembers(groupId), (data) => {
            this.renderData(data.response.items)
        })

        //Вывод peer id в консоль для проверки
        ajax.post(urls.getConversations(groupId), (data) =>{
            this.getMembersData(data)
        })
    }

    getMembersData(data){
        //Вывод peer id
        console.log(data.response.items)
        data.response.items.forEach((item) => {
            console.log(item.conversation.peer.id)
        })

        console.log(data.response.items[1].conversation.peer.id)
        let peerId = data.response.items[1].conversation.peer.id
        //Получение данных об участниках чата
        ajax.post(urls.getConversationMembers(peerId), (data) => {
            console.log(data)
        })
    }
    
    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
    
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    renderData(items) {
        items.forEach((item) => {
            console.log(item)
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
        
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        this.getData()
    }
}