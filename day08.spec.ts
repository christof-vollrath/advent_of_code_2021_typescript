import {readFileInput} from "./day01.spec";

const exampleDataDay08 = `
    be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
    edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
    fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
    fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
    aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
    fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
    dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
    bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
    egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
    gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
    `

type SignalEntry = {
    uniqueSignalPatterns: string[]
    fourDigitOutputValues: string[]
}

function parseSignalEntries(inputString: string): SignalEntry[] {
    const lines = inputString.split("\n").map((line) => line.trim()).filter((line) => line.length > 0)
    return lines.map((line) => {
        const parts = line.split(" | ")
        const signalPatternsString = parts[0]
        const digitOutputString = parts[1]
        const uniqueSignalPatterns = signalPatternsString.split(" ").map((s) => s.trim())
        const fourDigitOutputValues = digitOutputString.split(" ").map((s) => s.trim())
        return { uniqueSignalPatterns: uniqueSignalPatterns, fourDigitOutputValues: fourDigitOutputValues }
    })
}

function groupByLength(strings: string[]): string[][] {
    const result: string[][] = []
    for(const str of strings) {
        const len = str.length
        if (result[len] === undefined) {
            result[len] = [str]
        } else {
            result[len].push(str)
        }
    }
    return result
}

function uniqueNumberOfSegementsForString(uniqueSignalPatterns: string[], fourDigitOutputValues: string[]): string[] {
    const groupedByLength = groupByLength(uniqueSignalPatterns)
    const result: string[] = []
    for (const value of fourDigitOutputValues) {
        const sameLengthStrings = groupedByLength[value.length]
        if (sameLengthStrings.length === 1) result.push(value)
    }
    return result
}

function countUniqueNumberOfSegments(signalEntries: SignalEntry[]) {
    let result = 0
    for (const signalEntry of signalEntries) {
        const uniques = uniqueNumberOfSegementsForString(signalEntry.uniqueSignalPatterns, signalEntry.fourDigitOutputValues)
        result += uniques.length
    }
    return result
}

describe("Day 08 Part One", () => {
    describe("Parse signal entries", () => {
        it("Should parse signal entries", () => {
            const signalEntries = parseSignalEntries(exampleDataDay08)
            expect(signalEntries.length).toBe(10)
            expect(signalEntries[0].uniqueSignalPatterns).toStrictEqual(["be", "cfbegad", "cbdgef", "fgaecd", "cgeb", "fdcge", "agebfd", "fecdb", "fabcd", "edb"])
            expect(signalEntries[0].fourDigitOutputValues).toStrictEqual(["fdgacbe", "cefdb", "cefbgd", "gcbe"])
        })
    })
    describe("Find unique number of segments for strings", () => {
        const uniqueSignalPatterns = ["be", "cfbegad", "cbdgef", "fgaecd", "cgeb", "fdcge", "agebfd", "fecdb", "fabcd", "edb"]
        const fourDigitOutputValues = ["fdgacbe", "cefdb", "cefbgd", "gcbe"]
        it("should count correctly", () => {
            const result = uniqueNumberOfSegementsForString(uniqueSignalPatterns, fourDigitOutputValues)
            expect(result).toStrictEqual(["fdgacbe", "gcbe"])
        })
    })
    describe("Count unique number of segments", () => {
        it("Should count correctly", () => {
            const signalEntries = parseSignalEntries(exampleDataDay08)
            const count = countUniqueNumberOfSegments(signalEntries)
            expect(count).toBe(26)
        })
    })

    describe("Exercise", () => {
        describe("Find solution", () => {
            it ("Should have found the solution", () => {
                const input = readFileInput("inputDay08.txt")
                const signalEntries = parseSignalEntries(input)
                const count = countUniqueNumberOfSegments(signalEntries)
                expect(count).toBe(330)
            })
        })
    })
})

function sortString(s: string) {
    return s.split("").sort().join("")
}

function permutations<T>(input: T[]): T[][] {
    if (input.length == 0) return []
    if (input.length == 1) return [input]
    else {
        const first = input[0]
        const restPermutations = permutations(input.slice(1))
        const result: T[][] = []
        for (const perm of restPermutations) {
            for (let i = 0; i <= perm.length; i++) {
                const newPerm = perm.slice(0, i)
                newPerm.push(first)
                newPerm.push(...perm.slice(i))
                result.push(newPerm)
            }
        }
        return result
    }
}

function decodeInput(input: string, table: string[][]): string {
    const splittedInput = input.split("")
    const splittedResult = []
    const conversionTable = new Map<string, string>()
    for (const tableEntry of table) {
        conversionTable.set(tableEntry[0], tableEntry[1])
    }
    for (const c of splittedInput) {
        splittedResult.push(conversionTable.get(c))
    }
    return splittedResult.join("")
}
const sevenSegmentCodes = new Map<string, number>([
    ["abcefg", 0], ["cf", 1], ["acdeg", 2], ["acdfg", 3], ["bcdf", 4], ["abdfg", 5], ["abdefg", 6], ["acf", 7], ["abcdefg", 8], ["abcdfg", 9]
])

function decodeSevenSegmentCode(string: string) {
    return sevenSegmentCodes.get(sortString(string))

}
const validSevenSegmentCodes = Array.from(sevenSegmentCodes.keys())

function checkValidCode(code: string): boolean {
    return validSevenSegmentCodes.includes(sortString(code))
}

function createAllDecodingTables(): string[][][] {
    const inputs = ["a", "b", "c", "d", "e", "f", "g"]
    const allPermutations = permutations(inputs)
    const result = []
    for (const permutation of allPermutations) {
        const decodingTable: string[][] = []
        for (let i = 0; i < inputs.length; i++)
            decodingTable.push([inputs[i], permutation[i]])
        result.push(decodingTable)
    }
    return result
}

function validDecodingTable(inputs: string[], t: string[][]) {
    for (const input of inputs) {
        const decoded = decodeInput(input, t)
        if (! checkValidCode(decoded)) return false
    }
    return true
}

function filterValidDecodingTables(input: string[], decodingTables: string[][][]) {
    const result: string[][][] = []
    for(const t of decodingTables) {
        if (validDecodingTable(input, t)) result.push(t)
    }
    return result
}


function decodeSevenSegmentInput(input: string, decodingTable: string[][]): number {
    const decodedString = decodeInput(input, decodingTable)
    const result = decodeSevenSegmentCode(decodedString)
    if (result === undefined) throw ("Error: no decoding for " + input)
    return result

}

function decodeEntry(uniqueSignalPatterns: string[], fourDigitOutputValues: string[], decodingTables: string[][][]) {
    const validDecodingTables = filterValidDecodingTables(uniqueSignalPatterns, decodingTables)
    expect(validDecodingTables.length).toBe(1) // Should have a unique decoding table
    const validDecodingTable = validDecodingTables[0]
    const decodedValues: number[] = []
    for (const value of fourDigitOutputValues) {
        const decodedValue = decodeSevenSegmentInput(value, validDecodingTable)
        decodedValues.push(decodedValue)
    }
    const helperString = decodedValues.join("")
    return parseInt(helperString)
}

function decodeAndSum(signalEntries: SignalEntry[]): number {
    const decodingTables = createAllDecodingTables()
    let result = 0
    for (const signalEntry of signalEntries) {
        const decoded = decodeEntry(signalEntry.uniqueSignalPatterns, signalEntry.fourDigitOutputValues, decodingTables)
        result += decoded
    }
    return result
}

describe("Day 08 Part One", () => {
    describe("Sort string", () => {
        it("Should sort a string", () => {
            expect(sortString("basg")).toBe("abgs")
        })
    })
    describe("Permutations", () => {
        it("Should create all permutations", () => {
            expect(permutations([])).toStrictEqual([])
            expect(permutations(["a"])).toStrictEqual([["a"]])
            expect(permutations(["a", "b"])).toStrictEqual([["a", "b"], ["b", "a"]])
            expect(permutations(["a", "b", "c"])).toStrictEqual([["a", "b", "c"], ["b", "a", "c"], ["b", "c", "a"], ["a", "c", "b"], ["c", "a", "b"], ["c", "b", "a"]])
            expect(permutations(["a", "b", "c", "d", "e", "f"]).length).toBe(720)
        })
    })
    describe("Decode", () => {
        const table = [["d", "a"], ["e", "b"], ["a", "c"], ["f", "d"], ["g", "e"], ["b", "f"], ["c", "g"]]
        it("Should decode input correctly", () => {
            const decoded = decodeInput("acedgfb", table)
            expect(decoded).toBe("cgbaedf")
        })
    })

    describe("Find valid codes", () => {
        it("Should validate correct codes", () => {
            expect(checkValidCode("acdeg")).toBe(true)
            expect(checkValidCode("dbcf")).toBe(true)
        })
        it("Should reject incorrect codes", () => {
            expect(checkValidCode("adeg")).toBe(false)
        })
    })

    describe("Find all deoding tables", () => {
        const decodingTables = createAllDecodingTables()
        it("Should have created all decoding tables", () => {
            expect(decodingTables.length).toBe(5040)
            const simpleDecodingTable = decodingTables[0]
            expect(simpleDecodingTable[0]).toStrictEqual(["a", "a"])
        })
    })

    describe("Find decoding table", () => {
        const input = ["acedgfb", "cdfbe", "gcdfa", "fbcad", "dab", "cefabd", "cdfgeb", "eafb", "cagedb", "ab"]
        it("Should find a valid decoding", () => {
            const decodingTables = createAllDecodingTables()
            const validDecodingTables = filterValidDecodingTables(input, decodingTables)
            expect(validDecodingTables.length).toBe(1) // Should have a unique decoding table
            const validDecodingTable = validDecodingTables[0]
            const decodedInput = decodeSevenSegmentInput("cdfeb", validDecodingTable)
            expect(decodedInput).toBe(5)
        })
    })

    describe("Decode Entry", () => {
        const uniqueSignalPatterns = ["be", "cfbegad", "cbdgef", "fgaecd", "cgeb", "fdcge", "agebfd", "fecdb", "fabcd", "edb"]
        const fourDigitOutputValues = ["fdgacbe", "cefdb", "cefbgd", "gcbe"]
        it("Should decode entry correctly", () => {
            const decodingTables = createAllDecodingTables()
            expect(decodeEntry(uniqueSignalPatterns, fourDigitOutputValues, decodingTables)).toBe(8394)
        })
    })

    describe("Decode and sum", () => {
        it("Should calculate the sum for the example", () => {
            const signalEntries = parseSignalEntries(exampleDataDay08)
            const sum = decodeAndSum(signalEntries)
            expect(sum).toBe(61229)
        })
    })
    describe("Exercise", () => {
        describe("Find solution", () => {
            it ("Should have found the solution", () => {
                const input = readFileInput("inputDay08.txt")
                const signalEntries = parseSignalEntries(input)
                const sum = decodeAndSum(signalEntries)
                expect(sum).toBe(1010472)
            })
        })
    })

})

