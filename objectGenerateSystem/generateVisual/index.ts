import { Object, ObjectIntrface } from "./../types/Objects"

//OBJECT: {
        //position: absolutePositionOnMap,
        //type: "circle" or "square",
        //color: "HEX" collors
//}

type OnjectProps = {
    width: number,
    height: number,
    xPosition: number,
    yPosition: number,
    type: string,
    color: string
}

export class EngineObject {
    width: number;
    height: number;
    x: number;
    y: number;
    type: string;
    color: string;
    turningAngle: number;
    name: string;
    constructor(props: OnjectProps) {
        this.name = "NAME GENERATE!";
        this.width = props.width;
        this.height = props.height;
        this.x = props.xPosition;
        this.y = props.yPosition;
        this.type = props.type;
        this.color = props.color;
        this.turningAngle = 0;
    }

    setTurningAngle(agile: number) {
        this.turningAngle = agile;
    }

    editTurningAngle(agile: number) {
        this.turningAngle = this.turningAngle + agile;
    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    editPosition(x: number, y:number) {
        this.x = this.x + x;
        this.y = this.y + y;
    }
}

export class GroupObjects {
    x: number;
    y: number;
    type: string;
    color: string;
    turningAngle: number;
    objectList: Array<Object>;
    constructor(objectList: Array<Object>, xPosition: number, yPosition: number) {
        this.x = xPosition;
        this.y = yPosition;
        this.type = "object group";
        this.turningAngle = 0;
        this.objectList = objectList;
    }

    addObject(object: Object) {
        this.objectList.push(object);
    }

    deleteObject(objectName: string) {
        this.objectList.filter((i: Object) => i.name !== objectName);
    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    editPosition(x: number, y: number) {
        this.x = this.x + x;
        this.y = this.y + y;
    }

    setTurningAngle(agile: number) {
        this.turningAngle = agile;
    }

    editTurningAngle(agile: number) {
        this.turningAngle = this.turningAngle + agile;
        this.objectList = this.objectList
        .map(this.calculationOfCurrentPositionsAtObject)
    }

    calculationOfCurrentPositionsAtObject(object: Object) {
        object.turningAngle += this.turningAngle;
        object.x;
        object.y;
        return {
            name: '',
            width: 1,
            height: 2,
            x: 3,
            y: 4,
            type: 'string',
            color: 'string',
            turningAngle: 3,
        }
    }
}
