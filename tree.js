const TW = document.getElementById("tree").clientWidth;
let numOfPlayers = 4
let tileWidth
let numOfTiles = 0
let grid = []

let canvas

class Player {
    constructor(name) {
        this.name = name
        this.win = false
        this.lParent
        this.rParent
    }
}

function nextRow(row) {
    inds = []
    ind = 0
    for (i of grid[row]) {
        if (i == 2 || i == -2)
            inds.push(ind)
        ind += 1
    }

    i=0
    pos = []
    while (i < inds.length) {
        try {
            avg = Math.floor((inds[i] + inds[i+1]) / 2)
            pos.push(avg)
        } catch(e) {continue}
        i += 2
    }
    return pos
}

function tournamentTree(playercount) {
    numOfTiles = playercount * 2 + 1
    tileWidth = Math.floor(TW / numOfTiles)

    for (let n = 0; n < numOfTiles; n++) {
        grid[n] = []
        for(let i = 0; i < Math.floor(numOfTiles / 2) + 1; i++) {
            grid[n] = grid[n].concat([1, -1])
        }
    }

    let numOfPlayers = numOfTiles
    row = 0
    for (let i = 0; i < numOfPlayers; i++) {
        if (i%2==1)
            grid[row][i] *= 2
    }

    numOfPlayers = Math.floor(numOfPlayers / 2)
    while (numOfPlayers > 1) {
        pos = nextRow(row)
        row += 2
        for (let j of pos)
            grid[row][j] *= 2

        numOfPlayers = Math.floor(numOfPlayers / 2)
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (Math.abs(grid[i][j]) == 2)
                grid[i][j] = new Player(i + j + " ")
        }
    }
    resizeCanvas(numOfTiles * tileWidth, 800)
}

function setup() {
    canvas = createCanvas()
    canvas.parent("tree")

    frameRate(5)
}

function draw() {
    background(255)

    let z = 1
    let x = 0
    let y = 0
    
    stroke(255)
    for (let row of grid) {
        for (let field of row) {
            if (z == -1)
                field *= -1
            if (field == 1) {
//                 fill("white")
//                 rect(x, y, tileWidth, tileWidth)
            } else if (field == -1) {
//                 fill("white")
//                 rect(x, y, tileWidth, tileWidth)
            } else if (typeof field == "object") {
                // drawing the player on tournament board
                if (mouseX > x && mouseX < x + tileWidth && mouseY > y && mouseY < y + tileWidth) {
                    fill("#ff3333")
                } else
                    if (field.win == false)
                        fill("#dd0000")
                    else
                        fill('#00dd00')
                noStroke()
                rect(x, y, tileWidth, tileWidth)

                stroke(255)
                fill(255)
                text(field.name, x + 8, y + 16)
            }

            x += tileWidth
        }
        z *= -1
        y += tileWidth
        x = 0
    }
}

function mousePressed() {
    let z = 1
    let x = 0
    let y = 0

    for (let row of grid) {
        for (let field of row) {
            if (typeof field == "object") {
                if (mouseX > x && mouseX < x + tileWidth && mouseY > y && mouseY < y + tileWidth) {
                    console.log(field)
                    field.win = !field.win
                }
            }
            x += tileWidth
        }
        z *= -1
        y += tileWidth
        x = 0
    }
}
