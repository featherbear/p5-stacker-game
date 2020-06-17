class Level {
  constructor (length, x, xLimit, yPos, cellWidth, cellHeight) {
    this.length = length
    this.x = x
    this.xLimit = xLimit
    this.yPos = yPos
    this.cellWidth = cellWidth
    this.cellHeight = cellHeight

    this.isRight = true
  }

  draw () {
    rect(
      this.x * this.cellWidth,
      this.yPos,
      this.length * this.cellWidth,
      this.cellHeight
    )
  }

  step () {
    if (this.isRight) {
      if ((this.x + 1 + this.length) > this.xLimit) {
        this.isRight = false
        this.x--
      } else {
        this.x++
      }
    } else {
      if (this.x - 1 < 0) {
        this.isRight = true
        this.x++
      } else {
        this.x--
      }
    }
  }

  place () {}
}

class Grid {
  constructor (width, height, rows, columns) {
    this.width = width
    this.height = height
    this.rows = rows
    this.columns = columns

    this.columnWidth = width / rows
    this.rowHeight = height / columns

    this.maxLevelLength = Math.floor(rows / 2)
    console.log(this.maxLevelLength)

    this.levels = [
      (this.lastLevel = new Level(
        this.maxLevelLength,
        Math.floor((this.maxLevelLength + 1) / 2),
        columns,
        height - this.rowHeight,
        this.columnWidth,
        this.rowHeight
      ))
    ]
  }

  draw () {
    background(220)
    for (var x = 0; x <= this.width; x += this.columnWidth) {
      for (var y = 0; y <= this.height; y += this.rowHeight) {
        stroke(0)
        strokeWeight(1)
        line(x, 0, x, this.height)
        line(0, y, this.width, y)
      }
    }
    this.levels.forEach(level => level.draw())
  }

  add () {
    this.levels.push(
      this.lastLevel = new Level(
        this.lastLevel.length,
        0,
        this.rows,
        this.height - (this.levels.length + 1) * this.rowHeight,
        this.columnWidth,
        this.rowHeight
      )
    )
  }

  step () {
    console.log(this.lastLevel)
    this.lastLevel.step()
  }
}

let g
function setup () {
  createCanvas(400, 400)
  g = new Grid(400, 400, 7, 10)
  g.add()
  setInterval(g.step.bind(g), 150)
}

function draw () {
  background(220)
  g.draw()
}
