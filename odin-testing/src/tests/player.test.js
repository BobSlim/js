import { Player } from "#src/player";

describe("player", () => {
    test("places all ships", () => {
        const player = Player()
        expect(player.board.isAllPlaced).toBe(false)
        player.placeRemainingShips()
        expect(player.board.isAllPlaced).toBe(true)
    });
    test("correctly initializes enemies", () => {
        const player1 = Player()
        const player2 = Player()
        expect(player1.setEnemy(player2)).toBe(player2) 
        expect(player2.setEnemy(player1)).toBe(player1) 
    })
    test("fires at one square", () => {
        const player1 = Player()
        const player2 = Player()
        player1.setEnemy(player2) 
        player2.setEnemy(player1)
        expect(player1.attackEnemy([0,0])).toBe(false)
    })
    test("randomly fires at 50 squares", () => {
        const player1 = Player()
        const player2 = Player()
        player1.setEnemy(player2) 
        player2.setEnemy(player1)
        for (let index = 0; index < 50; index++) {
            player1.attackEnemy();
        }
        expect(player2.board.getHitCount()).toBe(50)
    })
    test("randomly fires at 100 squares", () => {
        const player1 = Player()
        const player2 = Player()
        player1.setEnemy(player2) 
        player2.setEnemy(player1)
        for (let index = 0; index < 100; index++) {
            player1.attackEnemy();
        }
        expect(player2.board.getHitCount()).toBe(100)
    })

})
