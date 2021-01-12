/**
--- Day 11: Seating System ---

https://adventofcode.com/2020/day/11

Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:

If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.
Floor (.) never changes; seats don't move, and nobody sits on the floor.

After one round of these rules, every seat in the example layout becomes occupied:

#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
After a second round, the seats with four or more occupied adjacent seats become empty again:

#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##
This process continues for three more rounds:

#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##
#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##
#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##
At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?

*/

const seatingAreaDataRaw = `LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.L.LLLLL.LLLL.LLLLLLLLL..LLL.LLLLLLLLLLLLLL.LLLLLLLLL.LLL.LLLLLL
LLLLLLLLLL.L.LLLLLLL.LL.LLLLLLL.LLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLL.LLLLLL
LLLLLLLL.L.LLLLLLLLLLLL.LLLLLLL.LLLLLL.LLLLL.LLLLLLLLL.LLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLL.LLLLLL
.LLLLLLLLLLLLLLLLL.LLLL.LLLLLLL.LLLLLL.LLLLL.LLL.LLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLL.LLLLL.LLLLLL
LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLL.LLLLL.LL.LLLLLLLLL.LLLL.LLLLLL.LLLLLLLL.LLLLLLL.LLLL.LLLLLL
LLL.LL..L..L.LL.L.L........L.............LLL....LL...L..L.L.....L..L.L.......L..L......LLLL.L.L
LLLLLLLLLLLLLLLLL..LLLL.LLLLLLL.LLLLLL.LLLLL.LLLLLLLLL.LLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLLL.LLLLL
LLLLLLLLLL.LLLL.LL.LLLL.LLLLLLLLLLLLLLLLLL.L.LLLLLLLLL.LLLL.L.L.LL.LLLLLLLLLLLLL.LL.LLLLLLLLLLL
LLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLLLLL.LLLL.LLLLLLLLLLLLLLL.LL.LLLLLLLLL.LLLLL.
LLLLLLLLLLLLLLLLL..LLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLLLL.LLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLL.LLLLLL
LLLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLLLLL
LLLLLLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLL.LLL.L..LLLLLLLL.LLLL.LLLLLL..LLLLLLLLLLLLLLL.LLLL.LLLLLL
L.LLLLLLLL..LLLLLL.LLLL.LLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLL.LLLLLLLLL.LLLLL.LLLLLLL.LLLL.LLLLLL
.LLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLL
LL.L..LL...LL..L..L.L.L.....L..LL...L.LLL......L.L...L.LL...L.L.L.........L.LL....L.LL.LL...LL.
LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLL.L.LLLLLLLLLLLLLL.LLL..LLLLLL
LLLLL.LLLL.LLLL.LLLLLLLLLLLLLLL.LLLLLL.L.LLL.LLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLL.LLLLLLL
LLL.LLLLLL.LLLLLLL.LLLL.LLL.LLL.LLLL.L.LL.LLLLLLLLLLLL.LLLL.LLL.LL.LLLLLLLLLLLLLLLLLLLLL.LL.LLL
LLLLLLLLLL.LLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLL.LLLL.LLLLLL
...L...L..L.L...L..L......L.......L.L...L...L...L.....L...L...L....L...LL..L..L.............LL.
LLL..LLLLL.LLLLLLLLLLLL.LLLLLLL.LLLLLL.LLLLLLLLLLL.LLL.LLLL.LLLLLL.LLLLLLLLLLLLLLLL.LLLLL.LLLLL
LLLLLLLLLL.LLL..LLLLLLL.L.LLLLL.LLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLL.LLL.LLLLLLLLLLLLLLLLLLLLLLLL
LLLLLL.L.L.L.LLLLLLLLLL.LLLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLL.LLLL.LLLLL.
LLLLLL.LLL.LLLLLLLLLLLL.LLLLLLL.L.LLLLLLLLLL.LLLLLLLLL.LLLL.LLLLLL.LLL.LLLL.LLLLLLL.LLLL.LLLLL.
LLLLLLLLLL.LLLLLLL.LLLL.LLLLLLL.LLLLLL.LLLLL.LLL.LLLLL.L.LL.LLLLLL.LLLLLLLL..LLLLLLLLLLL.LLLLLL
LLLLLL.LLL.LLLLLLL.LLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLL.LLLLLLLL.LLLLLLL.LLLLLLLLLLL
LLLLLLLLLL.LLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLL.LLLLLL.LLLLLLL..LLLLLLLLL.LL.LLLLLL
LLLLLLLLLLLLLLLLLLLLLL..LLLLLLL.LLLLLL.LLLLL.LL.LLLLLL.LLLLLLLLLLL.LLLLL.L.LLLLLLLLLLLLL.LLLLLL
LLLLLLLLLL.LLLLLLLLLLLL.LLLLLLL.LLLLLLL.LLLL.LLLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LL.LLLL.LLLL.LLLLLL
.L......L..L........LL..LLL...LL.L.....L..L.L..LLL..LLL..LL.LL...LLL.......L...LL...........LLL
LLLLLLLLLL.LL.LLLL.LLLL.LLLLLLL.LLLLL.LLLLLL.LLLLLLLLL.LLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLL.LLLLLL
LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLL.LLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLL.LLLLLL
LLLLLLLLLL.LLLLLLL.LLLL.LLLLLL..LLLLLL.LLLLLLLLLLLLLLL.LL.L.L.LLLLLLLLLLLLL.LLLLLLL.LLL..LLLLLL
LLLLLL.LLL.LLLLLLL.LLLLLLLLL.LL.LLLLLL.LLLLLLLLLLLLLLL.LLLL.LLLLLL.LLL.LLLL.LLLLLLL.LLLL.LLLLLL
LLLLLLLLLLLLLLLL.L.LLLL.LLLLLL..LLLLLLLLLLLL.LLLLLLL.L.LLLLLLLLLLL.LLLLLLLL.LLLLLLL.LLLL..LLLLL
LLLLLLLLLL.LLLLLLL.LLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLL.LLLLLL.LL.LLLLL.LL.L.LL.LLLLLLLLLLL
LLLLLL.LLL.LLLLLLL.LLLLLLL.LLLL.LLLLLLLLLLLL.LLLLLLLLL.LLL.LLLLLLL.LLLLLLLLLLLLLLL..LLLL.LLLLLL
LL.LLLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLL.LLLLLLLL.LLLLLLLLLLLLLL.LLLL
LLLLLLLLLL.LLLLLLL.LLLL.LLL.LLL.LLLLLL.LLLL..LLLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLL.LLLLLL
........LL.L..LLLL..L..LLLL..LLL.........L.L......LL.LL..L........L...L..LL..LLLL.L.L.....L.LL.
LL.LLLLLLL.LLLLLLL.LLLL.LLLL.LL.LLLLLLLLLLLLLLLLLLLLLL.LLLL.LLLLL..LLLLLLLLLLLLLLLL.LLLLL.L..LL
LLLLLLLLL.LLLLLLLL.LLL..LLLLLLL.LLLLLL.LLLLL.LLLLLLLLL.LLLL.LLLLLLLLLL.LLLL.LLLL.LLLLLLLLLLLLLL
LL.LLLLLLL.LLLLLLL.LLLL.LLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLL..LLL.LLLLLLLLLL.LLLL
LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLLLLL.LLLL.LLLLLL.LLL.LLL..LLLLLLL.LLLL.LLLLLL
LLL.LLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL..LLL.LLLLLLLLLL.LLLL.LLLLLL.LLLLLLLLLLLLLLLL.LLLL.LLLL.L
LLLLLLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLL.LL.LLLL..LLLLLLLLLLLLLLLLLLL
..LL..LLL.....LL......L..L.L.LLL........LL......LLL...L......L.LL..L.LL.LL.L.......LL....LL...L
.LL.LLLLLLLLLLLLLL.L.LL.LLLLLLL.LLL.LL...L.L.LLLLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLLL.LLLL.LLLLLL
L.LLLLLLLLLLLL.LLL.LLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLLLL.LLL.LLLL.LLL.LLL.LLLL.LLLLLL
LLLLLLLLLL.LLLLLLL.LLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLLLLL.LLL..L.LLLL.LLLLLLLL..LLL.LLLLLLL.LLLLLL
.LLLLLLLLL.LLL.LLL.LLLL.LLL..LLLLLLLLLLLLLLLLLLLLLLLLLL.LLL.LLLLLL.LLLLLLLL.LLLLLLL.LLLL.LLLLLL
L..L...LL...L.LL....L.LL.L..LL.L.........L.........LLLL..L.L..LL...L.L.L....LLL.....L..L.L...LL
.LLLLLLLLL.LLLL.LL.LLLL.LLLLLLLLL.LLLL.LLLLL.LLL.LLLLL.LLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLL
LLLLLLLLLL.L..LLLL.LLLL.LLLLLLL..LLLLLLLLLLL.LLLLLLLLL.LLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLL
LLLLLLLLLL.LLLLLLL.LLLL.LLLLLLL.LLLLLL.LLLLLLLL.LLLLL.LLLLLLLLLLLL.LLLLLLLL.LLLLLLL.LL.LLLLL.LL
LLLLLLLLLL.LLLLLLL.LLLL.LLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLL.LLLLLLLLLLL
L.LLLLLLLL.LLLLLLLLLLLL.LLLL.LL..LLLLL.LLLL.LLLLLL.LLLLLLLL.LLL.LLLLLLLLLLLLLLLLL.L.LLLL.LLLLLL
LLLLLLLLLL..LLLLLL.LLLLLLLLLLLL.L.LLLL.LLLLLLLLLLLLLLL.LLLL.LLLLLL..LL.LLLL.LLLLLLL.LLLL.LLLLLL
LLL.LLLLLLLLLLLLLL.LLLLLLLLLLLL.LL.LLL.LLLLL.LLLLL.LLL.LLLL.LLLLLL.LL.LLLL..LLLLLLL.LLLLLLLLLLL
LLLLLLLLLL.LLLLLLLLLLLL.LLLLLLL.LLLLLL.LLLLL.LLLLLLLL..LLLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLL.LLLLLL
L.L...L...L..L..L....L...L..LLL..L....L..LL...LLL.LL.L...L.L..L.LLL..L....L.L...LL..L..L.L..L.L
LLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLL.LLLLLL.LLLLLLLL.LLLLLLL.LLLL.LLLLLL
LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLL.L
LLLLLLLLLL.LLLLL.L.LLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLLLLL.LLLL.LLLLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLLL
L..LLLLLLLLL.LLLLL.L.LLLLLL.LLL.LLLLLL.LLLLLLLLLLLLLLL.LLLL.LLLLLL.LL.LLLLLLLLLLLLL.LLLLLLLLLLL
LLLLL.LLLL.LLLL.LL.LLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLL.LL.L.LLL.LLLLLLLLL.LL.LLLL.LLLLLL
....L....L..L.....L....L..LL....L.L..L..LL.LLL...L.....L.LLL.L.LL.....L....L.L........L.LLL....
L.L.LL.LLL.LLLLL.L.LLLL.LLLLLLL.LLLLLL.LLLLL.LLLLLLLLL.LLLL.LLLLLLLL.LLLLLLLLLLL.LL.LLLL.LLLLLL
LLLLLLLLL.LLLLLLLL.LLLL.LLLLLLL.LLLLLL.LLLLL.LL.LLLLLL.LLLL.LLLLLL.LLLLLLL.LLLLLLLL.LLLL.LLLLLL
LLLLLLLLL.LL.LLLLLLLLLL.LLLL.LLLL.LLLLLLLLLLLLLLLLLLLL..LLL.L..LLL.LLL.L.LL.LLLLLL..LLLL.LLLLLL
LLLLLLLLLL.LLLLLLL.LLLL.LLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLLLLL.LLLL.LLLLLLLLLLLL.LL.LLLLLLL.LLLL.LLLLLL
.....LL.LL.L.....LL.LL..L...L...LLLLL......L.L....LL...LLL...LLLLL..LL..L....L......L.......L.L
LLLLLLLLLL.LLLL.LL.LLLL.L.LLLLL.LLLLLL.LL.LL.LLLLLLLLL.LLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLL
LLLLLLLLLL.LLLLLLL.LLLL.LLLLLLL.LLL.LL.LLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLL.L
LLLL.LLLLL.LLLLLLL.LLLL.LLLLLLL.LLLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLL.LLLLLL
LLLLLLLLL..LLLLLLL.L.LL..LLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLL.LLL.LL.LLLLLLLL.LLLL.LLLLLLLLLLLLLL
LLLLLLLLLLLLL.LLLLLLLLL.LLLLLL..LLLLLL.LLLLL.LLLLLLLLLLL.LLLLLLLLLL.LLLLLLL.LLLLLLL.LLLLLLLLLLL
..LLL..L..L...L..L..L.L.....L............L.....L..L....L.LL......L.....L..LLL..L.L..L..........
LLL.LLLLLL.LLLLLLLLLLLL.LL.LLLLLLLLLLL.LLLLLL.LLLLLLL..LLLL.LLLL.L.L.LLLL.LLLLLLLLLLLLLLLLLLLLL
LLLLLLLLLL.LLLLLLL.LLLL.LLLLLLL.LLLLLL.LL.LL.LLLLLLLLLL.LLL.LL.LLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLL
.LLLLLLLLL.LLLL.LLLLLLLLLLLLL...LL.L.LLLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLL.L.LLLLLL
LLLL.LLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLLL.LLLLL.LLLLL.LLL.LLLL.LLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLLLL.LLLLL.LLL.L.LLLLLLLL.LLLLLL..LLLLLLLLLLL
.LLLLLLLLL.LLLLLLL.LLLL.LLLLLL..LLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLL.LLLL.LLLLLL
.L.....LL......L........L.L....LLL......L...L.LL...L...L..LL................L...L..L...........
LLLLLLLLLL.LLLLLLL.LLLL.LLLL.LL.LLLLLL.LLLL..LLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLL.LL.LLL.LLLLLLL
LLLLLL.LLL.LLLLLL..LLL..LLLLLL..LLLLLL.LLLL..LLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLL..LLLLLLLLLL
LLLLLL..LL.LLLLLLL.LLLL.LLLL.LL.LLL.LL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLL
LLLLLLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLL.LL.L.LLLLLL.L.LLLLLL.LLLLLLLLLLLLLLLL.LL
LLLLLLLLLL.LLLLLL.LLLLLLL.LLLLL.LLLLL.LLLLLL.L.LLLLLLL.LL.LLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL
LLLLLLLLLL.LLLLLLL.LLLL.LLLLLLLLLLLLLL.LLLL..LLLLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLLL.LL.L.LLLLLL
LLLLL.LLLL.LLLLLLL..LLLLLLLLLLL.LLLLLL.LLL.L.L.LLLLLLLLLLLL.LLLL.L.LLLLLLLL.LLLLLLL.LLLLLLLLLLL
....LLL...LLL.....L.L...LL...L..L....LL...L.L.LLLLL....L......LLLL......L..LLLLL.L.LL...LL..LLL
LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LL.LLL.LLLLL.LLLLLLLLL.LLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLL.LLLLLL
LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLLLL.LLLL.LLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLL
.LLLLLLLLL.L..LLLLLLLLLLLLLLLLL.LLLLLL.LLLL..LLLLLLLLL.LLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLL
LLLLLLLLLL.LLLLLLL.LLLL.L.L.LLLLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLL.LLL.LLLL.LLL.LLLLLL
LLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLL.LLLLLLLL..LLLLLL.LLLL.L.LLLL`

const FREE_SEAT = "L"

const splitLinesOnBreak = (array) => {
  return array.split(/\n/)
}

const filterEmptyValues = (array) => {
  return array.filter((value) => value)
}

const formatToBiData = (seatsRow) => {
  return seatsRow.split("").map((seat) => (seat === FREE_SEAT ? 1 : 0))
}

const _seatingAreaData = filterEmptyValues(
  splitLinesOnBreak(seatingAreaDataRaw).map((seatsRow) =>
    formatToBiData(seatsRow)
  )
)

let seatingAreaData = [..._seatingAreaData]

const getSeat = (seats, x, y) => {
  if (!seats[x]) {
    return false
  }

  return seats[x][y] === 2
}

const getNeighbouringSeats = (seats, x, y) => {
  let count = 0
  for (let prevX = x - 1; prevX <= x + 1; prevX++) {
    for (let prevY = y - 1; prevY <= y + 1; prevY++) {
      if ((prevX !== x || prevY !== y) && getSeat(seats, prevX, prevY)) {
        count++
      }
    }
  }

  return count
}

let width = seatingAreaData.length
let height = seatingAreaData[0].length
let hasChanged = true

while (hasChanged) {
  hasChanged = false
  let newSeatingAreaData = []
  for (let x = 0; x < width; x++) {
    newSeatingAreaData[x] = []
    for (let y = 0; y < height; y++) {
      if (seatingAreaData[x][y] === 0) {
        newSeatingAreaData[x][y] = 0
      } else {
        let neighbours = getNeighbouringSeats(seatingAreaData, x, y)
        if (neighbours === 0) {
          if (seatingAreaData[x][y] === 1) {
            hasChanged = true
          }
          newSeatingAreaData[x][y] = 2
        } else if (neighbours >= 4) {
          if (seatingAreaData[x][y] === 2) {
            hasChanged = true
          }
          newSeatingAreaData[x][y] = 1
        } else {
          newSeatingAreaData[x][y] = seatingAreaData[x][y]
        }
      }
    }
  }

  seatingAreaData = newSeatingAreaData
}

let count = 0
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    if (seatingAreaData[x][y] === 2) {
      count++
    }
  }
}

console.log(count)

/**
--- Part Two ---
As soon as people start to arrive, you realize your mistake. People don't just care about adjacent seats - they care about the first seat they can see in each of those eight directions!

Now, instead of considering just the eight immediately adjacent seats, consider the first seat in each of those eight directions. For example, the empty seat below would see eight occupied seats:

.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....
The leftmost empty seat below would only see one empty seat, but cannot see any of the occupied ones:

.............
.L.L.#.#.#.#.
.............
The empty seat below would see no occupied seats:

.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.
Also, people seem to be more tolerant than you expected: it now takes five or more visible occupied seats for an occupied seat to become empty (rather than four or more from the previous rules). The other rules still apply: empty seats that see no occupied seats become occupied, seats matching no rule don't change, and floor never changes.

Given the same starting layout as above, these new rules cause the seating area to shift around as follows:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#
#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##LL.LL.L#
L.LL.LL.L#
#.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLL#.L
#.L#LL#.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.#L.L#
#.L####.LL
..#.#.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
Again, at this point, people stop shifting around and the seating area reaches equilibrium. Once this occurs, you count 26 occupied seats.

Given the new visibility method and the rule change for occupied seats becoming empty, once equilibrium is reached, how many seats end up occupied?

*/

const getSeatingByNewMethod = () => {
  let width = 0
  let height = 0
  let seatingAreaData = [..._seatingAreaData]

  const getSeat = (seats, x, y, prevX, prevY) => {
    x += prevX
    y += prevY
    while (x >= 0 && x < width && y >= 0 && y < height) {
      if (seats[x][y] === 2) {
        return true
      }
      if (seats[x][y] === 1) {
        return false
      }
      x += prevX
      y += prevY
    }
    return false
  }

  const getNeighbouringSeats = (seats, x, y) => {
    let count = 0
    for (let prevX = -1; prevX <= 1; prevX++) {
      for (let prevY = -1; prevY <= 1; prevY++) {
        if ((prevX !== 0 || prevY !== 0) && getSeat(seats, x, y, prevX, prevY)) {
          count++
        }
      }
    }
    return count
  }

  width = seatingAreaData
  height = seatingAreaData[0].length;
  let hasChanged = true;

  while (hasChanged) {
    hasChanged = false
    let newSeatingAreaData = []
    for (let x = 0; x < width; x++) {
      newSeatingAreaData[x] = []
      for (let y = 0; y < height; y++) {
        if (seatingAreaData[x][y] === 0) {
          newSeatingAreaData[x][y] = 0
        } else {
          let neighbours = getNeighbouringSeats(seatingAreaData, x, y)
          if (neighbours === 0) {
            if (seatingAreaData[x][y] === 1) {
              hasChanged = true
            }
            newSeatingAreaData[x][y] = 2
          } else if (neighbours >= 5) {
            if (seatingAreaData[x][y] === 2) {
              hasChanged = true
            }
            newSeatingAreaData[x][y] = 1
          } else {
            newSeatingAreaData[x][y] = seatingAreaData[x][y]
          }
        }
      }
    }

    seatingAreaData = newSeatingAreaData
  }

  let count = 0
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (seatingAreaData[x][y] === 2) {
        count++
      }
    }
  }
  console.log(count)
}

getSeatingByNewMethod()
