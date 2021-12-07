import {readFileInput} from "./day01.spec";

function average(numbers: number[]): number {
    return numbers.reduce((sum, n) => sum + n , 0)/ numbers.length;
}

function calculateFuel(positions: number[], align: number) {
    return positions.reduce((sum, n) => sum + Math.abs(n - align), 0)
}

function calculateFuelSquarely(n: number, align: number): number {
    const dist = Math.abs(n - align)
    /*
    let result = 0
    let fuelConsumption = 1
    for (let i = 0; i < dist; i++) {
        result += fuelConsumption
        fuelConsumption++
    }
    return result

     */
    return dist * (dist+1) / 2
}

function calculateFuel2(positions: number[], align: number) {
    return positions.reduce((sum, n) => sum + calculateFuelSquarely(n, align), 0)
}

function bestAlignment(positions: number[]): number {
    const maxPosition = Math.max(...positions)
    const minPosition = Math.min(...positions)
    let bestAlign = minPosition
    let bestFuel = calculateFuel(positions, minPosition)
    for (let pos = minPosition + 1; pos <= maxPosition; pos++) {
        const currentFuel = calculateFuel(positions, pos)
        if (currentFuel < bestFuel) {
            bestFuel = currentFuel
            bestAlign = pos
        }
    }
    return bestAlign
}

function bestAlignment2(positions: number[]): number {
    // Average can be used, but rounding is an issue
    const avg = average(positions)
    const align1 = Math.floor(avg)
    const align2 = Math.ceil(avg)
    if (calculateFuel2(positions, align1) < calculateFuel2(positions, align2)) return align1
    else return align2
}

describe("Day 07 Part One", () =>{
    describe("Average", () => {
        it("Should calculate average", () => {
            expect(average([5])).toBe(5)
            expect(average([5, 1])).toBe(3)
            expect(average([5, 1, 1, 1])).toBe(2)
        })
    })
    describe("Example", () => {
        const exampleData = [16,1,2,0,4,2,7,1,2,14]
        it("Should calculate average", () => {
            expect(average(exampleData)).toBe(4.9) // average not working
        })
        it("Should calculate fuel", () => {
            expect(calculateFuel(exampleData, 2)).toBe(37)
        })
    })

    describe("Exercise", () => {
        describe("Find solution", () => {
            it ("Should have found the solution", () => {
                const input = readFileInput("inputDay07.txt")
                const inputData = input.split(",").map((s) => parseInt(s))
                const alignTo = bestAlignment(inputData)
                expect(alignTo).toBe(331)
                const fuel = calculateFuel(inputData, alignTo)
                expect(fuel).toBe(333755)
            })
        })
    })
})

describe("Day 07 Part Two", () =>{
    describe("Fuel consumption", () => {
        it("should calculate fuel consumption", () => {
            expect(calculateFuelSquarely(2, 2)).toBe(0)
        })
        it("should calculate fuel consumption", () => {
            expect(calculateFuelSquarely(2, 3)).toBe(1)
            expect(calculateFuelSquarely(2, 4)).toBe(3)
            expect(calculateFuelSquarely(2, 5)).toBe(6)
        })
    })
    describe("Example", () => {
        const exampleData = [16,1,2,0,4,2,7,1,2,14]
        it("Should calculate average", () => {
            expect(average(exampleData)).toBe(4.9) // average working, because when the fuel is growing squarely it is like calculating the center of gravity
        })
        it("Should calculate best alignment for modified fuel consumption", () => {
            expect(bestAlignment2(exampleData)).toBe(5)
        })
        it("Should calculate fuel", () => {
            expect(calculateFuel2(exampleData, 5)).toBe(168)
        })
    })

    describe("Exercise", () => {
        describe("Find solution", () => {
            it ("Should have found the solution", () => {
                const input = readFileInput("inputDay07.txt")
                const inputData = input.split(",").map((s) => parseInt(s))
                const alignTo = bestAlignment2(inputData)
                expect(alignTo).toBe(465)
                const fuel = calculateFuel2(inputData, alignTo)
                expect(fuel).toBe(94017638)
            })
        })
    })
})

