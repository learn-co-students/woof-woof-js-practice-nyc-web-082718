document.addEventListener('DOMContentLoaded', () => {

  const dogBar = document.getElementById('dog-bar')

  fetch('http://localhost:3000/pups')
  .then(data => {
    return data.json()
  })
  .then((dataObj) => {
    console.log(dataObj)

    dataObj.forEach(dog => {
      const dogSpan = document.createElement('span')

      dogSpan.innerText = dog.name

      dogBar.appendChild(dogSpan)

      dogSpan.addEventListener('click', (event) => {
        const dogInfo = document.getElementById('dog-info')

        const dogImage = document.createElement('img')
        const dogName = document.createElement('h2')
        const button = document.createElement('button')

        dogImage.src = dog.image
        dogName.innerText = dog.name
        button.innerText = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'

        dogInfo.appendChild(dogImage)
        dogInfo.appendChild(dogName)
        dogInfo.appendChild(button)

        button.addEventListener('click', (event) => {
          if (dog.isGoodDog === true){
            dog.isGoodDog = false
          } else {
            dog.isGoodDog = true
          }
          if (button.innerText === 'Good Dog!'){
            button.innerText = 'Bad Dog!'
          } else {
            button.innerText = 'Good Dog!'
          }
          fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              isGoodDog: dog.isGoodDog
            })
          })
          .then (data => {
            return data.json()
          })
          .then ((dataObj) => {
            console.log(dataObj)
          })
        })
      })
    })
  })
}) // end of DOMContentLoaded addEventListener
