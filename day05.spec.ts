import {readFileInput} from "./day01.spec";

type Vent = {
    from: number[]
    to: number[]
}

function parseCoords(str: string) {
    const parts = str.split(",")
    return [parseInt(parts[0]), parseInt(parts[1])]
}

function parseVent(line: string): Vent {
    const parts = line.split(" -> ")
    return {
        from: parseCoords(parts[0]),
        to: parseCoords(parts[1])
    }
}

function parseVents(ventsString: string): Vent[] {
    return ventsString.split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length != 0)
        .map((line) => parseVent(line))
}

const exampleDataDay05 = `
        0,9 -> 5,9
        8,0 -> 0,8
        9,4 -> 3,4
        2,2 -> 2,1
        7,0 -> 7,4
        6,4 -> 2,0
        0,9 -> 2,9
        3,4 -> 1,4
        0,0 -> 8,8
        5,5 -> 8,2
    `

function filterHorizontalVertical(vents: Vent[]) {
    return vents.filter((vent) => vent.to[0] ===  vent.from[0] || vent.to[1] ===  vent.from[1])
}

function fillDiagramWithVent(diagram: number[][], vent: Vent) {
    const diffX = vent.to[0] - vent.from[0]
    const diffY = vent.to[1] - vent.from[1]


    function incr(diagram: number[][], x: number, y: number) {
        let curr = diagram[y][x]
        if (curr === undefined) curr = 0
        diagram[y][x] = curr + 1
    }

    if (diffX != 0 && diffY == 0) {
        const y = vent.to[1]
        let fromX; let toX
        if (diffX < 0) {
            fromX = vent.to[0] ; toX = vent.from[0]
        } else {
            fromX = vent.from[0] ; toX = vent.to[0]
        }
        for (let x = fromX; x <= toX; x++)
            incr(diagram, x, y)
    } else if (diffY != 0 && diffX == 0) {
        const x = vent.to[0]
        let fromY; let toY
        if (diffY < 0) {
            fromY = vent.to[1] ; toY = vent.from[1]
        } else {
            fromY = vent.from[1] ; toY = vent.to[1]
        }
        for (let y = fromY; y <= toY; y++)
            incr(diagram, x, y)
    } else throw Error(`No vertical or horizontal line vent=${JSON.stringify(vent)} diffX=${diffX} diffY=${diffY}`)
}

function fillDiagram(vents: Vent[]): number[][] {

    function initDiagram(vents: Vent[]): number[][] {
        const maxY = Math.max(...(vents.map((vent) =>
            Math.max(vent.to[1], vent.from[1])
        )))
        const maxX = Math.max(...(vents.map((vent) =>
            Math.max(vent.to[0], vent.from[0])
        )))
        const result: number[][] = []
        for (let y = 0; y <= maxY; y++) {
            const row: number[] = []
            for (let x = 0; x <= maxX; x++)
                row.push(0)
            result.push(row)
        }
        return result
    }

    const diagram: number[][] = initDiagram(vents)

    for (const vent of vents)
        fillDiagramWithVent(diagram, vent)
    return diagram
}

function printDiagram(diagram: number[][]) {
    function convert0(row: number[]): string[] {
        return row.map((n) => {
            if (n == 0) return "."
            else return n.toString()
        })
    }

    const rows = diagram.map((row) => convert0(row).join("") )
    return rows.join("\n")
}

function countDangerousAreas(diagram: number[][]): number {
    function sum(numbers: number[]): number {
        return numbers.reduce((sum, current) => sum + current);
    }

    return sum(
        diagram.map((row) =>
            sum(row.map((n) => {
                if (n >= 2) return 1
                else return 0
             }))
    ))
}

describe("Day 05 Part One", () => {
    describe("Example", () => {
        describe("Parsing", () => {
            it("Should have parsed vents", () => {
                const vents = parseVents(exampleDataDay05)
                expect(vents.length).toBe(10)
                expect(vents[0]).toStrictEqual({ from: [0, 9], to: [5, 9]})
            })
        })
        describe("filter horizontal or vertical lines", () => {
            it("Should have filtered horizontal or vertical lines", () => {
                const vents = filterHorizontalVertical(parseVents(exampleDataDay05))
                expect(vents.length).toBe(6)
                expect(vents[0]).toStrictEqual({ from: [0, 9], to: [5, 9]})
            })
        })
        describe("Follow lines and fill diagram", () => {
            it("Should have filled diagram", () => {
                const diagram = printDiagram(fillDiagram(filterHorizontalVertical(parseVents(exampleDataDay05))))
                const expectedDiagram = `.......1..
..1....1..
..1....1..
.......1..
.112111211
..........
..........
..........
..........
222111....`
                expect(diagram).toBe(expectedDiagram)
            })
            describe("Follow lines, fill diagram and count dangerous areas", () => {
                it("Should count dangerous areas", () => {
                    const dangerousAreas = countDangerousAreas(fillDiagram(filterHorizontalVertical(parseVents(exampleDataDay05))))
                    expect(dangerousAreas).toBe(5)
                })
            })

        })
    })
    describe("Exercise", () => {
        describe("Find solution", () => {
            it ("Should have found the solution", () => {
                const input = readFileInput("inputDay05.txt")
                const dangerousAreas = countDangerousAreas(fillDiagram(filterHorizontalVertical(parseVents(input))))
                expect(dangerousAreas).toBe(7318)
            })
        })
    })
})
