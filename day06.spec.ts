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
        let nrRecentFishs = this.count()
        for (let i = 1; i <= numberOfDays; i++) {
            this.fishes.push(...this.day())
            const nrOfFishs = this.count()
            console.log(`After day=${i} new=${nrOfFishs-nrRecentFishs} total=${nrOfFishs}`)
            nrRecentFishs = nrOfFishs
            console.log(`${this.toString()}`)
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

describe("Day 06 Part Two", () => {
    const input = readFileInput("inputDay06.txt")
    const initialDays = input.split(",").map((s) => parseInt(s))

    describe("Which entries are generated from input", () => {
        const pond = new Pond(initialDays)
        for (let i = 1; i <= 30; i++) {
            const newFishes = pond.day()
            console.log(`${i}: ${newFishes.length}`)
        }
    })

    describe("Many days", () => {
        const pond = new Pond(initialDays)
        pond.days(20) // more  will exceed stack size
    })
    describe("Exercise", () => {
        describe("Find solution", () => {
        })
    })
})

