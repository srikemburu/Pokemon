
var pokeName = document.getElementById("pokeName")
var pokeType = document.getElementById("pokeType")
var pokeNum = document.getElementById("pokeNum")
var pokeHeight = document.getElementById("pokeHeight")
var pokeWeight = document.getElementById("pokeWeight")
var pokeAbility1 = document.getElementById("pokeAbility1")
var pokeAbility2 = document.getElementById("pokeAbility2")
var frontPoke = document.getElementById("frontPoke")
var backPoke = document.getElementById("backPoke")
var pokeTextLookup = document.getElementById("userInput")

function handleError(response) {
    if (!response.ok) {
        // get error message from body or default to response status
        const error =  response.status
        return Promise.reject(error)
    } else {
        return response.json()
    }
} //handler function that throws any encountered error

function myFunction() {
    const element = document.querySelector("h1");
    //get the data from the url / api
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokeTextLookup.value)

    .then(handleError) // skips to .catch if error is thrown
    
    .then((data)=>{
        if(data.types.length>1){
            pokeType.textContent="Type: " + data.types[0].type.name + " and " + data.types[1].type.name
        }
        else{
            pokeType.textContent = "Type: "  + data.types[0].type.name 
        }

        if (data.abilities.length > 1){
            pokeAbility2.textContent = ('Ability 2: ' + data.abilities[1].ability.name)
        }
        else{
            pokeAbility2.textContent = 'Ability 2: None'
        }

        pokeName.textContent = "Pokemon Name: " + data.name
        pokeNum.textContent = "Pokemon ID: " + data.id
        pokeWeight.textContent = "Pokemon Weight: " + (data.weight)/10 + " Kilograms"
        pokeHeight.textContent = "Pokemon Height: " + (data.height)*10 + " Centimeters"
        pokeAbility1.textContent = "Ability 1: " + `${data.abilities[0].ability.name}`
        frontPoke.style.visibility = 'visible'
        backPoke.style.visibility = 'visible'
        frontPoke.setAttribute("src", `${data.sprites.front_default}`)
        if (data.sprites.back_default != null){
            backPoke.setAttribute("src", `${data.sprites.back_default}`)
        }
        else{
            backPoke.style.visibility = 'hidden'            
        }
    })

    .catch(error => {
        element.innerHTML = `HTTP ${error} Invalid Pokemon Name or Number`;
        pokeType.textContent="Type: "
        pokeNum.textContent = "Pokemon ID: " 
        pokeWeight.textContent = "Pokemon Weight: "
        pokeHeight.textContent = "Pokemon Height: "
        pokeAbility1.textContent = "Ability 1: "
        pokeAbility2.textContent = "Ability 2: "
        frontPoke.style.visibility = 'hidden'
        backPoke.style.visibility = 'hidden' 
    });

}  // End of my function

const element = document.getElementById("myBtn")
element.addEventListener("click", myFunction)
