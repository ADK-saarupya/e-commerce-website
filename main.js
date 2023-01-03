import {productsArray} from "./productList.js"
let products=[...productsArray]

let search=document.querySelector("#searchItem");
let productsDisplay = document.querySelector(".products");
let viewMore=document.querySelector("#viewMore")
let popContent = document.querySelector(".popContent");
let navBar = document.querySelector("header");
let ellipses = document.querySelectorAll(".ellipse");
let cart = document.querySelector("#cart");
let purchasedItem = document.querySelector(".purchasedItem");
let purchasedItemDisplay = document.querySelector(".itemInfo");
let exit = document.querySelector(".exit");
let message=document.querySelector(".message");
let okBtn=document.querySelector(".okBtn");


window.addEventListener("DOMContentLoaded", function () {
  displayItems(products);
 
  
});

function displayItems(prod) {
  let items = prod.map(function (p) {
    return `
    <div class="productItem">
    <div class="image">
        <img src="${p.image}" class="productImage">
    </div>
    <div class="productInfo">
        <div class="productNamePrice">
            <p>${p.title}</p>
            <p class="productPrice">NRP ${p.price}</p>
        </div>
        <div class="productCart">
            <i class="fa-solid fa-cart-shopping"></i>
        </div>
    </div>

    </div>
    `;
  });
  

  let allItemList = items.join("");
  productsDisplay.innerHTML = allItemList;


//display limited item at first and expand after clicking "view more"

 displayLimitedItem("hidden");


  // display the information of a single item after clicking it 
  if(search.value==""){
    displaySingleItemInfo(products);
   viewMore.style.visibility="visible";
    
  }
  
}

let itemNumber=0;
function displaySingleItemInfo(prd){
  let productItem = document.querySelectorAll(".productItem");
 
  

  productItem.forEach(function (p, index) {
    p.addEventListener("click", function () {
      viewMore.style.visibility="hidden";
      popContent.innerHTML = `
        <div class="popUpContent">
        <div class="itemImage">
            <img src=${prd[index].image} class="productPic">
        </div>
        <div class="productInformation">
            <p class="name">${prd[index].title}</p>
            <p class="itemPrice">NPR ${prd[index].price}</p>
            <div class="colors">
                <p class="colorTitle">COLORS</p>
                <p class="color1 productColor"></p>
                <p class="color2 productColor"></p>
            </div>
            <div class="quantity">
                <label for="quantity">Quantity</label>
                <select name="quantity" id="qty" >
                    <option value=1>1</option>
                    <option value=2>2</option>
                    <option value=3>3</option>
                    <option value=4>4</option>
                </select>
            </div>
            <button class="addBtn">ADD TO CART</button>
        </div>
        <i class="fa-solid fa-x crossMark"></i>
         </div>`;
      blurBg();
      document
        .querySelector(".crossMark")
        .addEventListener("click", function () {
          viewMore.style.visibility="visible";
          popContent.innerHTML = "";
          blurBg();
          
        });

         //select quantity
         let selectedQuantity=1;
          let quantity=document.querySelector("#qty");
          quantity.addEventListener("change",function(e){
            console.log(e.target.value)
            selectedQuantity=e.target.value;
          })

      //add purchased item to the cart and display it
    
      let addBtn = document.querySelector(".addBtn");
      addBtn.addEventListener("click", function () {
        let htmlFormat = `
                <div class="purchasedProduct">
                <div class="productNamePriceImg">
                <i class="fa-solid fa-circle-xmark circleCrossMark"></i>
                    <img src=${prd[index].image}>
                    <div class="itemNamePrice">
                        <p>${prd[index].title}</p>
                        <p class="productPrice">NRP<span class="cost"> ${prd[index].price}</span></p>
                    </div>
                </div>
                <div class="itemQty">${selectedQuantity}</div>
            </div>`;

        popContent.innerHTML = "";
        purchasedItemDisplay.insertAdjacentHTML("beforeend", htmlFormat);
        message.style.visibility="visible";

        //count the number of item purchased and show it in cart icon
        itemNumber=itemNumber+1;
        cart.dataset.count=itemNumber;
        cart.style.setProperty('--cartAfterVisibility','visible');
        
        // Calculate total cost
        function calculateCost(){
        let cost = document.querySelectorAll(".cost");
        let numberOfItems=document.querySelectorAll(".itemQty")
        let arrayOfPrice = [];
        let quantities=[];

        numberOfItems.forEach(function(n){
          quantities.push(+n.innerHTML)
        })

        cost.forEach(function (c) {
          arrayOfPrice.push(+c.innerHTML);
        });
        
        let totalCost=[];
        for(let i=0;i<quantities.length;i++){
          let priceOfSingleItem=quantities[i]*arrayOfPrice[i]
          totalCost.push(priceOfSingleItem);
        }
        

        let sum = totalCost.reduce((partialSum, a) => partialSum + a, 0);

        document.querySelector(".priceTag").innerHTML = `NRP ${sum}`;
      
    }
        calculateCost();

        //remove an item from the purchased list
        let cancelBtn = document.querySelectorAll(".circleCrossMark");
        cancelBtn.forEach(function (c) {
          c.addEventListener("click", function () {
            
            c.parentElement.parentElement.remove();
            itemNumber=document.querySelectorAll(".circleCrossMark").length;
            cart.dataset.count=itemNumber;
            if(itemNumber==0){
              cart.style.setProperty('--cartAfterVisibility','hidden')
            }
            
            calculateCost();
           
          });
        });
      });
    });
  })}


//search a specific product by name

search.addEventListener("input",function(){
  let filteredProductArray=[];
  
  for(let i=0;i<products.length;i++){

    if((products[i].title.toLowerCase()).includes((search.value).toLowerCase())){
      filteredProductArray.push(products[i])
    }
  }
  if(search.value!=""){
  displayItems(filteredProductArray);
  displaySingleItemInfo(filteredProductArray);
  viewMore.style.visibility="visible";
  // displayLimitedItem("visible");
  
  
  }else{
    displayItems(products)
  }

})

//display limited item at first and expand after clicking "view more" 
function displayLimitedItem(h){
  let numberOfElement=document.querySelectorAll(".productItem");
  if(numberOfElement.length>10){
  for(let i=10;i<numberOfElement.length;i++){
    numberOfElement[i].style.visibility="hidden";
    numberOfElement[i].style.position="absolute";
    viewMore.addEventListener("click",function(){
      numberOfElement[i].style.visibility="visible";
      numberOfElement[i].style.position="static";
      viewMore.style.visibility=h;
    })
    
  }
}
}


//show purchased item list
cart.addEventListener("click", function () {
  blurBg();
  purchasedItem.style.visibility = "visible";
  viewMore.style.visibility="hidden";
});

//hide purchased Item list
exit.addEventListener("click", function () {
  purchasedItem.style.visibility = "hidden";
  blurBg();
  viewMore.style.visibility="visible";
});

// blur/unblur background
function blurBg() {
  productsDisplay.classList.toggle("blurbg");
  navBar.classList.toggle("blurbg");
  ellipses.forEach(function (e) {
    e.classList.toggle("blurbg");
  });
}

//remove successful message after clicking ok
okBtn.addEventListener("click",function(){
  message.style.visibility="hidden";
  blurBg();
  viewMore.style.visibility="visible";
})

