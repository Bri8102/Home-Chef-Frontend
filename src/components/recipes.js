class Recipes {
    constructor() {
        this.recipes = [];
        this.adapter = new RecipesAdapter();
        this.formSubmit = document.getElementById("form-submit");
        this.formButtons = document.getElementById("form-buttons");
        this.addRecipeButton = document.getElementById("add-recipe");
        this.dropDownButton = document.getElementById("filter-button");
        this.ingredientDropDown = document.getElementById("filter-dropdown");
        this.cardContainer = document.getElementById("recipe-card-container");
        this.bindEventListeners();
        this.fetchAndLoadRecipes();
    }

    fetchAndLoadRecipes() {
        this.adapter.getRecipes().then(recipes => this.createRecipes(recipes)).then(() => this.addRecipesToDom())
    }

    bindEventListeners() {
        this.formSubmit.addEventListener("click", function(event) {
          console.log(event)
            event.preventDefault();
            this.addRecipe();
        }.bind(this))

        this.addRecipeButton.addEventListener("click", function(e) {
            console.log(e)
            this.toggleForm();
            this.toggleButtons();
        }.bind(this))

        this.dropDownButton.addEventListener("click", function() {
            this.toggleDropDown();
            this.toggleButtons();
        }.bind(this))

        this.ingredientDropDown.addEventListener("change", function() {
            this.getAndLoadRandomRecipeByIngredient();
        }.bind(this))
    }

    createArrayOfRecipeIngredients(ingredients) {
        let ingredientArray = [];
        for (let ingredient of ingredients) {
            ingredientArray.push(ingredient.name);
        }
        return ingredientArray
    }

    createRecipes(recipes) {
        for (let recipe of recipes){
            let ingredients = this.createArrayOfRecipeIngredients(recipe.attributes.ingredients)
            this.recipes.push(new Recipe(recipe.attributes.title, recipe.attributes.image_url, recipe.attributes.recipe_url, ingredients))
        }
    }

    addRecipesToDom() {
       for (let recipe of this.recipes) {
           recipe.createRecipeCard()
       }
    }

    addRecipe(event) {
      debugger
        const form = event.target.parentElement
        console.log(target)
        debugger
        const ingredients = form[3].value.split(', ')
        const recipe = new Recipe(form[0].value, form[1].value, form[2].value, ingredients)
        const configurationObject = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "title": form[0].value,
              "image_url": form[1].value,
              "recipe_url": form[2].value,
              "ingredients": ingredients
           })
        };
        this.adapter.postRecipeToApi(configurationObject).then(function(json) {
            recipe.createRecipeCard();
            this.toggleButtons();
            this.toggleForm();
        }.bind(this))
    }

    hideOrShowElement(element) {
        if (element.classList.contains("hidden")) {
          element.classList.remove("hidden");
        } else {
          element.className += " hidden";
        }
      }
    
      toggleForm() {
        const form = this.formSubmit.parentElement;
        this.hideOrShowElement(form);
      }
    
      toggleButtons() {
        this.hideOrShowElement(this.formButtons);
      }
    
      toggleDropDown() {
        const dropDown = document.getElementById("filter-drop-down");
        this.hideOrShowElement(dropDown);
        new Ingredients();
      }
    
      clearRecipes() {
        this.cardContainer.innerHTML = "";
      }
    
      getAndLoadRandomRecipeByIngredient(event) {
        this.clearRecipes();
        debugger
        const ingredient = event.target.value
        console.log(event)
        debugger
        this.adapter.getRecipeByIngredient(ingredient).then(json => this.loadRandomRecipe(json.data.attributes))
      }
    
      loadRandomRecipe(recipe) {
        let ingredients = this.createArrayOfRecipeIngredients(recipe.ingredients)
        const r = new Recipe(recipe.title, recipe.image_url, recipe.recipe_url, ingredients)
        r.createRecipeCard();
      }
}