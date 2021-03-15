import { Screen } from './screenVisualSystem';
import { EngineObject } from './objectGenerateSystem/generateVisual'

const screenContainer = document.getElementById('screen');

const screen = new Screen('TEST CONTEXT');

const firstScreen = screen.create('firstScreen', 500, 1000);

screenContainer.append(firstScreen.getElem());

window.screen = firstScreen;
window.EngineObject = EngineObject;
