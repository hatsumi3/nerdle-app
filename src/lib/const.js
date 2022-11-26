/** cellの状態一覧 */
const cellStates = {
    notVerified: "not-verified",
    notIncluded: "not-included",
    included: "included",
    correct: "correct"
}

/** gameの状態一覧*/
const gameStates = {
    success: "success",
    failed: "failed",
    continue: "continue",
}

/** formulaの状態一覧*/
const formulaStates = {
    success: "success",
    error: "error"
}

/** alertのメッセージ一覧*/
const alertMessages = {
    formulaError: "That guess doesn't compute!",
    gameClear: "Congratulations!",
    gameFailed: (formula) => `You lost, the calculation was ${formula}.`
}

export { cellStates, gameStates, formulaStates, alertMessages }