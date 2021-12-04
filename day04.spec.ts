import {readFileInput} from "./day01.spec";

type Board = number[][]
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
        return boardStrings.split('\n').map((boardLine) => {
            const nrsRegex = new RegExp(' +')
            return boardLine.trim().split(nrsRegex).map((nrStr) => parseInt(nrStr))
        })
    })
    return { drawnNumbers: drawnNumbers, boards: boards }
}

describe("Day 04 Part One", () => {
    describe("Example", () => {
        const exampleData = `
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
        const bingoGame = parseBingoGame(exampleData)
        it("Should have parsed bingo game", () => {
            expect(bingoGame.drawnNumbers.length).toBe(27)
            expect(bingoGame.drawnNumbers[1]).toBe(4)
            expect(bingoGame.boards.length).toBe(3)
            expect(bingoGame.boards[0].length).toBe(5)
            expect(bingoGame.boards[0][0].length).toBe(5)
            expect(bingoGame.boards[0][0]).toStrictEqual([22, 13, 17, 11,  0])
        })
    })
    describe("Exercise", () => {
        describe("Find solution", () => {
            it ("Should have found the solution", () => {
            })
        })
    })
})
