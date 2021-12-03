"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var day01_spec_1 = require("./day01.spec");
function parseDiagnosticReports(reportsString) {
    var reportLines = reportsString.split('\n').map(function (line) { return line.trim(); }).filter(function (line) { return line.length != 0; });
    return reportLines.map(function (reportLine) { return parseDiagnosticReport(reportLine); });
}
function parseDiagnosticReport(reportString) {
    var result = [];
    for (var _i = 0, reportString_1 = reportString; _i < reportString_1.length; _i++) {
        var c = reportString_1[_i];
        result.push(c);
    }
    return result;
}
function calculateCommonBit(reports, col, mostCommon, defaultValue) {
    if (mostCommon === void 0) { mostCommon = true; }
    if (defaultValue === void 0) { defaultValue = null; }
    var column = reports.map(function (line) { return line[col]; });
    var nr1 = column.filter(function (c) { return c === '1'; }).length;
    if (nr1 == reports.length / 2) {
        if (defaultValue == null)
            throw Error("no common value in col ".concat(col));
        else
            return defaultValue;
    }
    if (mostCommon) {
        if (nr1 > reports.length / 2)
            return '1';
        else
            return '0';
    }
    else {
        if (nr1 < reports.length / 2)
            return '1';
        else
            return '0';
    }
}
function calculateCommonBitForAllColumns(reports) {
    var result = [];
    for (var i = 0; i < reports[0].length; i++) {
        result.push(calculateCommonBit(reports, i));
    }
    return result;
}
function negateBits(bitString) {
    return bitString.map(function (c) {
        if (c == '1')
            return '0';
        else
            return '1';
    });
}
function powerConsumption(reports) {
    var commonBits = calculateCommonBitForAllColumns(reports);
    var gamma = parseInt(commonBits.join(''), 2);
    var epsilon = parseInt(negateBits(commonBits).join(''), 2);
    return gamma * epsilon;
}
describe("Day 03 Part One", function () {
    describe("Example", function () {
        var exampleData = "\n            00100\n            11110\n            10110\n            10111\n            10101\n            01111\n            00111\n            11100\n            10000\n            11001\n            00010\n            01010\n        ";
        var reports = parseDiagnosticReports(exampleData);
        it("Should have parsed diagnostic reports", function () {
            expect(reports.length).toBe(12);
            expect(reports[1]).toStrictEqual(['1', '1', '1', '1', '0']);
        });
        it("Should calculate most common bit for a column", function () {
            expect(calculateCommonBit(reports, 0)).toBe('1');
        });
        it("Should calculate most common bit for all columns", function () {
            var commonBits = calculateCommonBitForAllColumns(reports);
            expect(commonBits).toStrictEqual(['1', '0', '1', '1', '0']);
            expect(negateBits(commonBits)).toStrictEqual(['0', '1', '0', '0', '1']);
        });
        it("Should convert bits to string and parse them", function () {
            var commonBits = calculateCommonBitForAllColumns(reports);
            var commonBitsString = commonBits.join('');
            expect(commonBitsString).toBe('10110');
            var n = parseInt(commonBitsString, 2);
            expect(n).toBe(22);
        });
        if ("Should calculator power consumption") {
            var pc = powerConsumption(reports);
            expect(pc).toBe(198);
        }
    });
    describe("Exercise", function () {
        describe("Find solution", function () {
            it("Should have found the solution", function () {
                var input = (0, day01_spec_1.readFileInput)("inputDay03.txt");
                var reports = parseDiagnosticReports(input);
                var pc = powerConsumption(reports);
                expect(pc).toBe(4174964);
            });
        });
    });
});
function filterByColumn(reports, column, bit) {
    return reports.filter(function (report) { return report[column] === bit; });
}
function findRating(reports, mostCommon) {
    var currentReports = reports;
    var currentColumn = 0;
    while (true) {
        var bit = calculateCommonBit(currentReports, currentColumn, mostCommon, mostCommon ? '1' : '0');
        currentReports = filterByColumn(currentReports, currentColumn, bit);
        if (currentReports.length == 0)
            throw Error("No report found for column ".concat(currentColumn));
        if (currentReports.length == 1) {
            var report = currentReports[0];
            return parseInt(report.join(''), 2);
        }
        currentColumn++;
    }
}
function calculateLifeSupportRating(reports) {
    var oxygenGeneratorRating = findRating(reports, true);
    var co2ScrubberRating = findRating(reports, false);
    return oxygenGeneratorRating * co2ScrubberRating;
}
describe("Day 03 Part Two", function () {
    describe("Example", function () {
        var exampleData = "\n            00100\n            11110\n            10110\n            10111\n            10101\n            01111\n            00111\n            11100\n            10000\n            11001\n            00010\n            01010\n        ";
        var reports = parseDiagnosticReports(exampleData);
        it("Should find oxygen generator rating", function () {
            var r = findRating(reports, true);
            expect(r).toBe(23);
        });
        it("Should find CO2 scrubber rating", function () {
            var r = findRating(reports, false);
            expect(r).toBe(10);
        });
        it("Should calculate the life support rating", function () {
            var r = calculateLifeSupportRating(reports);
            expect(r).toBe(230);
        });
    });
    describe("Exercise", function () {
        describe("Find solution", function () {
            it("Should have found the solution", function () {
                var input = (0, day01_spec_1.readFileInput)("inputDay03.txt");
                var reports = parseDiagnosticReports(input);
                var r = calculateLifeSupportRating(reports);
                expect(r).toBe(4474944);
            });
        });
    });
});
//# sourceMappingURL=day03.spec.js.map