var term = require('terminal-kit').terminal;

/**
 * TERM_WIDTH - Terminal width
 * MENU_ITEMS - Terminal Menu Items
 */


module.exports = {
    TERM_WIDTH: term.width,
    MENU_ITEMS: ['Real-Time','Historical Chart','Help'],
    MENU_OPTIONS: {
        y: term.height - 1,
        style: term.inverse,
        selectedStyle: term.dim.blue.bgGreen
    }
}