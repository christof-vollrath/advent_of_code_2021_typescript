import {readFileInput} from "./day01.spec";

function parseDiagnosticReports(reportsString: string): string[][] {
    const reportLines = reportsString.split('\n').map( (line) => line.trim()).filter((line) => line.length != 0)
    return reportLines.map( (reportLine) => parseDiagnosticReport(reportLine))
}

function parseDiagnosticReport(reportString: string): string[] {
    const result: string[] = []
    for (const c of reportString) result.push(c)
    return result
}

function calculateCommonBit(reports: string[][], col: number, mostCommon: boolean = true, defaultValue: string | null = null) {
    const column = reports.map((line) => line[col])
    const nr1 = column.filter((c) => c === '1').length
    if (nr1 == reports.length / 2) {
        if (defaultValue == null) throw Error(`no common value in col ${col}`)
        else return defaultValue
    }
    if (mostCommon) {
        if (nr1 > reports.length / 2) return '1'
        else return '0'
    } else {
        if (nr1 < reports.length / 2) return '1'
        else return '0'
    }
}

function calculateCommonBitForAllColumns(reports: string[][]): string[] {
    const result: string[] = []
    for (let i = 0; i < reports[0].length; i++) {
        result.push(calculateCommonBit(reports, i))
    }
    return result
}

function negateBits(bitString: string[]): string[] {
    return bitString.map((c) => {
        if (c == '1') return '0'
        else return '1'
    })
}

function powerConsumption(reports: string[][]): number {
    const commonBits = calculateCommonBitForAllColumns(reports)
    const gamma = parseInt(commonBits.join(''), 2)
    const epsilon = parseInt(negateBits(commonBits).join(''), 2)
    return gamma * epsilon
}

describe("Day 03 Part One", () => {
    describe("Example", () => {
        const exampleData = `
            00100
            11110
            10110
            10111
            10101
            01111
            00111
            11100
            10000
            11001
            00010
            01010
        `
        const reports = parseDiagnosticReports(exampleData)
        it("Should have parsed diagnostic reports", () => {
            expect(reports.length).toBe(12)
            expect(reports[1]).toStrictEqual( ['1', '1', '1', '1', '0'] )
        })
        it("Should calculate most common bit for a column", () => {
            expect(calculateCommonBit(reports, 0)).toBe('1')
        })
        it("Should calculate most common bit for all columns", () => {
            const commonBits = calculateCommonBitForAllColumns(reports)
            expect(commonBits).toStrictEqual(['1', '0', '1', '1', '0'])
            expect(negateBits(commonBits)).toStrictEqual(['0', '1', '0', '0', '1'])
        })
        it("Should convert bits to string and parse them", () => {
            const commonBits = calculateCommonBitForAllColumns(reports)
            const commonBitsString = commonBits.join('')
            expect(commonBitsString).toBe('10110')
            const n = parseInt(commonBitsString, 2)
            expect(n).toBe(22)
        })
        if ("Should calculator power consumption") {
            const pc = powerConsumption(reports)
            expect(pc).toBe(198)
        }
     })
    describe("Exercise", () => {
        describe("Find solution", () => {
            it ("Should have found the solution", () => {
                const input = readFileInput("inputDay03.txt")
                const reports = parseDiagnosticReports(input)
                const pc = powerConsumption(reports)
                expect(pc).toBe(4174964)
            })
        })
    })
})

function filterByColumn(reports: string[][], column: number, bit: string) {
    return reports.filter((report) => report[column] === bit)
}

function findRating(reports: string[][], mostCommon: boolean): number {
    let currentReports = reports
    let currentColumn = 0
    while(true) {
        let bit = calculateCommonBit(currentReports, currentColumn, mostCommon, mostCommon ? '1' : '0')
        currentReports = filterByColumn(currentReports, currentColumn, bit)
        if (currentReports.length == 0) throw Error(`No report found for column ${currentColumn}`)
        if (currentReports.length == 1) {
            const report = currentReports[0]
            return parseInt(report.join(''), 2)
        }
        currentColumn++
    }
}

function calculateLifeSupportRating(reports: string[][]): number {
    const oxygenGeneratorRating = findRating(reports, true)
    const co2ScrubberRating = findRating(reports, false)
    return oxygenGeneratorRating * co2ScrubberRating
}

describe("Day 03 Part Two", () => {
    describe("Example", () => {
        const exampleData = `
            00100
            11110
            10110
            10111
            10101
            01111
            00111
            11100
            10000
            11001
            00010
            01010
        `
        const reports = parseDiagnosticReports(exampleData)
        it("Should find oxygen generator rating", () => {
            const r = findRating(reports, true)
            expect(r).toBe(23)
        })
        it("Should find CO2 scrubber rating", () => {
            const r = findRating(reports, false)
            expect(r).toBe(10)
        })
        it("Should calculate the life support rating", () => {
            const r = calculateLifeSupportRating(reports)
            expect(r).toBe(230)
        })
    })
    describe("Exercise", () => {
        describe("Find solution", () => {
            it ("Should have found the solution", () => {
                const input = readFileInput("inputDay03.txt")
                const reports = parseDiagnosticReports(input)
                const r = calculateLifeSupportRating(reports)
                expect(r).toBe(4474944)
            })
        })
    })
})
