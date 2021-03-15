//visualElementTypes 
//    circle
//    square

export class Render {
    constructor(container) {
        this.container = container;
        this.objectList = [];
    }

    addElem(object) {
        let elem;
        if (object.type === "circle") {
            elem = this.createCircle();
        } else {

        }
    }

    createCircle(radius) {
        const elem = document.createElement('div');
        elem.visualType = "cicle";
        elem.style.borderRadius = "50%";
        elem.style.width = `${radius * 2}px`;
        elem.style.height = `${radius * 2}px`;
        return elem;
    }

    createSquare(width, height) {
        const elem = document.createElement('div');
        elem.visualType = "square";
        elem.style.width = `${width}px`;
        elem.style.height = `${height}px`;
        return elem;
    }
    
};
