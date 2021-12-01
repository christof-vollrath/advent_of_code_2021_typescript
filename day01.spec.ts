// Advent of code 2021 - day 01

import {readFileSync} from "fs";

function countIncreases(exampleData: number[]) {
    let numberIncreases = 0
    for(let i = 0; i < exampleData.length; i++) {
        const depthBefore = exampleData[i-1]
        const currentDepth = exampleData[i]
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