function getRecipe() {

    let ingredientName = document.getElementById('ingredient').value;
    if(ingredientName === '') {
        return alert('Please enter a ingredient')
    }

    let ingredientDiv = document.getElementById('ingredientRecipes');
    ingredientDiv.innerHTML = '';

    /*<li>Location: LON:${response.coord.lon}, LAT:${response.coord.lat}</li>
    <li>Main: ${response.recipe[0].main}</li>
    <li>Desc: ${response.recipe[0].description}</li>*/

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
              console.log("trying to respond");
              var response = JSON.parse(xhr.responseText)
              console.log("responding");
              ingredientDiv.innerHTML = `<h><center>Search Results for ${ingredientName} </h>`;
              console.log("still responding");
              var count = response.count;
              for(var i=0; i<count; i++){
 			        ingredientDiv.innerHTML = ingredientDiv.innerHTML +
              `<h><center><b><a href=${response.recipes[i].source_url} target=_blank> Recipe title ${response.recipes[i].title}</a></h>
              <h><center>Publisher ${response.recipes[i].publisher}</h><br>
              <img src=${response.recipes[i].image_url} style= width:400px;height:400px;>
			              <ul>
			              </ul>`
                  }
        }
    }
    xhr.open('GET', `/recipe?ingredient=${ingredientName}`, true)
    xhr.send()
}

//Attach Enter-key Handler
const ENTER=13
document.getElementById("ingredient")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        document.getElementById("submit").click();
    }
});
