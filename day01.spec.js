"use strict";
// Advent of code 2021 - day 01
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileInput = void 0;
var fs_1 = require("fs");
function countIncreases(numbers) {
    var numberIncreases = 0;
    for (var i = 1; i < numbers.length; i++) {
        var depthBefore = numbers[i - 1];
        var currentDepth = numbers[i];
        if (depthBefore < currentDepth)
            numberIncreases++;
    }
    return numberIncreases;
}
function readFileInput(path) {
    return (0, fs_1.readFileSync)(path, 'utf8');
}
exports.readFileInput = readFileInput;
function readFileInputLines(path) {
    var inputData = readFileInput(path);
    return inputData.split('\n');
}
function readFileInputNumbers(path) {
    var inputLines = readFileInputLines(path);
    return inputLines.map(function (line) { return parseInt(line); });
}
describe("Day 01 Part One", function () {
    describe("Example", function () {
        var exampleData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
        it("Should count increases correctly", function () {
            expect(countIncreases(exampleData)).toBe(7);
        });
    });
    describe("Exercise", function () {
        describe("Read file input", function () {
            it("Should read input", function () {
                var inputString = readFileInput("inputDay01.txt");
                expect(inputString.length).toBe(9821);
            });
            it("Should read input lines", function () {
                var inputLines = readFileInputLines("inputDay01.txt");
                expect(inputLines.length).toBe(2000);
            });
            it("Should read input numbers", function () {
                var inputNumbers = readFileInputNumbers("inputDay01.txt");
                expect(inputNumbers.length).toBe(2000);
                expect(inputNumbers[0]).toBe(103);
            });
        });
        describe("Find solution", function () {
            var inputNumbers = readFileInputNumbers("inputDay01.txt");
            var nrIncreases = countIncreases(inputNumbers);
            it("Should have found the solution", function () {
                expect(nrIncreases).toBe(1696);
            });
        });
    });
});
function slidingWindows(numbers, windowSize) {
    var slidingWindows = [];
    for (var i1 = windowSize - 1; i1 < numbers.length; i1++) {
        var slidingWindow = [];
        for (var i2 = i1 - windowSize + 1; i2 <= i1; i2++)
            slidingWindow.push(numbers[i2]);
        slidingWindows.push(slidingWindow);
    }
    return slidingWindows;
}
function sum(numbers) {
    return numbers.reduce(function (sum, current) { return sum + current; });
}
function sums(numbersArray) {
    return numbersArray.map(function (numbers) { return sum(numbers); });
}
describe("Day 01 Part Two", function () {
    describe("Example", function () {
        var exampleData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
        it("Should find sliding windows correctly", function () {
            expect(slidingWindows(exampleData, 3)).toStrictEqual([
                [199, 200, 208],
                [200, 208, 210],
                [208, 210, 200],
                [210, 200, 207],
                [200, 207, 240],
                [207, 240, 269],
                [240, 269, 260],
                [269, 260, 263]
            ]);
        });
        it("Should calculate window sums correctly", function () {
            var s = sums(slidingWindows(exampleData, 3));
            expect(s).toStrictEqual([607, 618, 618, 617, 647, 716, 769, 792]);
        });
        it("Should calculate increases for windows correctly", function () {
            var windowSums = sums(slidingWindows(exampleData, 3));
            expect(countIncreases(windowSums)).toBe(5);
        });
    });
    describe("Find solution", function () {
        var inputNumbers = readFileInputNumbers("inputDay01.txt");
        var windowSums = sums(slidingWindows(inputNumbers, 3));
        var nrIncreases = countIncreases(windowSums);
        it("Should have found the solution", function () {
            expect(nrIncreases).toBe(1737);
        });
    });
});
//# sourceMappingURL=day01.spec.js.map