import {readFileInput} from "./day01.spec";

class Lanternfish {
    public daysToBirth: number

    constructor(daysToBirth: number = 8) {
        this.daysToBirth = daysToBirth
    }

    toString() {
        return this.daysToBirth.toString()
    }

    day(): Lanternfish[] {
        if (this.daysToBirth === 0) {
            this.daysToBirth = 6
            return [new Lanternfish()]
        } else {
            this.daysToBirth--
            return []
        }
    }
}

class Pond {
    public fishes: Lanternfish[]

    constructor(initalDaysToBirth: number[]) {
        this.fishes = initalDaysToBirth.map((days) => new Lanternfish(days))
    }

    day(): Lanternfish[] {
        const allNewFishes = []
        for (const fish of this.fishes) {
            const newFishs = fish.day()
            allNewFishes.push(...newFishs)
        }
        return allNewFishes;
    }

    days(numberOfDays: number) {
        for (let i = 1; i <= numberOfDays; i++) {
            this.fishes.push(...this.day())
        }
    }

    toString(): string {
        return this.fishes.map((f) => f.toString()).join(",")
    }

    count() {
        return this.fishes.length;
    }
}

const exampleDataDay04 = [3, 4, 3, 1, 2]

describe("Day 06 Part One", () => {
    describe("One lanternfish", () => {
        const lanternfish = new Lanternfish(3)
        it("Should be initalized correctly", () => {
            expect(lanternfish.daysToBirth).toBe(3)
        })
        it("Should be have days to birth 2 after one day", () => {
            const newFishes = lanternfish.day()
            expect(lanternfish.daysToBirth).toBe(2)
            expect(newFishes.length).toBe(0)
        })
        it("Should be have days to birth 6 after three more days and created a new lanternfish", () => {
            lanternfish.day(); lanternfish.day();
            const newFishes = lanternfish.day()
            expect(lanternfish.daysToBirth).toBe(6)
            expect(newFishes.length).toBe(1)
            expect(newFishes[0].daysToBirth).toBe(8)
        })

    })
    describe("Pond with one lanternfish", () => {
        const pond = new Pond([3])
        it("Should be initalized correctly", () => {
            expect(pond.fishes.length).toBe(1)
            expect(pond.fishes[0].daysToBirth).toBe(3)
        })
        it("Should simulate 5 days correctly and print resulting pond", () => {
            pond.days(5)
            expect(pond.fishes.length).toBe(2)
            expect(pond.fishes[0].daysToBirth).toBe(5)
            expect(pond.fishes[1].daysToBirth).toBe(7)
            expect(pond.toString()).toBe("5,7")
        })
    })
    describe("Example", () => {
        it("Should repeat 18 days correctly", () => {
            const pond = new Pond(exampleDataDay04)
            pond.days(18)
            expect(pond.toString()).toBe("6,0,6,4,5,6,0,1,1,2,6,0,1,1,1,2,2,3,3,4,6,7,8,8,8,8")
        })
        it("Should repeat 80 days resulting in 5934 fishs", () => {
            const pond = new Pond(exampleDataDay04)
            pond.days(80)
            expect(pond.count()).toBe(5934)
        })

    })
    describe("Exercise", () => {
        describe("Find solution", () => {
            it ("Should have found the solution", () => {
                const input = readFileInput("inputDay06.txt")
                const initialDays = input.split(",").map((s) => parseInt(s))
                const pond = new Pond(initialDays)
                pond.days(80)
                expect(pond.count()).toBe(350917)
            })
        })
    })
})

class BulkPond {
    public daysToBirth: number[] = Array<number>(9).fill(0)
    constructor(initalDaysToBirth: number[]) {
        for(const days of initalDaysToBirth) {
            this.daysToBirth[days]++
        }
    }
    day(): number[] {
        const nextDaysToBirth: number[] = Array<number>(this.daysToBirth.length).fill(0)
        for (let i = 0; i < this.daysToBirth.length; i++) {
            if (i == 0) {
                nextDaysToBirth[8] += this.daysToBirth[0]
                nextDaysToBirth[6] = this.daysToBirth[0]
            } else {
                nextDaysToBirth[i-1] += this.daysToBirth[i]
            }
        }
        return nextDaysToBirth;
    }

    days(numberOfDays: number) {
        for (let i = 1; i <= numberOfDays; i++) {
            this.daysToBirth = this.day()
        }
    }

    count(): number {
        return this.daysToBirth.reduce((sum, d) => sum + d)
    }

}

describe("Day 06 Part Two", () => {
    const input = readFileInput("inputDay06.txt")
    const initialDays = input.split(",").map((s) => parseInt(s))

    describe("Bulk pond with one lanternfish", () => {
        const pond = new BulkPond([3]) // Since all fish behaves the same and positions don't play a role we just can bulk all fish with the same daes
        it("Should be initalized correctly", () => {
            expect(pond.daysToBirth[3]).toBe(1)
            expect(pond.count()).toBe(1)
        })
        it("Should simulate 5 days correctly and print resulting pond", () => {
            pond.days(5)
            expect(pond.daysToBirth[5]).toBe(1)
            expect(pond.daysToBirth[7]).toBe(1)
            expect(pond.count()).toBe(2)
        })
        it("Should repeat 80 days resulting in 5934 fishs with example data", () => {
            const pond = new BulkPond(exampleDataDay04)
            pond.days(80)
            expect(pond.count()).toBe(5934)
        })
    })

    describe("256 days with example", () => {
        const pond = new BulkPond(exampleDataDay04)
        pond.days(256)
        expect(pond.count()).toBe(26984457539)
    })

    describe("Exercise", () => {
        describe("Find solution", () => {
            const pond = new BulkPond(initialDays)
            pond.days(256)
            expect(pond.count()).toBe(1592918715629)
        })
    })
})

