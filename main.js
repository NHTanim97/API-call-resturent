/*

1-->  arrow function create আর তার ভিতরে api call.
আর নিচে loadMeals() function call করতে হবে না হলে output দেখাবে না ।


2--> api data গুলাকে display তে show করানোর জন্য displayMela function use করা হয়েছে ।
    2.1 --> all apiMelas থেকে একটি একটি করে meal পাওয়ার জন্য for each use করা হয়েছে ।
    2.2 --> create div & class add
    2.3 --> text কমানোর জন্য slice use করা হয়েছে ।



3 --> search করে result বের করার জন্য searchBtn create করা হয়েছে ।
    3.1 --> 

*/



// step 01
const loadMeals = (search)=>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayMela(data.meals))
}


// step 02
const displayMela = (apiMeals)=>{
    const mealContainer = document.getElementById('meal-container');
    // search for empty
    mealContainer.innerHTML = ``;

    apiMeals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
        
        <div onclick="displayMealDetails(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            </div>
      </div>

        `;
        mealContainer.appendChild(mealDiv);
    });
}



    // step - 3( for search )
    const searchBtn = ()=>{ 
        const searchField = document.getElementById('input-field');
        const searchFieldValue = searchField.value;

        loadMeals(searchFieldValue);

        searchField.value = ''
    }



    // step - 4
    const displayMealDetails = (idMeal)=>{

        const urlData = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
        
        fetch(urlData)
            .then(response => response.json())
            .then(data => mealDetails(data.meals[0]))
    }



    // step - 5
    const mealDetails = (meal)=>{

        const mealDetails = document.getElementById('detail-container');
        mealDetails.innerHTML = '';
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions}</p>
            </div>
        
        `;

        mealDetails.appendChild(mealDiv);
    }



loadMeals('');