import App from './app.js';
import ColorPalette from './color-palette.js';
import ColorPicker from './color-picker.js';
import Color from './color.js';

new App({
    canvas: document.querySelector('#canvas'),

    colorPalette: new ColorPalette({
        element: document.querySelector('#color-palette'),
        colors: [
            new Color(252, 76, 79),
            new Color(79, 163, 252),
            new Color (104, 178, 91)
        ]
    }),

    colorPicker: new ColorPicker({
        element: document.querySelector('#color-picker')
    })
});