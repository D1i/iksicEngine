//OBJECT: {
        //position: absolutePositionOnMap,
        //type: "circle" or "square",
        //color: "HEX" collors
//}

export class EngineObject {
    constructor(width, height, xPosition, yPosition, type, color) {
        this.width = width;
        this.height = height;
        this.x = xPosition;
        this.y = yPosition;
        this.type = type;
        this.color = color;
        this.turningAngle = 0;
    }

    setTurningAngle(agile) {
        this.turningAngle = agile;
    }

    editTurningAngle(agile) {
        this.turningAngle = this.turningAngle + agile;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    editPosition(x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
    }
}

export class GroupObjects {
    constructor(objectList) {
        this.x = xPosition;
        this.y = yPosition;
        this.type = "object group";
        this.turningAngle = 0;
        this.objectList = objectList;
    }

    addObject(object) {
        this.objectList.push(object);
    }

    deleteObject(objectName) {
        this.objectList.filter(i => i.name !== objectName);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    editPosition(x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
    }

    setTurningAngle(agile) {
        this.turningAngle = agile;
    }

    editTurningAngle(agile) {
        this.turningAngle = this.turningAngle + agile;
        this.objectList = this.objectList
        .map(this.calculationOfCurrentPositionsAtObject)
    }

    calculationOfCurrentPositionsAtObject(object) {
        object.turningAngle += this.turningAngle;
        object.x;
        object.y;
    }
}
