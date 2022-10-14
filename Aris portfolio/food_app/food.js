const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container')
let searchQuery = '';

const APP_ID = 'd1140c2c';
const APP_key = 'ad5c5d7232a0c3693dd5f8dbd16129a4';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data)
}

function generateHTML (results) {
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
             <h1 class="title">"${result.recipe.label}"</h1>
             <a class="view-btn" href= ${result.recipe.url}>View Recipe</a>
             </div>
             <p class="item-data">"Calories: ${result.recipe.calories.toFixed(0)} kcal"</p>
            <p class="item-data">"Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels: 'No Data Found'}"</p>
             <p class="item-data">"Meal Type: ${result.recipe.mealType}"</p>
         </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}