// Variables ko declare kiya
var currentCategory = 'all';
var currentBrand = 'all';
var compareList = []; // Track karne ke liye array

// Products data array

fetch("./data.json")
        .then(function (res) { 
            return res.json(); 
        })
        .then(function (data) {
            allProducts = data; // Original data safe kar liya
            applyFilters();     // Pehli baar saare products dikhane ke liye
        })
        .catch(function (err) {
            console.error("Error loading JSON:", err);
        });


function filterCategory(category) {
    currentCategory = category;

    // 1. Pehle category section ke saare buttons se active class hatao
    // (Aapke HTML me 'filterbycategory' ke baad jo 'catbtn' div hai, uske andar ke buttons)
    var catButtons = document.querySelectorAll('.filterbycategory + .catbtn .brand-btn');
    catButtons.forEach(function(btn) {
        btn.classList.remove('active-brand');
    });

    // 2. Jo button click hua hai, dhoond kar uspar active class laga do
    // 'this' event pass karne ke bajaye hum directly target attribute se bhi kar sakte hain, 
    // par event tracking ke liye event object pass karna best hota hai.
    if (event.target) {
        console.log(event.target)
        event.target.classList.add('active-brand');
    }

    applyFilters();
}

// Brand filter button click hone par
function filterBrand(brand) {
    currentBrand = brand;
    
    // 1. Pehle brand section ke saare buttons se active class hatao
    var brandButtons = document.querySelectorAll('.filterbybrand + .catbtn .brand-btn');
    brandButtons.forEach(function(btn) {
        btn.classList.remove('active-brand');
    });

    // 2. Jo button click hua hai uspar class laga do
    if (event && event.target) {
        event.target.classList.add('active-brand');
    }

    applyFilters();
}

// Main Filtration Logic (Sab se aasan tareeqa)
function applyFilters() {
    // 1. Array filter karne ki conditions
    var filtered = allProducts.filter(function (p) {
        var matchCategory = (currentCategory === 'all' || p.category === currentCategory);
        var matchBrand = (currentBrand === 'all' || p.brand === currentBrand);
        
        return matchCategory && matchBrand; // Dono conditions sahi honi chahiye
    });

    // 2. Result Count text update karna
    var countText = document.getElementById('resultCount');
    if (countText) {
        countText.innerText = "Showing " + filtered.length + " products";
    }

    // 3. Filtered data ko grid me bhejna render karne ke liye
    renderProductsGrid(filtered);
}

// HTML dynamic render karne ka function
function renderProductsGrid(data) {
    var container = document.getElementById('productsGrid');
    if (!container) return;

    var finalHTML = '';
    
    for (var i = 0; i < data.length; i++) {
        var p = data[i];

        finalHTML += '<div class="product-card">' +
            '<div class="card-top">' +
                '<div class="image-container">' +
                    '<span class="iconify product-icon" data-icon="' + p.image + '"></span>' +
                '</div>' +
                '<div class="title-brand-row">' +
                    '<h3 class="product-title">' + p.name + '</h3>' +
                    '<span class="brand-badge">' + p.brand + '</span>' +
                '</div>' +
                '<p class="product-desc">' + p.detailed + '</p>' +
            '</div>' +
            '<div class="card-bottom">' +
                '<div class="rating-row">' +
                    '<span class="iconify star-icon" data-icon="mdi:star"></span>' +
                    '<span class="rating-val">' + p.rating + '</span>' +
                '</div>' +
                '<div class="card-footer">' +
                    '<div class="price-box">' +
                        '<span class="price-label">Price</span>' +
                        '<span class="price-value">₹' + p.price.toLocaleString() + '</span>' +
                    '</div>' +
                    '<button onclick="showToast(\'Inquiry request sent for ' + p.name + '\')" class="btn-inquire">Inquire</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    container.innerHTML = finalHTML;
}