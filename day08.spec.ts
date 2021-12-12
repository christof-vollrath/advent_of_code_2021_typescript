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
