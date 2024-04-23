import {ProductCardComponent} from "../../components/product-card/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const productCard1 = new ProductCardComponent(this.parent)
        productCard1.render()
    }
}