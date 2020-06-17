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
      if (this.x + 1 + this.length > this.xLimit) {
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

  add (length) {
    this.secondLastLevel = this.lastLevel
    this.levels.push(
      (this.lastLevel = new Level(
        length,
        0,
        this.rows,
        this.height - (this.levels.length + 1) * this.rowHeight,
        this.columnWidth,
        this.rowHeight
      ))
    )
  }

  step () {
    this.lastLevel.step()
  }

  place () {
    const [x1, x2, l1, l2] = [this.lastLevel.x, this.secondLastLevel.x, this.lastLevel.length, this.secondLastLevel.length]

    const lowerBound = Math.max(x1, x2)
    const upperBound = Math.min(x1 + l1, x2 + l2)

    const length = upperBound - lowerBound

    if (length > 0) {
      this.lastLevel.x = lowerBound
      this.lastLevel.length = length
    }
    this.add(length)
    this.lastLevel.isRight = this.secondLastLevel.isRight
    this.lastLevel.x = this.secondLastLevel.x

    if (length <= 0) {
      gamePlaying = false
      clearInterval(t)
    }
  }
}

let g, t, gamePlaying

function setup () {
  createCanvas(400, 400)
  g = new Grid(400, 400, 7, 10)
  g.add(g.maxLevelLength)
  gamePlaying = true
  t = setInterval(g.step.bind(g), 100)
}

function draw () {
  background(220)
  g.draw()
}

function keyPressed () {
  if (keyCode == 0x20 /* SPACE */) {
    if (gamePlaying) {
      g.place()
    } else {
      setup()
    }
  }
}
