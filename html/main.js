
var currentCategory = 'all';
var currentBrand = 'all';
var compareList = []; 


fetch("./data.json")
        .then(function (res) { 
            return res.json(); 
        })
        .then(function (data) {
            allProducts = data; 
            applyFilters();     
        })
        .catch(function (err) {
            console.error("Error loading JSON:", err);
        });


function filterCategory(category) {
    currentCategory = category;

    var catButtons = document.querySelectorAll('.filterbycategory + .catbtn .brand-btn');
    catButtons.forEach(function(btn) {
        btn.classList.remove('active-brand');
    });

    if (event.target) {
        console.log(event.target)
        event.target.classList.add('active-brand');
    }

    applyFilters();
}


function filterBrand(brand) {
    currentBrand = brand;
   
    var brandButtons = document.querySelectorAll('.filterbybrand + .catbtn .brand-btn');
    brandButtons.forEach(function(btn) {
        btn.classList.remove('active-brand');
    });

    if (event && event.target) {
        event.target.classList.add('active-brand');
    }

    applyFilters();
}

function applyFilters() {

    var filtered = allProducts.filter(function (p) {
        var matchCategory = (currentCategory === 'all' || p.category === currentCategory);
        var matchBrand = (currentBrand === 'all' || p.brand === currentBrand);
        
        return matchCategory && matchBrand; 
    });


    var countText = document.getElementById('resultCount');
    if (countText) {
        countText.innerText = "Showing " + filtered.length + " products";
    }

    renderProductsGrid(filtered);
}

function renderProductsGrid(data) {
    var container = document.getElementById('productsGrid');
    if (!container) return;

    var finalHTML = '';
    
    for (var i = 0; i < data.length; i++) {
        var p = data[i];

        finalHTML += '<div class="product-card">' +
            '<div class="card-top">' +
                '<div class="image-container">' +
                    // Yahan icon hata kar standard img tag laga diya hai
                    '<img src="' + p.image + '" alt="' + p.name + '" class="product-img">' +
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