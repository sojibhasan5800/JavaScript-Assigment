
document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=A";
    const container = document.getElementById("food-container");



        

    // Fetch data from API
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals.slice(0, 10); // Limit to 10 meal
            meal.forEach(meal => {
                const card = document.createElement("div");
                card.className = "food-card col-sm-9 col-md-4 ";

                // Populate the card with meal data
                card.innerHTML = `
                    <div class="food-img-div">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"class="food-img" />
                    </div>
                    <h3 class ="food-name">${meal.strMeal}</h3>
                    <p>Category: ${meal.strCategory || 'N/A'}</p>
                    <p>Area: ${meal.strArea || 'N/A'}</p>
                    <p>Id: ${meal.idMeal || 'N/A'}</p>
                    <p>Description: ${meal.strInstructions.slice(0,35) || 'N/A'}</p>
                    <!-- Icon buttons with links -->
    
                        <div class="icon-buttons">
                        <!-- Facebook Icon -->
                        <a href="https://www.facebook.com" target="_blank" class="icon-btn facebook-icon">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Fb" width="40" height="40" />
                        </a>
                    
                        <!-- LinkedIn Icon -->
                        <a href="https://www.linkedin.com" target="_blank" class="icon-btn linkedin-icon">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="Lkd" width="40" height="40" />
                        </a>
                      </div>


                    <button class="Details-btn" id="Details-id" onClick="showdetails(${meal.idMeal})">Details</button>
                      <button class="Add-btn" id="Add-${meal.idMeal}" onClick="AddCard('${meal.strMeal}', ${meal.idMeal})">Add To Cart</button>
                   
                `;

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error fetching the meal:", error);
        });
});


document.getElementById("search-btn").addEventListener("click", () => {
    const food_name = document.getElementById("search-bar").value.trim().toLowerCase();
    displayproductdata(food_name);
  
});



const displayproductdata = (food_name) => {
    const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=A";
    const productcontainer = document.getElementById("food-container");
    productcontainer.innerHTML = ''; 

    let flag = true;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;

            meals.forEach(meal => {
                const store_food = (meal.strCategory || '').toLowerCase();
                if (store_food.includes(food_name)) {
                    flag = false;
                    const card = document.createElement("div");
                    card.className = "food-card col-sm-9 col-md-4";
    
                    card.innerHTML = `
                        <div class="food-img-div">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="food-img" />
                        </div>
                        <h3 class ="food-name">${meal.strMeal}</h3>
                        <p>Category: ${meal.strCategory || 'N/A'}</p>
                        <p>Area: ${meal.strArea || 'N/A'}</p>
                        <p>Id: ${meal.idMeal || 'N/A'}</p>
                        <p>Description: ${meal.strInstructions.slice(0, 40) || 'N/A'}</p>

                        <div class="icon-buttons">
                        <!-- Facebook Icon -->
                        <a href="https://www.facebook.com" target="_blank" class="icon-btn facebook-icon">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Fb" width="40" height="40" />
                        </a>
                    
                        <!-- LinkedIn Icon -->
                        <a href="https://www.linkedin.com" target="_blank" class="icon-btn linkedin-icon">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="Lkd" width="40" height="40" />
                        </a>
                      </div>


 



                      <button class="Details-btn" id="Details-id" onClick="showdetails(${meal.idMeal})">Details</button>
                
                       <button class="Add-btn" id="Add-${meal.idMeal}" onClick="AddCard('${meal.strMeal}', ${meal.idMeal})">Add To Cart</button>
                    `;
    
                    productcontainer.appendChild(card);
                }
            });

            // Handle no matches
            if (flag) {
                const div = document.createElement("div");
                div.innerHTML = `<p class="not-founded">This ${food_name} name is not found</p>`;
                productcontainer.appendChild(div);
            }
        })
        .catch(error => {
            console.error("Error fetching the meal:", error);
        });
};






const AddCard = (name, id) => {

    const addedItems = JSON.parse(localStorage.getItem("addedItems")) || [];
    const addButton = document.getElementById(`Add-${id}`);
    const cardCount = document.getElementById("count-card");
    const counterDigit = document.getElementById("counter-digit");
    let currentCount = parseInt(counterDigit.innerText);

    // Prevent adding more than 11 items
    if (currentCount >= 11) {
        alert("You can only add up to 12 items!");
        return;
    }

    // If already added, do nothing
    if (addButton.innerText === "Already Added") {
        return;
    }

    // Add item to cart
    const div = document.createElement("div");
    div.className = "add-list";
    div.innerHTML = `<h4 class ="add-item-text">${name}</h4>`;
    cardCount.appendChild(div);

    // Update the counter
    counterDigit.innerText = currentCount + 1;

    // Mark item as added
    addedItems.push({ id, name });
    localStorage.setItem("addedItems", JSON.stringify(addedItems));

    // Change button text and style
    addButton.innerText = "Already Added";
    addButton.classList.add("already-added-btn");
};





const showdetails = (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0]; // Get the first meal from the response

            // Populate modal with product details
            const modalBody = document.getElementById("modal-body-content");
            modalBody.innerHTML = `
                <div class="food-img-div">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="food-img" />
                </div>
                <h3 class="food-name">${meal.strMeal}</h3>
                <p>Category: ${meal.strCategory || 'N/A'}</p>
                <p>Area: ${meal.strArea || 'N/A'}</p>
                <p>Id: ${meal.idMeal || 'N/A'}</p>
                <p>Description: ${meal.strInstructions || 'N/A'}</p>
            `;

            // Show the modal
            const detailsModal = new bootstrap.Modal(document.getElementById("detailsModal"));
            detailsModal.show();
        })
        .catch((error) => console.error("Error fetching product details:", error));
};
