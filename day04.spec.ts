import {readFileInput} from "./day01.spec";

type Board = {
    numbers: number[][]
    marks: boolean[][]
}
type BingoGame = {
    drawnNumbers: number[]
    boards: Board[]
}
function parseBingoGame(bingoGameString: string): BingoGame {
    const partsRegex = new RegExp('\n *\n')
    const parts = bingoGameString.trim().split(partsRegex)
    const drawnNumbers = parts[0].trim().split(',').map((nrStr) => parseInt(nrStr))
    const boardsStrings = parts.slice(1, parts.length)
    const boards = boardsStrings.map((boardStrings) => {
        const boardNumbers = boardStrings.split('\n').map((boardLine) => {
            const nrsRegex = new RegExp(' +')
            return boardLine.trim().split(nrsRegex).map((nrStr) => parseInt(nrStr))
        })
        const emptyMarks = new Array<boolean[]>(boardNumbers.length)
        for (let i = 0; i < boardNumbers[0].length; i++) emptyMarks[i] = []
        return {numbers: boardNumbers, marks: emptyMarks}
    })
    return { drawnNumbers: drawnNumbers, boards: boards }
}

function markNumber(number: number, boards: Board[]) {
    for (const board of boards) {
        for (let y = 0; y < board.numbers.length; y++) {
            const row = board.numbers[y]
            for (let x = 0; x < row.length; x++) {
                const nr = row[x]
                if (nr === number) {
                    board.marks[y][x] = true
                }
            }
        }
    }
}

function markNumbers(numbers: number[], boards: Board[]) {
    for (const number of numbers) markNumber(number, boards)
}

function isMarkedRow(board: Board, row: number) {
    for (const x in board.numbers[row]) {
        if (!board.marks[row][x]) return false
    }
    return true
}

function isMarkedColumn(board: Board, column: number) {
    for (const y in board.numbers) {
        if (!board.marks[y][column]) return false
    }
    return true
}

function isBingo(boards: Board[]): Board | null {
    for (const board of boards) {
        for (let row = 0; row < board.numbers.length; row++) {
            if (isMarkedRow(board, row)) return board
        }
        for (let col = 0; col < board.numbers[0].length; col++) {
            if (isMarkedColumn(board, col)) return board
        }
    }
    return null
}

function filterBingo(boards: Board[]): boolean[] {
    const result: boolean[] = []
    for (const board of boards) {
        let bingo = false
        for (let row = 0; row < board.numbers.length; row++) {
            if (isMarkedRow(board, row)) bingo = true
        }
        for (let col = 0; col < board.numbers[0].length; col++) {
            if (isMarkedColumn(board, col)) bingo = true
        }
        result.push(bingo)
    }
    return result
}

function repeatUntilBingo(numbers: number[], boards: Board[]): [number, Board] {
    for (const number of numbers) {
        markNumber(number, boards)
        const bingoBoard = isBingo(boards)
        if (bingoBoard) return [number, bingoBoard]
    }
    throw Error("Bingo not reached")
}

function calculateResult(bingoNumber: number, board: Board) {
    function sumUnmarked(board: Board) {
        let sum = 0
        for (let y = 0; y < board.numbers.length; y++) {
            const row = board.numbers[y]
            for (let x = 0; x < row.length; x++) {
                 if (!board.marks[y][x]) sum += row[x]
            }
        }
        return sum
    }
    return sumUnmarked(board) * bingoNumber
}

function repeatUntilLastBingo(numbers: number[], boards: Board[]): [number, Board] {
    let recentBingos: boolean[]  = []
    for (const number of numbers) {
        markNumber(number, boards)
        const bingoBoards = filterBingo(boards)
        if (bingoBoards.find((b) => b === false) === undefined) { // All boards are bingo
            const bingoIndex = recentBingos.findIndex((b) => b === false) // Index of the most recent bingo board
            return [number, boards[bingoIndex]]
        }
        recentBingos = bingoBoards
    }
    throw Error("Not all boards have reached bingo")
}

const exampleDataDay04 = `
        7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1
        
        22 13 17 11  0
         8  2 23  4 24
        21  9 14 16  7
         6 10  3 18  5
         1 12 20 15 19
        
         3 15  0  2 22
         9 18 13 17  5
        19  8  7 25 23
        20 11 10 24  4
        14 21 16 12  6
        
        14 21 17 24  4
        10 16 15  9 19
        18  8 23 26 20
        22 11 13  6  5
         2  0 12  3  7
    `

describe("Day 04 Part One", () => {
    describe("Example", () => {
        it("Should have parsed bingo game", () => {
            const bingoGame = parseBingoGame(exampleDataDay04)
            expect(bingoGame.drawnNumbers.length).toBe(27)
            expect(bingoGame.drawnNumbers[1]).toBe(4)
            expect(bingoGame.boards.length).toBe(3)
            expect(bingoGame.boards[0].numbers.length).toBe(5)
            expect(bingoGame.boards[0].numbers[0].length).toBe(5)
            expect(bingoGame.boards[0].numbers[0]).toStrictEqual([22, 13, 17, 11,  0])
        })
        it("Should mark numbers", () => {
            const bingoGame = parseBingoGame(exampleDataDay04)
            markNumber(22, bingoGame.boards)
            expect(bingoGame.boards[0].marks[0][0]).toBe(true)
            expect(bingoGame.boards[0].marks[0][1]).toBeUndefined()
            expect(bingoGame.boards[1].marks[0][4]).toBe(true)
            expect(bingoGame.boards[2].marks[3][0]).toBe(true)
        })
        it("Should mark many numbers", () => {
            const bingoGame = parseBingoGame(exampleDataDay04)
            markNumbers([7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24], bingoGame.boards)
            expect(bingoGame.boards[2].numbers[0]).toStrictEqual([14, 21, 17, 24, 4])
            expect(bingoGame.boards[2].marks[0]).toStrictEqual([true, true, true, true, true])
        })
        it("Should check marked line", () => {
            const bingoGame = parseBingoGame(exampleDataDay04)
            markNumbers([7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24], bingoGame.boards)
            expect(isMarkedRow(bingoGame.boards[2], 0)).toBe(true)
        })
        it("Should check marked column", () => {
            const bingoGame = parseBingoGame(exampleDataDay04)
            markNumbers([22, 8, 21, 6, 1], bingoGame.boards)
            expect(isMarkedColumn(bingoGame.boards[0], 0)).toBe(true)
        })
        it("Should find bingo", () => {
            const bingoGame = parseBingoGame(exampleDataDay04)
            markNumbers([7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21], bingoGame.boards)
            expect(isBingo(bingoGame.boards)).toBeNull()
            markNumbers([24], bingoGame.boards)
            expect(isBingo(bingoGame.boards)).not.toBeNull()
        })
        describe("Should repeat draw until bingo", () => {
            const bingoGame = parseBingoGame(exampleDataDay04)
            const [bingoNumber, bingoBoard] = repeatUntilBingo([7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1], bingoGame.boards)
            expect(bingoNumber).toBe(24)
            expect(bingoGame.boards[2].marks[0]).toStrictEqual([true, true, true, true, true])
            it("Should calculate result", () => {
                const result = calculateResult(bingoNumber, bingoBoard)
                expect(result).toBe(4512)
            })
        })
    })
    describe("Exercise", () => {
        describe("Find solution", () => {
            it ("Should have found the solution", () => {
                const input = readFileInput("inputDay04.txt")
                const bingoGame = parseBingoGame(input)
                const [bingoNumber, bingoBoard] = repeatUntilBingo(bingoGame.drawnNumbers, bingoGame.boards)
                const result = calculateResult(bingoNumber, bingoBoard)
                expect(result).toBe(69579)
            })
        })
    })
})

describe("Day 04 Part Two", () => {
    describe("Should repeat draw until last bingo", () => {
        const bingoGame = parseBingoGame(exampleDataDay04)
        const [bingoNumber, bingoBoard] = repeatUntilLastBingo([7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1], bingoGame.boards)
        expect(bingoNumber).toBe(13)
        it("Should calculate result", () => {
            const result = calculateResult(bingoNumber, bingoBoard)
            expect(result).toBe(1924)
        })
    })
    describe("Exercise", () => {
        describe("Find solution", () => {
            it ("Should have found the solution", () => {
                const input = readFileInput("inputDay04.txt")
                const bingoGame = parseBingoGame(input)
                const [bingoNumber, bingoBoard] = repeatUntilLastBingo(bingoGame.drawnNumbers, bingoGame.boards)
                const result = calculateResult(bingoNumber, bingoBoard)
                expect(result).toBe(14877)
            })
        })
    })
})
