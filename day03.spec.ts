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

function calculateCommonBit(reports: string[][], col: number) {
    const column = reports.map((line) => line[col])
    const nr1 = column.filter((c) => c === '1').length
    if (nr1 == reports.length / 2) throw Error(`no common value in col ${col}`)
    if (nr1 > reports.length / 2) return '1'
    else return '0'
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
