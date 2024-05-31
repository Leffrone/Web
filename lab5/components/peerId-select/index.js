import {request} from "../../modules/request.js";
import {groupId} from "../../modules/consts.js"
import {urls} from "../../modules/urls.js"

export class PeerIdSelectComponent {
    constructor(parent, selected = null) {
        this.parent = parent
        this.selected = selected
        this.options = ``
    }

    addListeners(listener) {
        document.getElementById("peerIdSelect").addEventListener("change", listener)
    }

    async getData() {
        let data = await request(urls.getConversations(groupId))
        console.log('Запрос на чаты сообщества: ', data.response.items)
        this.renderData(data.response.items)
    }

    getHTML() {
        return (
            `
            <div class="card">
                <div class="card-body">
                    <h5 id="chat-selected" class="card-title"></h5>
                    <select id="peerIdSelect" class="form-select" size="3" multiple>
                    </select>
                </div>
            </div>
            `
        )
    }

    renderData(data){

        this.options = ``
        data.forEach(item =>{
            this.options += `<option value="${item.conversation.peer.id}">Чат с ID ${item.conversation.peer.id}</option>`
        })
        console.log("Опции", this.options)
        document.getElementById("peerIdSelect").innerHTML = this.options
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforebegin', html)
        this.addListeners(listener)

        if(this.selected != null)
            {
                document.getElementById("chat-selected").innerHTML = "Чат с ID " + this.selected
            }
        else
            {
                document.getElementById("chat-selected").innerHTML = "Выберите чат"
            } 
        this.getData()
    }
}