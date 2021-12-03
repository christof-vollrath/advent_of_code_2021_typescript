import {readFileInput} from "./day01.spec";

enum CourseDirection { forward, backward, down, up}

type CourseAction = {
    readonly direction: CourseDirection,
    readonly nrSteps: number
}

class SubmarinePosition {
    horizontal: number = 0
    depth: number = 0
    aim: number = 0

    move(action: CourseAction) {
        switch(action.direction) {
            case CourseDirection.forward: this.horizontal += action.nrSteps
                break
            case CourseDirection.backward: this.horizontal -= action.nrSteps
                break
            case CourseDirection.down: this.depth += action.nrSteps
                break
            case CourseDirection.up: this.depth -= action.nrSteps
                break
        }
    }
    moves(actions: CourseAction[]) {
        for (let action of actions) {
            this.move(action)
        }
    }

    move2(action: CourseAction) {
        switch(action.direction) {
            case CourseDirection.forward:
                this.horizontal += action.nrSteps
                this.depth += this.aim * action.nrSteps
                break
            case CourseDirection.backward: this.horizontal -= action.nrSteps
                break
            case CourseDirection.down: this.aim += action.nrSteps
                break
            case CourseDirection.up: this.aim -= action.nrSteps
                break
        }
    }
    moves2(actions: CourseAction[]) {
        for (let action of actions) {
            this.move2(action)
        }
    }
}

function parseCourseActions(actionsString: string): CourseAction[] {
    const actionLines = actionsString.split('\n').map( (line) => line.trim()).filter((line) => line.length != 0)
    return actionLines.map( (line) => {
        const parts = line.split(' ')
        const direction: CourseDirection = CourseDirection[parts[0] as keyof typeof CourseDirection]
        const nrSteps = parseInt(parts[1])
        return { direction: direction, nrSteps: nrSteps }
    })
}

describe("Day 02 Part One", () => {
    describe("Example", () => {
        const exampleData = `
            forward 5
            down 5
            forward 8
            up 3
            down 8
            forward 2
        `
        it("Should parse course actions", () => {
            const actions = parseCourseActions(exampleData)
            expect(actions[1]).toStrictEqual( { direction: CourseDirection.down, nrSteps: 5} )
        })
        it("Should move submarine", () => {
            const actions = parseCourseActions(exampleData)
            const submarine = new SubmarinePosition()
            submarine.moves(actions)
            expect(submarine.horizontal).toBe(15)
            expect(submarine.depth).toBe(10)
        })
    })
    describe("Exercise", () => {
        describe("Find solution", () => {
            const inputActionStrings = readFileInput("inputDay02.txt")
            const actions = parseCourseActions(inputActionStrings)
            const submarine = new SubmarinePosition()
            submarine.moves(actions)
            it ("Should have found the solution", () => {
                expect(submarine.horizontal).toBe(2007)
                expect(submarine.depth).toBe(747)
                expect(submarine.horizontal * submarine.depth).toBe(1499229)
            })
        })
    })
})

describe("Day 02 Part Two", () => {
    describe("Example", () => {
        const exampleData = `
            forward 5
            down 5
            forward 8
            up 3
            down 8
            forward 2
        `
        it("Should move submarine in a different way", () => {
            const actions = parseCourseActions(exampleData)
            const submarine = new SubmarinePosition()
            submarine.moves2(actions)
            expect(submarine.horizontal).toBe(15)
            expect(submarine.depth).toBe(60)
        })
    })
    describe("Exercise", () => {
        describe("Find solution", () => {
            const inputActionStrings = readFileInput("inputDay02.txt")
            const actions = parseCourseActions(inputActionStrings)
            const submarine = new SubmarinePosition()
            submarine.moves2(actions)
            it ("Should have found the solution", () => {
                expect(submarine.horizontal).toBe(2007)
                expect(submarine.depth).toBe(668080)
                expect(submarine.horizontal * submarine.depth).toBe(1340836560)
            })
        })
    })

})

