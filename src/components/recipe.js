class Recipe {
    constructor(title, imageUrl, recipeUrl, ingredients) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.recipeUrl = recipeUrl;
        this.ingredients = ingredients;
    }
  
    createRecipeCard() {
      const card = document.createElement('div')
      card.className = "card"
      const img = document.createElement('img')
      img.src = this.imageUrl
      card.appendChild(img)
      const cardInfo = document.createElement('div')
      cardInfo.className = "card-info"
      const title = document.createElement('h1')
      title.innerHTML = this.title
      cardInfo.appendChild(title)
      const ingHeader = document.createElement('h3')
      ingHeader.innerHTML = "Ingredients:"
      cardInfo.appendChild(ingHeader)
      const ul = document.createElement('ul')
      for (let ingredient of this.ingredients) {
        let li = document.createElement('li')
        li.innerHTML = ingredient
        ul.appendChild(li)
      }
      cardInfo.appendChild(ul)
      const footer = document.createElement('div')
      footer.className = "card-footer"
      const link = document.createElement('a')
      link.href = this.recipeUrl
      link.innerHTML = "View Recipe Here"
      footer.appendChild(link)
      card.appendChild(cardInfo)
      card.appendChild(footer)
      document.getElementById('recipe-card-container').appendChild(card)

      var button = document.createElement('button')
      button.className = 'recipe-btn'
      button.innerHTML = "Click Me"
      card.appendChild(button)
      var counterPlaceHolder = document.createElement("counter-placeholder");
      counterPlaceHolder.innerHTML = 0
      card.appendChild(counterPlaceHolder)

      var x = 0
      button.addEventListener("click", function() {
        debugger
        x++
        counterPlaceHolder.innerHTML = x
      } )

    }

    

    // addButton() {
    //      // for each Recipe , create a button, and a number, click button, number increment by 1
    //     const button = document.createElement('button')
    //     button.className = 'recipe-btn'
    //     ca
    // }

     
  }