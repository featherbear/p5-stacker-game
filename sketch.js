
class Grid {
  constructor (width, height, rows, columns) {
    this.width = width
    this.height = height
    this.rows = rows
    this.columns = columns
  }

  draw () {
    background(220)
    for (var x = 0; x <= this.width; x += this.width / this.rows) {
      for (var y = 0; y <= this.height; y += this.height / this.columns) {
        stroke(0)
        strokeWeight(1)
        line(x, 0, x, this.height)
        line(0, y, this.width, y)
      }
    }
  }
}

let g
function setup () {
  createCanvas(400, 400)
  g = new Grid(400, 400, 5, 10)
}

function draw () {
  background(220)
  g.draw()
}
