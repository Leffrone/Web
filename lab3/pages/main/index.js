import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://static.designschool.ru/uploads/2020/09/tatiananovikova_1920_03.jpg",
                popverTabindex: ``,
                popoverTitle: `data-bs-title="Информация о 1 дизайне"`,
                popoverTrigger: `data-bs-trigger="hover focus"`,
                popoverContent: `data-bs-content="По наведению мыши"`,
                showDelay: 1000,
                hideDelay: 150,
                title: "Дизайн",
                text: "Дизайн кухни"
            },
            {
                id: 2,
                src: "https://rybinsk.studio-mint.ru/sites/default/files/styles/home_slider_imgage/public/slide/fl_cr.jpg",
                popverTabindex: `tabindex="0"`,
                popoverTitle: ``,
                popoverTrigger: `data-bs-trigger="focus"`,
                popoverContent: `data-bs-content="Информация о 2 дизайне без заголовка"`,
                showDelay: 0,
                hideDelay: 0,
                title: "Дизайн",
                text: "Дизайн гостинной"
            },
            {
                id: 3,
                src: "https://ruplans.ru/cms_files/39111/1035/108/1_1_sovremenniy.jpg",
                popverTabindex: `tabindex="0"`,
                popoverTitle: `data-bs-title="Информация о 3 дизайне"`,
                popoverTrigger: `data-bs-trigger="focus"`,
                popoverContent: `data-bs-content="Дизайн номер 3"`,
                showDelay: 0,
                hideDelay: 0,
                title: "Дизайн",
                text: "Дизайн зоны отдыха"
            },
        ]
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
        const cardImg = this.getData()[e.target.dataset.id - 1].src
    
        const productPage = new ProductPage(this.parent, cardId, cardImg)
        productPage.render()
    }
        
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const data = this.getData()
        data.forEach((item) => {      
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })

        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
        const popover = new bootstrap.Popover('.popover-dismiss', {
            trigger: 'focus'
        })
    }
}