module.exports = {
    plugins: {
        "postcss-pixel-to-viewport": {
            viewportWidth: 375,
            viewportUnit: 'vw',
            minPixelValue: 1,
            enableConvertComment: 'on',
            disableConvertComment: 'off',
            mediaQuery: false
        }
    }
};