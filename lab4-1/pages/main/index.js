import { ProductCardComponent } from '../../components/product-card/index.js'
import { ProductPage } from '../product/index.js'

export class MainPage {
	constructor(parent) {
		this.parent = parent
	}

	get pageRoot() {
		return document.getElementById('main-page')
	}

	getHTML() {
		return `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
	}

	getData() {
		return [
			{
				id: 1,
				src: 'https://avatars.mds.yandex.net/get-entity_search/371114/806592625/orig',
				title: 'Британская короткошёрстная кошка',
				text: 'Самая популярная и распространенная порода кошек в мире.Шерсть у британской кошки очень пушистая и мягкая, но довольно короткая. Существует около 30 оттенков цветов её шерсти.',
				text_button: 'Британская короткошёрстная кошка пушистая и добрая',
				description:
					'Порода домашней кошки. По одной версии, является потомком породы «шартрез», а по другой — римских кошек и местных сородичей. ',
				times_opened: 0,
			},
			{
				id: 2,
				src: 'https://avatars.mds.yandex.net/get-entity_search/1583435/791226179/orig',
				title: 'Мейн-кун',
				text: 'Мейн-кун — длинношёрстная кошка. Шерсть мягкая и шелковистая, текстура может варьироваться в зависимости от цвета шерсти и породного типа.',
				text_button: 'Мейн-кун — крупнейшая порода кошек.',
				description:
					'Порода кошек, которая произошла от кошек штата Мэн на северо-востоке США. Это старейшая американская порода кошек. Является официальным символом штата Мэн. Мейн-кун — крупнейшая порода кошек. Самцы весят от 5,9 до 8,2 кг, а самки — от 3,6 до 5,4 кг. Высота в холке у взрослых кошек достигает от 25 до 41 см, а общая длина с хвостом — до 120 см.',
				times_opened: 0,
			},
			{
				id: 3,
				src: 'https://skstoit.ru/wp-content/uploads/2022/02/skolko-stoit-russkaya-golubaya-koshka-1.jpg',
				title: 'Русская голубая кошка',
				text: 'Русская голубая кошка – зеленоглазая аристократка, обязанная своей популярностью уникальному серебристо-голубому окрасу и врожденной утонченности.',
				text_button: 'Родом эта порода из России',
				description:
					' Порода кошек, которая происходит из России. Основные характеристики: — Вес: 3–5,5 кг; — Продолжительность жизни: 14–20 лет; — Отличительная черта породы — безрассудная любовь к прыжкам в высоту, поэтому в комнате, где обитает животное, вазы и другие хрупкие предметы лучше не держать; — Русские голубые кошки крайне чистоплотны, поэтому несвоевременно вынесенный или плохо вымытый лоток воспринимают как личное оскорбление; — Взрослые животные осторожны и чрезвычайно застенчивы. При появлении в доме незнакомца стараются отойти подальше либо спрятаться; — Кошки довольно самостоятельны. При отсутствии должного внимания со стороны хозяина способны развлечь себя сами. ',
				times_opened: 0,
			},
			{
				id: 0,
				src: 'https://maxluki.ru/wp-content/uploads/2023/02/1589698358_4.jpg',
				title: 'Русский язык',
				text: 'Третий по главности предмет программы обучения',
				text_button: 'Русский - это круто',
				times_opened: 0,
			},
		]
	}

	clickCard(e) {
		const cardId = e.target.dataset.id
		const productPage = new ProductPage(
			this.parent,
			cardId,
			document.data[cardId - 1].src,
			document.data[cardId - 1].description
		)
		document.data[cardId - 1].times_opened++
		productPage.render()
	}

	render() {
		this.parent.innerHTML = ''
		const html = this.getHTML()
		this.parent.insertAdjacentHTML('beforeend', html)

		if (!document.data) document.data = this.getData()
		let a = 0
		document.data.forEach(item => {
			a += 1
			const productCard = new ProductCardComponent(this.pageRoot)
			if (a != document.data.length) {
				productCard.render(item, this.clickCard.bind(this))
			}
		})
	}
}
