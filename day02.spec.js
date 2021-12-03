"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var day01_spec_1 = require("./day01.spec");
var CourseDirection;
(function (CourseDirection) {
    CourseDirection[CourseDirection["forward"] = 0] = "forward";
    CourseDirection[CourseDirection["backward"] = 1] = "backward";
    CourseDirection[CourseDirection["down"] = 2] = "down";
    CourseDirection[CourseDirection["up"] = 3] = "up";
})(CourseDirection || (CourseDirection = {}));
var SubmarinePosition = /** @class */ (function () {
    function SubmarinePosition() {
        this.horizontal = 0;
        this.depth = 0;
        this.aim = 0;
    }
    SubmarinePosition.prototype.move = function (action) {
        switch (action.direction) {
            case CourseDirection.forward:
                this.horizontal += action.nrSteps;
                break;
            case CourseDirection.backward:
                this.horizontal -= action.nrSteps;
                break;
            case CourseDirection.down:
                this.depth += action.nrSteps;
                break;
            case CourseDirection.up:
                this.depth -= action.nrSteps;
                break;
        }
    };
    SubmarinePosition.prototype.moves = function (actions) {
        for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
            var action = actions_1[_i];
            this.move(action);
        }
    };
    SubmarinePosition.prototype.move2 = function (action) {
        switch (action.direction) {
            case CourseDirection.forward:
                this.horizontal += action.nrSteps;
                this.depth += this.aim * action.nrSteps;
                break;
            case CourseDirection.backward:
                this.horizontal -= action.nrSteps;
                break;
            case CourseDirection.down:
                this.aim += action.nrSteps;
                break;
            case CourseDirection.up:
                this.aim -= action.nrSteps;
                break;
        }
    };
    SubmarinePosition.prototype.moves2 = function (actions) {
        for (var _i = 0, actions_2 = actions; _i < actions_2.length; _i++) {
            var action = actions_2[_i];
            this.move2(action);
        }
    };
    return SubmarinePosition;
}());
function parseCourseActions(actionsString) {
    var actionLines = actionsString.split('\n').map(function (line) { return line.trim(); }).filter(function (line) { return line.length != 0; });
    return actionLines.map(function (line) {
        var parts = line.split(' ');
        var direction = CourseDirection[parts[0]];
        var nrSteps = parseInt(parts[1]);
        return { direction: direction, nrSteps: nrSteps };
    });
}
describe("Day 02 Part One", function () {
    describe("Example", function () {
        var exampleData = "\n            forward 5\n            down 5\n            forward 8\n            up 3\n            down 8\n            forward 2\n        ";
        it("Should parse course actions", function () {
            var actions = parseCourseActions(exampleData);
            expect(actions[1]).toStrictEqual({ direction: CourseDirection.down, nrSteps: 5 });
        });
        it("Should move submarine", function () {
            var actions = parseCourseActions(exampleData);
            var submarine = new SubmarinePosition();
            submarine.moves(actions);
            expect(submarine.horizontal).toBe(15);
            expect(submarine.depth).toBe(10);
        });
    });
    describe("Exercise", function () {
        describe("Find solution", function () {
            var inputActionStrings = (0, day01_spec_1.readFileInput)("inputDay02.txt");
            var actions = parseCourseActions(inputActionStrings);
            var submarine = new SubmarinePosition();
            submarine.moves(actions);
            it("Should have found the solution", function () {
                expect(submarine.horizontal).toBe(2007);
                expect(submarine.depth).toBe(747);
                expect(submarine.horizontal * submarine.depth).toBe(1499229);
            });
        });
    });
});
describe("Day 02 Part Two", function () {
    describe("Example", function () {
        var exampleData = "\n            forward 5\n            down 5\n            forward 8\n            up 3\n            down 8\n            forward 2\n        ";
        it("Should move submarine in a different way", function () {
            var actions = parseCourseActions(exampleData);
            var submarine = new SubmarinePosition();
            submarine.moves2(actions);
            expect(submarine.horizontal).toBe(15);
            expect(submarine.depth).toBe(60);
        });
    });
    describe("Exercise", function () {
        describe("Find solution", function () {
            var inputActionStrings = (0, day01_spec_1.readFileInput)("inputDay02.txt");
            var actions = parseCourseActions(inputActionStrings);
            var submarine = new SubmarinePosition();
            submarine.moves2(actions);
            it("Should have found the solution", function () {
                expect(submarine.horizontal).toBe(2007);
                expect(submarine.depth).toBe(668080);
                expect(submarine.horizontal * submarine.depth).toBe(1340836560);
            });
        });
    });
});
//# sourceMappingURL=day02.spec.js.map