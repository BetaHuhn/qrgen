import path from 'path'
let words = require(path.join(__dirname + '/../../src/' + 'words.json'))

export function randomWord(){
    return words[Math.floor(Math.random() * words.length)]
}

export function randomColor(){
    return colors[Math.floor(Math.random() * colors.length)]
}

/* Common colors */
const colors = [ 'red', 'blue', 'green', 'yellow', 'black', 'white', 'pink', 'grey', 'teal', 'silver', 'gold', 'lime', 'olive', 'navy', 'orange', 'bronze', 'brown', 'violet', 'indigo', 'purple', 'snow', 'platinum', 'coral', 'salmon', 'tomato', 'khaki', 'cyan', 'beige'];
