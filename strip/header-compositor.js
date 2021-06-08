/* Header compositor */
const compose = (gmState, headerConfig, constants) => {
    gmState.font(constants.font, constants.fontSize)
        .fill(constants.fontColor)
        .gravity('center')
        .drawText(
            constants.textPadding, 
            constants.textPadding, 
            headerConfig.title
    );

    return  gmState;
};

module.exports = compose;