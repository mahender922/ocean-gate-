var allProducts = [];
var compareList = [];

    fetch("./data.json")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            allProducts = data;
            renderEverything();
        });


function renderEverything() {
    renderQuickAddPills();
    renderSelectedBadges();
}

function renderQuickAddPills() {
    var container = document.getElementById('pillsContainer');
    if (!container) return;

    var finalHTML = '';

    for (var i = 0; i < allProducts.length; i++) {
        var p = allProducts[i];

        var isSelected = false;
        for (var j = 0; j < compareList.length; j++) {
            if (compareList[j].id === p.id) {
                isSelected = true;
            }
        }

        var btnClass = 'pill-btn';
        if (isSelected === true) {
            btnClass = 'pill-btn selected-state';
        }

        finalHTML += '<button class="' + btnClass + '" onclick="toggleSelectProduct(' + p.id + ')">' +
                        '<i class="fa-solid fa-plus"></i> ' + p.name +
                     '</button>';
    }

    container.innerHTML = finalHTML;
}

function renderSelectedBadges() {
    var row = document.getElementById('selectedBadgesRow');
    if (!row) return;

    var finalHTML = '';

    for (var i = 0; i < compareList.length; i++) {
        var p = compareList[i];

        finalHTML += '<div class="selected-badge">' +
                        '<span>' + p.name + '</span>' +
                        '<i class="fa-solid fa-circle-xmark" onclick="toggleSelectProduct(' + p.id + ')"></i>' +
                     '</div>';
    }

    row.innerHTML = finalHTML;
}

function toggleSelectProduct(id) {
    var foundIndex = -1;
    for (var i = 0; i < compareList.length; i++) {
        if (compareList[i].id === id) {
            foundIndex = i;
        }
    }

    if (foundIndex > -1) {
        compareList.splice(foundIndex, 1);
    } else {
        if (compareList.length >= 4) {
            alert("Maximum 4 products hi compare ho sakte hain!");
            return;
        }

        for (var k = 0; k < allProducts.length; k++) {
            if (allProducts[k].id === id) {
                compareList.push(allProducts[k]);
            }
        }
    }

    renderEverything();
}

function triggerComparison() {
    var tableSection = document.getElementById('tableSection');
    
    if (compareList.length === 0) {
        alert("Pehle koi product select karein!");
        tableSection.style.display = 'none';
        return;
    }

    tableSection.style.display = 'block';

    renderCompareTable();
}

function renderCompareTable() {
    var headerHTML = '<th>SPECIFICATIONS</th>';
    
    var priceHTML = '<td>Price</td>';
    var categoryHTML = '<td>Category</td>';
    var typeHTML = '<td>Type</td>';
    var speedHTML = '<td>Speed/Standard</td>';
    var colorHTML = '<td>Color</td>';
    var warrantyHTML = '<td>Warranty</td>';
    var featuresHTML = '<td>Core Features</td>';

    for (var i = 0; i < compareList.length; i++) {
        var p = compareList[i];

        headerHTML += '<th>' + p.name + '<div style="font-size:11px; color:#6b7280; font-weight:normal; text-transform:uppercase; margin-top:4px;">' + p.brand + '</div></th>';
        
        priceHTML += '<td>₹' + p.price.toLocaleString() + '</td>';
        categoryHTML += '<td>' + (p.category ? p.category : 'N/A') + '</td>';
        typeHTML += '<td>' + (p.type ? p.type : 'N/A') + '</td>';
        speedHTML += '<td>' + (p.speed ? p.speed : 'N/A') + '</td>';
        colorHTML += '<td>' + (p.color ? p.color : 'N/A') + '</td>';
        warrantyHTML += '<td>' + (p.warranty ? p.warranty : 'N/A') + '</td>';
        featuresHTML += '<td>' + (p.detailed ? p.detailed : 'N/A') + '</td>';
    }

    document.getElementById('tableHeaderRow').innerHTML = headerHTML;
    document.getElementById('rowPrice').innerHTML = priceHTML;
    document.getElementById('rowCategory').innerHTML = categoryHTML;
    document.getElementById('rowType').innerHTML = typeHTML;
    document.getElementById('rowSpeed').innerHTML = speedHTML;
    document.getElementById('rowColor').innerHTML = colorHTML;
    document.getElementById('rowWarranty').innerHTML = warrantyHTML;
    document.getElementById('rowFeatures').innerHTML = featuresHTML;
}