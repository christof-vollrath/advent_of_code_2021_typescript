// Advent of code 2021 - day 01

import {readFileSync} from "fs";

function countIncreases(numbers: number[]) {
    let numberIncreases = 0
    for(let i = 1; i < numbers.length; i++) {
        const depthBefore = numbers[i-1]
        const currentDepth = numbers[i]
        if (depthBefore < currentDepth) numberIncreases++
    }
    return numberIncreases
}

function readFileInput(path: string) {
    return readFileSync(path, 'utf8')
}

function readFileInputLines(path: string) {
    const inputData = readFileInput(path)
    return inputData.split('\n')
}

function readFileInputNumbers(path: string) {
    const inputLines = readFileInputLines(path)
    return inputLines.map((line) => parseInt(line))
}

describe("Part One", () =>{
    describe("Example", () => {
        const exampleData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
        it("Should count increases correctly", () => {
            expect(countIncreases(exampleData)).toBe(7)
        })
    })
    describe("Exercise", () => {
        describe("Read file input", () => {
            it ("Should read input", () => {
                const inputString = readFileInput("inputDay01.txt")
                expect(inputString.length).toBe(9821)
            })
            it ("Should read input lines", () => {
                const inputLines = readFileInputLines("inputDay01.txt")
                expect(inputLines.length).toBe(2000)
            })
            it ("Should read input numbers", () => {
                const inputNumbers = readFileInputNumbers("inputDay01.txt")
                expect(inputNumbers.length).toBe(2000)
                expect(inputNumbers[0]).toBe(103)
            })
        })
        describe("Find solution", () => {
            const inputNumbers = readFileInputNumbers("inputDay01.txt")
            const nrIncreases = countIncreases(inputNumbers)
            it ("Should have found the solution", () => {
                expect(nrIncreases).toBe(1696)
            })
        })
    })
})

function slidingWindows(numbers: number[], windowSize: number) {
    let slidingWindows: number[][] = []
    for (let i1 = windowSize - 1; i1 < numbers.length; i1++) {
        let slidingWindow: number[] = []
        for (let i2 = i1 - windowSize + 1; i2 <= i1; i2++)
            slidingWindow.push(numbers[i2])
        slidingWindows.push(slidingWindow)
    }
    return slidingWindows
}

function sum(numbers: number[]): number {
    return numbers.reduce((sum, current) => sum + current)
}

function sums(numbersArray: number[][]): number[] {
    return numbersArray.map((numbers) => sum(numbers))
}

describe("Part Two", () =>{
    describe("Example", () => {
        const exampleData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
        it("Should find sliding windows correctly", () => {
            expect(slidingWindows(exampleData, 3)).toStrictEqual(
                [
                    [199, 200, 208],
                    [200, 208, 210],
                    [208, 210, 200],
                    [210, 200, 207],
                    [200, 207, 240],
                    [207, 240, 269],
                    [240, 269, 260],
                    [269, 260, 263]
                ]
            )
        })
        it("Should calculate window sums correctly", () => {
            const s = sums(slidingWindows(exampleData, 3))
            expect(s).toStrictEqual([607, 618, 618, 617,647, 716, 769, 792])
        })
        it("Should calculate increases for windows correctly", () => {
            const windowSums = sums(slidingWindows(exampleData, 3))
            expect(countIncreases(windowSums)).toBe(5)
        })
    })
    describe("Find solution", () => {
        const inputNumbers = readFileInputNumbers("inputDay01.txt")
        const windowSums = sums(slidingWindows(inputNumbers, 3))
        const nrIncreases = countIncreases(windowSums)
        it ("Should have found the solution", () => {
            expect(nrIncreases).toBe(1737)
        })
    })
})
