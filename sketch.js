let cells = [];
let ruleValue = 30;
let ruleSet;
let w = 5;
let y = 0;

function setup() {
    createCanvas(600, 400);
    background(220);

    ruleSet = ruleValue.toString(2);
    while (ruleSet.length < 8) {
        ruleSet = '0' + ruleSet;
    }

    let total = width / w;
    for (let i = 0; i < total; i++) {
        cells[i] = 0;
    }
    cells[floor(total/2)] = 1;
}

function draw() {
    for (let i = 0; i < cells.length; i++) {
        let x = w * i;
        noStroke(0);
        fill(255 - cells[i] * 255);
        square(x, y, w);
    }
    y += w;

    let newCells = [];
    newCells[0] = cells[0];
    newCells[cells.length-1] = cells[cells.length-1];
    for (let i = 1; i < cells.length-1; i++) {
        let left = cells[i-1];
        let right = cells[i+1];
        let state = cells[i];

        let newState = calculateNewCell(left, state, right);
        newCells[i] = newState;
    }

    cells = newCells;
}

function calculateNewCell(left, state, right) {
    let neighborhood = '' + left + state + right;
    let value = 7 - parseInt(neighborhood, 2);
    return parseInt(ruleSet[value]);

    // if (left == 1 && state == 1 && right == 1) return 1;
    // if (left == 1 && state == 1 && right == 0) return 0;
    // if (left == 1 && state == 0 && right == 1) return 1;
    // if (left == 1 && state == 0 && right == 0) return 1;
    // if (left == 0 && state == 1 && right == 1) return 0;
    // if (left == 0 && state == 1 && right == 0) return 1;
    // if (left == 0 && state == 0 && right == 1) return 1;
    // if (left == 0 && state == 0 && right == 0) return 0;
}