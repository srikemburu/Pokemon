
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
//console.log("User Input = " + pokeTextLookup.value)

const handleError = response => {
    if (!response.ok) { 
       throw Error(response.statusText);
    } else {
       return response.json();
    }
 }; //handler function that throws any encountered error

function myFunction() {
    //get the data from the url / api
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokeTextLookup.value)

    .then(handleError) // skips to .catch if error is thrown

    // use .then to handle the response/reject promise
    // .then((res)=>{
    //     return res.json()
    // })
    
    .then((data)=>{
       // console.log("data:  " + data)
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

        console.log(data.name)
        pokeName.textContent = "Pokemon Name: " + data.name
        pokeNum.textContent = "Pokemon ID: " + data.id
        pokeWeight.textContent = "Pokemon Weight: " + (data.weight)/10 + " Kilograms"
        pokeHeight.textContent = "Pokemon Height: " + (data.height)*10 + " Centimeters"
        pokeAbility1.textContent = "Ability 1: " + `${data.abilities[0].ability.name}`
        frontPoke.setAttribute("src", `${data.sprites.front_default}`)
        backPoke.setAttribute("src", `${data.sprites.back_default}`)
    })

    // .catch(console.log); // catches the error and logs it

    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

}  // End of my function

const element = document.getElementById("myBtn")
element.addEventListener("click", myFunction)
