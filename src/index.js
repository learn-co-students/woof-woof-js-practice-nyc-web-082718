document.addEventListener("DOMContentLoaded", function(event) {

const dogBarContainer = document.getElementById("dog-bar")
const dogInfoContainer = document.getElementById("dog-info")


  fetch("http://localhost:3000/pups/")
    .then((response) => {
      return response.json()
    })
    .then((puppyJson) => {
      puppyJson.forEach((pupper) => {
        let newPup = new Puppy(pupper)
        dogBarContainer.innerHTML += newPup.render()
      })
    })

    document.addEventListener("click", function(event) {
      if(event.target.id === "puppyName") {
        console.log(event)

      let spanId = event.target.dataset.id

      let foundDog = allPups.find((pup) => {
        return pup.id == spanId
      })

      dogInfoContainer.innerHTML = foundDog.renderProfile()
    } //end of if statment
  })

  // const pupToggleButton = document.getElementById("toggle") errored out, why?

  document.addEventListener("click", function(event) {
      if(event.target.className === "toggle") {

      let toggleButtonId = event.target.dataset.id

      let foundDog = allPups.find((pup) => {
        return pup.id == toggleButtonId
      })
      console.log(foundDog)

      foundDog.toggle()

      //send patch request, this saves to the backend
      fetch(`http://localhost:3000/pups/${toggleButtonId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
          isGoodDog: foundDog.isGoodDog //line 39 returns my pupper object with property isGoodDog
        })
      })
      .then((response) => {
        return response.json()
      })
      .then((puppyJson) => {
        dogInfoContainer.innerHTML = foundDog.renderProfile()
      })

    } //end of if statement
  })



}); //end of content loaded
