let container = document.getElementById("container");
let loader = document.getElementById("loader");
let startButton = document.querySelector(".startButton");
let url = "https://olive-fluff-hygienic.glitch.me/categories";
let audio = new Audio("audio.mp3"); 


async function getData() {
    try {
        
        loader.style.display = "inline-grid";
        container.style.display = "none";

        
        audio.play().then(() => {
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, 4000);
        }).catch(error => console.log("Audio play blocked:", error));

       
        let response = await fetch(url);
        if (!response.ok) throw new Error("Error: " + response.status);
        let result = await response.json();

       
        localStorage.setItem("categories", JSON.stringify(result));

        
        setTimeout(() => {
            loader.style.display = "none"; 
            container.style.display = "grid"; 
            displayData(result);
        }, 4000);

    } catch (err) {
        console.error(err);
    }
}


function displayData(products) {
    container.innerHTML = ""; 

    products.forEach(({ id, category, image, description, title }) => {
        let item = document.createElement("div");
        item.className = "item";

        item.innerHTML = `
            <img src="${image}" alt="${title}" class="image">
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Description:</strong> ${description.substring(0, 80)}.....</p>
            <button onclick="getMoreData(${id})">See More</button>
        `;
        container.appendChild(item);
    });
}
function getMoreData(id) {
    window.location.href = `./more.html?id=${id}`;
}


startButton.addEventListener("click", () => {
    startButton.style.display = "none"; 
    getData(); 
});
