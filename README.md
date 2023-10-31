# Forkify-App
<!--Bu uygulamada bir yemek tarif uygulamasını The Complate Javascript Course - 'Jonas Schmedtmann' eşliğinde  oluşturdum.-->
## In this application i create a food-recipe project with forkify API.
### What you can do with this application ❔
* You can search for a **recipe**.
* You can change the **servings** of the recipe you choose to suit your needs.
* You can add a **bookmark** to the recipes you like.
* You can access a site with directions for the food you choose from the '**Directions**' button.
* You can access more recipes from the **pagination section** below the food results.
* And of course you can **add your own** recipes and access them later.

### 🔍 Here are some sample search keys to use the application :
#### 🍕 Pizza - 🍜 Soup - 🥑 Avocado - 🍝 Pasta - Dip - 🍔 Burgers - 🍞 Bread - 🍳 Cooking - And so on and so forth.

![Forkify-App](src/img/Forkify-Search.png)
<br>
### 👩‍🍳 Click on a recipe and get access to all ingredients, cooking time, number of servings and more.
<br>

![Forkify-App](src/img/Forkify-Recipe-Opened.png)

![Forkify-App](src/img/Forkify-Recipe-Ingredients.png)

## 🔴 Live version of project :
 <h3><a href="https://forkify-app-kadir.netlify.app/">Forkify-App</a></h3>

### - 🛠 Technologies I used when creating the application :
 <img src="https://img.shields.io/badge/-JavaScript-black?style=flat&logo=javascript"/> <img src="https://img.shields.io/badge/-SCSS-pink?style=flat&logo=scss"/> <img src="https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white"> <a href="https://parceljs.org/">![PARCEL](https://img.shields.io/badge/-PARCEL-orange?style=flat&logo=parcel")</a> <a href="https://forkify-api.herokuapp.com/v2"><img src="https://img.shields.io/badge/FORKIFYAPI-black"></a> <a href="https://tr.wikipedia.org/wiki/Model-View-Controller">![MVC](https://img.shields.io/badge/-MVC-white)</a>

###  Which features i do ❓
<p> I used the MVC model so that the code could be better understood, refactoring more easily, and new features could be added much more easily. </p>

* I used ***AJAX calls*** to interact with the API to get recipes and add recipe.
* I divided all my view files to code different parts of the page separately. 
* I also created a common view file for my view files, which have similar codes.
* I used the ***Subscriber - Publisher*** model to avoid breaking the MVC model structure.
* For a more organized structure, I used the Class structure in my view files.
* For a more organized structure, I used the SASS instead of CSS3.
* I created a reusable update method which updating only changed elements instead of whole section for better performance.
* I used Async - Await method to fetch AJAX calls instead of then methods for more modern structure
* For a more modern structure, I used Async - Await methods instead of 'then' methods when making AJAX calls.

### - 💻 For the installation of the project :
#### Dev-Dependencies :
* parcel@^2.10.0
* @parcel/transformer-sass@^2.10.0
#### Dependencies :
* "fracty": "^1.0.0"

