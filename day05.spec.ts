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

describe("Day 05 Part One", () => {
    describe("Example", () => {
        it("Should have parsed vents", () => {
            const vents = parseVents(exampleDataDay05)
            expect(vents.length).toBe(10)
            expect(vents[0]).toStrictEqual({ from: [0, 9], to: [5, 9]})
        })
    })
    describe("Exercise", () => {
        describe("Find solution", () => {
            it ("Should have found the solution", () => {
            })
        })
    })
})
