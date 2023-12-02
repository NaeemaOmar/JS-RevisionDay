

// This is in the product.js pg
let i = 0;
// This is to show what the object should look like and is NOT how we're supposed make our object
// NOTE: product ID needs to start numbering from 1 not 0 since things are counted using antural not whole numbers
let object1 = {
    id: i,
    name: 'Nike Shoe',
    description: 'This is better than the original',
    price: 800,
    url: 'https://i.postimg.cc/Qx90fdhz/e-Commerce-Site.png'
}

// This is supposed to be the admin.js pg
// Eg of constructor fx for products

function ProductsConstructor(id, name, description, price, url){
    this.id = id,
    this.name = name,
    this.description = description,
    this.price = price,
    this.url = url;
}

// creating new product using constructor fx
let item2 = new ProductsConstructor(++i, 'Constructed product', "I'm curious to see how this works", 400, 'https://i.postimg.cc/Qx90fdhz/e-Commerce-Site.png');

// This empty array will store all the products
let items = [];

// Created items are being pushed into the items array
items.push(object1, item2);
localStorage.setItem("items", JSON.stringify('items'))

let item3 = new ProductsConstructor(++i, "post-localStorageItem", "I'm adding this new item to see if updating the array automatically updates the localStorage (it doesn't unless the local storage method or a customMade fx is already there)", 400, "https://i.postimg.cc/Qx90fdhz/e-Commerce-Site.png")
// Answer: updating the array does NOT automatically update the localStorage so the fx Baidah made is completely necessary

items.push(item3);
localStorage.setItem("items", JSON.stringify(items))
// NOTE: key is written as a string which is why it's in "". This is to clarify why the 'completed' class in Baidah's checklist had quotations. Because it was a string. 

// .getItem needs JSON.parse (to turn the string back into an array) AND must be set to the array to overwrite the older array info. This is particularly useful when getting the product pg to reflect the changes made in the admin pg. Ie, when the admin pg array changes, the product pg array which was getting its objects from the adminPg array will be over-written thereby reflecting the changes.

// Getting item fr local storage to the js/html.
// NOTE: w/ .setItems, JSON.stringify takes in the array as a parameter of the .setItems method (line 37) whereas with the .getItems method, JSON.parse is the method and .getItems is the parameter
// items = localStorage.getItem(JSON.parse('items'))
items = JSON.parse(localStorage.getItem('items'))
// NOTE: items is the array holding individual items called 'item' (this is the variable used in the .map mathod)


// Writing an array to a table in the HTML via JS.
// Step 1: loop through each object of the array via .map. NOTE: .map takes a fx. fx should return template literals to use the object ft's. NOTE: the first parameter of .map (irrespective of its name) will return the item itself while the 2nd parameter will return the index of that item
let table = document.querySelector('table');
let th = document.querySelector('th');
let lastHeading = document.querySelector('#lastheading');

function something(){
    let products = items.map(
    function(item, position){
        // console.log("This is the item " + item)
        // console.log("This is the position " + position)
        return `    
            <tr>
                <td>the following product is called ${item.name}, </td>
                <td>has an id of ${item.id},</td>
                <td>a price of R${item.price}</td>
                <td>and is described as ${item.description}</td>
                <td><img src="${item.url} class ="image""</td>
                <td><button class="edit">Edit</button></td>
                <td><button class="delete" value='${position}'>Delete</button></td>
            </tr>`
    })
//NOTE: the 2nd parameter that the .map method takes in is the index of the item. THUS, any time you need to reference the index of the object in the fx, use the placeholder/variable that was your 2nd parameter

// NOTE: the something() fx won't run for me unless I use window.onload. Reason = i was calling the fx inside itself making it recursive and therefore not running

// lastHeading.appendChild(products.join(''));
table.innerHTML = products.join('');
}




// Styling in JS
table.style.background = "red";

something()

// Making the delete fx actually work. step 1: add a value attribute to the actual btn. Step 2: put event.target.value as a parameter when the fx is called in the eventListener. NOTE: event.target.value acts as the index/position of the value
function remove(position){
    items.splice(position,1);
    // thereafter, run the updateLocalStorage fx that 'pushes' the changes to the local storage (.setItems). Any future uses of the array (eg, looping through the array via .map) must use the .getItems to get newest version of the array
    favourite()
    something()
    // by adding the favourite and something fx's, when an item is deleted, the array will be updated (via the something fx) and the 
}

// Attaching fx to delete Button. NOTE: eventListener DOESN'T work
// How to actually add fx to the btn. Use the parent tag that everything is being written to (in this case, table) and create an eventListener that acts as an inheritance. Use event.target.classList.contains('className') to target the class of the specific btn

table.addEventListener('click', function(){
    if(event.target.classList.contains('delete')){
        remove(event.target.value)
    }
})

function favourite(){
    localStorage.setItem('items', JSON.stringify(items));
    items = JSON.parse(localStorage.getItem("items"))
}


// line 70 attaches the new items to a table that doesnt have a heading
// line 69 in combination with line 53/54 attempts to add the tr to the last th tag but doesnt work

// in line 69, the .join allows the products array to be read as a string when displaying on the html which stops the html pg from having commas at the end


// Q: how do I style the image? I tried .style and css but it doesnt work
// let image = document.querySelectorAll('img');
// image.style.width = "200px";

// What is a callBack fx?

// This is the product pg again. most NB thing to do = get the objects-array fr the admin pg. (see: slack fr Daanyaal)
let purchased = []; // initializing empty array to put purchased items into
items = JSON.parse(localStorage.getItem('item')) //getting objects-array fr the local storage so that the products shown are dependant on whatever info was changed/removed in the admin pg
// For each object in the array, include the div w/ the different ft's of each item
main.innerHTML = items.map(function(item,index){
    return `
        <div>
            <h2>${item.name}</h2>
            <p><img src = '${item.url}'></p>
            <p>${item.description}</p>
            <p>${item.price}</p>
            <button value = '${index}' data-add>Add to cart</button>
        </div>
    `
}).join('')
// don't forget the .join to remove the random commas

// create a fx to add an item to the cart
function add(index){
    purchased.push(items[index])
    localStorage.setItem('purchased', JSON.stringify(purchased))
}

// add event to the MAIN tag (the following block of code ACTUALLY applies to <main> tag unlike the previous block of code w/ the .map)
main.addEventListener('click', function(){
    if(event.target.hasAttribute('data-add')){
        add(event.target.value)
        // Q: wtf does this line of code do?
        // A: it applies the add fx to any tag w/in main that has the data-add attribute which in this case is the buttons only
    }
})

// search
// input must compare to what they search
// Q: wtf is happening in the code block below?
// A: it's an example of what the .filter for the searchBar might look like
let a = items.filter(item => {
    return item.name == 'Nike Shoe'
})

// CHECKOUT PG
// In this pg, I need to search for the PURCHASED items NOT the objects-array. Similar to getting the objects array fr the admin pg @the products pg, create a variable that calls the purchases array from the products pg for the checkout pg
// NOTE: checked items need to be in a table THUS MUST REPLACE <main> TAG W/ A TABLE TAG. I can't do that now coz I only have 1 html pg and I already used the table for the products

// can use .reduce OR .map to get all the prices to a different array (coz .map returns an array and .reduce can find the total array) and then work out the total. NOTE: the array length of the purchased items must display on the cart. Add an extra key called quantity when making the id, name, price, etc. Set the quantity to 1 and then in the cart, add a button that increases/decreases the quantity by one. Also add a condition where IF the quantity is = 0, the item is removed from the cart

let purchased = JSON.parse(localStorage.getItem('purchased'))
let main = document.querySelector('main')
main.innerHTML = purchased.map((item, index) => {
    return `
        <tr>
            <td>${index+1}</td>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>R${item.price}"This is the price of a single item"</td>
            <td>"Wherever the "</td>
            <td>${index+1}</td>

        </tr>
    `
})


// SEARCH BAR
let a = items.filter(item => {
    return item.name == 'Nike Shoe'
    // Note: a takes in the the search input.
    // NOTE: .filter is case-sensitive THUS must use .toUpperCase OR .toLowerCase AND must use the .join method for strings because if the client types in 2 spaces but your text has 1 space then the items won't match
})