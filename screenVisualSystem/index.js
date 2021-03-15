import { Render } from "./renderSystem/render";

const screenDefaultHeight = 1280;
const screenDefaultWidth = 720;

class UpdateSystem {

    constructor(objectsList, actionList) {
        this.objectList = objectsList;
        this.actionList = actionList;
        this.waitUpdate = true;
    }

    objectListLength() {
        return this.actionList.add.length + this.actionList.delete.length;
    }

    update() {
        this.actionList.add.forEach( i => this.objectList.push(i));

        this.actionList.delete.forEach( deletedObject => this.objectList.filter(i => i.name !== deletedObject));

        console.log("CLEAR!")

        this.actionList.add = [];
        this.actionList.delete = [];
    }

    init() {
        setInterval(() => {
            if( !this.waitUpdate || this.objectListLength() >= 100 ) {
                console.log("update")
                this.waitUpdate = true;
                this.update();
            } else  if (this.objectListLength() !== 0 ) {
                this.waitUpdate = false;
            }
        }, 100)
    }
}

class CreateScreen {
    constructor(screenName, screenHeight, screenWidth) {
        this.screenName = screenName;
        this.element = this.screenElementCreate(screenName);
        this.screenSize = {
            height: screenHeight || screenDefaultHeight,
            width: screenWidth || screenDefaultWidth
        }
        this.objectList = [];
        this.turnActions = {add: [], delete: []};
        this.screenPosition = {x: 0, y: 0};
        this.update = new UpdateSystem(this.objectList, this.turnActions);
        this.update.init();
        this.screenElement = this.screenElementCreate(screenName);
        this.renderMetodts = new Render(this.objectList);
    }

    screenElementCreate(screenName) {
        const elem = document.createElement('div');
        elem.screen = screenName;
        elem.setAttribute('screen', screenName)
        return elem;
    }

    getElem() {
        return this.screenElement;
    }

    add(object) {
        //OBJECT: {
        //position: absolutePositionOnMap,
        //type: "circle" or "square",
        //color: "HEX" collors
        //}
        this.turnActions.add.push(object);
    }

    delete(objectName) {
        this.turnActions.delete.push(objectName);
    }


}

export class Screen {
    constructor(context) {
        this.context = context
        this.screenList = {};
    }

    create(screenName, screenHeight, screenWidth) {
        const newScreen = new CreateScreen(screenName, screenHeight, screenWidth);
        this.screenList[screenName] = newScreen;
        return this.screenList[screenName];
    }

    delete(screenName) {
        delete this.screenList[screenName];
    }

    editSize(screenName, screenHeight, screenWidth) {
        this.screenList[screenName].screenSize = {
            height: screenHeight || screenDefaultHeight,
            width: screenWidth || screenDefaultWidth
        };
    }

    getScreen(screenName) {
        return this.screenList[screenName];
    }

    addObject(screenName, object) {
        this.screenList[screenName].add(object);
    }

    deleteObject(screenName, objectName) {
        this.screenList[screenName].delete(objectName);
    }
}
