import { alertMessages } from "./const";

import {
    alertColor,
    alertMessage,
    isAlertOpen,
    openAlertFor,
} from "../stores/Alert.js";


const gameClear = () => {
    isAlertOpen.set(true);
    alertMessage.set(alertMessages.gameClear);
    alertColor.set("#d4edda");
}

const gameFailed = (problem) => {
    isAlertOpen.set(true);
    alertMessage.set(alertMessages.gameFailed(problem));
    alertColor.set("pink");
}

const formulaError = () => {
    openAlertFor(2000);
    alertMessage.set(alertMessages.formulaError);
    alertColor.set("pink");
}

const nerdleAlertUtil = {
    gameClear, gameFailed, formulaError
}

export { nerdleAlertUtil }