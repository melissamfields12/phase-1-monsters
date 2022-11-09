//grab the items
document.addEventListener("DOMContentLoaded", () => {
    fetchMonster()
    createForm()
const monsterForm = document.querySelector('#monster-form')
monsterForm.addEventListener('submit', (event) => {
event.preventDefault()
let name = document.querySelector('#monster-name').value
let age = document.querySelector('#monster-age').value
let description = document.querySelector('#monster-description').value
monsterObj = {
    name,
    age,
    description,
}
console.log(monsterObj)
postNewMonster(monsterObj)
})
})

const backButton = document.querySelector('#back')
const forwardButton = document.querySelector('#forward')

// Write a function to create a monster
const createForm = () => {
    let formContainer = document.querySelector('#create-monster')
    let form = document.createElement('form')
    form.id = 'monster-form'
    let nameInput = document.createElement('input')
    let nameLabel = document.createElement('label')
    let ageInput = document.createElement('input')
    let ageLabel = document.createElement('label')
    let descriptionInput = document.createElement('input')
    let descriptionLabel = document.createElement('label')
    let h2 = document.createElement('h2')
    let button = document.createElement('button')
    button.innerText = "Create monster"
    nameInput.id = "monster-name"
    ageInput.id = "monster-age"
    descriptionInput.id = "monster-description"

    h2.innerHTML = 'Create Monster'
    nameLabel.innerText = "name..."
    ageLabel.innerText = "age..."
    descriptionLabel.innerText = "description..."

    form.append(nameLabel, nameInput, ageLabel, ageInput, descriptionLabel, descriptionInput, button)
    formContainer.append(h2, form)
}

//get the monsters
const fetchMonster = () => {
let monsterContainer = document.getElementById('monster-container')
fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
// We have the data and need to show each monsters age, name, and description - forEach showData
.then(resp => resp.json())
.then(monsterData => {
   monsterData.forEach((monster) => {
    // We need to show each of these monsters
    let card = document.createElement('div')
    let name = document.createElement('h2')
    let age  = document.createElement('h4')
    let description = document.createElement('p')
    card.append(name, age, description)
    monsterContainer.append(card)
    name.innerText = monster.name
    age.innerText = `age: ${monster.age}`
    description.innerText = `bio: ${monster.description}`
   })
})
}

const postNewMonster = ({name, age, description}) => {
    fetch('http://localhost:3000/monsters', {
    method:'POST',
    headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
            },
    body: JSON.stringify({
        name, 
        age, 
        description,
        }),
    })
    .then(resp => resp.json())
    .then(monster => console.log(monster))
}