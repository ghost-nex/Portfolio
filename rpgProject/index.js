import characterData from '/data.js'
import {getDiceRollArray} from '/utils.js'
import Character from '/character.js'

const wizard = new Character(characterData.hero)

let monsterArray = ["orc", "goblin", "demon"]
let monster = getNewMonster()
let isWaiting = false

function getNewMonster() {
    const nextMonsterData = characterData[monsterArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}



function attack() {
    if(isWaiting === false) {
        wizard.setDiceHtml()
        monster.setDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
    
        if(wizard.dead) {
            endGame()
        } else if (monster.dead) {
            isWaiting = true
            if(monsterArray.length > 0) {
                setTimeout(() => {
                monster = getNewMonster()
                render()
                isWaiting = false
            }, 1000)
            
            } else {
                endGame() 
            }
        }
    }
}

const endGame = () => {
    isWaiting = true
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        'No victor, all creatures are dead!'
        : monster.dead ? 'the Wizard wins!'
        : `the monsters are victorious!` 
        
    const endEmoji = endMessage === 'the Wizard wins!' ? '🔮'
        : endMessage === `the monsters are victorious!` ? "☠️"
        : "☠️"
    setTimeout(() => {
        return document.body.innerHTML = `
            <div class="end-game">
                <h2>Game Over</h2>
                <h3>${endMessage}</h3>
                <p class="end-emoji">${endEmoji}</p>
            </div>`
    }, 1500)
    
}

document.getElementById('attack-button').addEventListener('click', attack)

const render = () => {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}
render()


 