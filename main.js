let products = [
    {
        id: 1,
        image: "/Images/1.png",
        title: "JBL Headphone",
        price: "4000"
    },
    {
        id: 2,
        image: "/Images/1.png",
        title: "JBL Headphone",
        price: "5000"
    },
    {
        id: 3,
        image: "/Images/1.png",
        title: "JBL Headphone",
        price: "6000"
    },
    {
        id: 4,
        image: "/Images/1.png",
        title: "JBL Headphone",
        price: "4000"
    },
    {
        id: 5,
        image: "/Images/1.png",
        title: "JBL Headphone",
        price: "8000"
    },
    {
        id: 6,
        image: "/Images/1.png",
        title: "JBL Headphone",
        price: "4000"
    },
    {
        id: 7,
        image: "/Images/1.png",
        title: "JBL Headphone",
        price: "4000"
    },
    {
        id: 8,
        image: "/Images/1.png",
        title: "JBL Headphone",
        price: "4000"
    },
    {
        id: 9,
        image: "/Images/1.png",
        title: "JBL Headphone",
        price: "9000"
    },
    {
        id: 10,
        image: "/Images/1.png",
        title: "JBL Headphone",
        price: "4000"
    }
]
let productsDisplay = document.querySelector(".products");
let popContent = document.querySelector(".popContent")
let navBar = document.querySelector("header")
let ellipses = document.querySelectorAll(".ellipse");
let cart=document.querySelector("#cart");
let purchasedItem=document.querySelector(".purchasedItem")
let purchasedItemDisplay=document.querySelector(".itemInfo")
let exit=document.querySelector(".exit")





window.addEventListener("load", function () {
    displayItems(products);
})

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
    `
    })
    let allItemList = items.join("");
    productsDisplay.innerHTML = allItemList;
    let productItem = document.querySelectorAll(".productItem");
    
    productItem.forEach(function (p, index) {
        p.addEventListener("click", function () {
            popContent.innerHTML = `
        <div class="popUpContent">
        <div class="itemImage">
            <img src=${products[index].image} class="productPic">
        </div>
        <div class="productInformation">
            <p class="name">${products[index].title}</p>
            <p class="itemPrice">NPR ${products[index].price}</p>
            <div class="colors">
                <p class="colorTitle">COLORS</p>
                <p class="color1 productColor"></p>
                <p class="color2 productColor"></p>
            </div>
            <div class="quantity">
                <label for="quantity">Quantity</label>
                <select name="quantity" id="qty">
                    <option value=1>1</option>
                    <option value=2>2</option>
                    <option value=3>3</option>
                    <option value=4>4</option>
                </select>
            </div>
            <button class="addBtn">ADD TO CART</button>
        </div>
        <i class="fa-solid fa-x crossMark"></i>
         </div>`
            blurBg();
            document.querySelector(".crossMark").addEventListener("click", function () {
                popContent.innerHTML = "";
                blurBg();
               

            })
            let addBtn=document.querySelector(".addBtn");
            addBtn.addEventListener("click",function(){
                let htmlFormat=`
                <div class="purchasedProduct">
                <div class="productNamePriceImg">
                    <img src=${products[index].image}>
                    <div class="itemNamePrice">
                        <p>${products[index].title}</p>
                        <p class="productPrice">NRP<span class="cost"> ${products[index].price}</span></p>
                    </div>
                </div>
                <div class="itemQty">1</div>
            </div>`

            
                popContent.innerHTML = "";
                purchasedItemDisplay.insertAdjacentHTML("beforeend",htmlFormat);
                purchasedItem.style.visibility="visible";

                // Calculate total cost
                
               let cost=document.querySelectorAll(".cost")
               
               let arrayOfPrice=[];
                cost.forEach(function(c){
                        arrayOfPrice.push(+c.innerHTML);
                })
                console.log(arrayOfPrice);
                let sum=arrayOfPrice.reduce((partialSum,a)=>partialSum+a,0);
                console.log(sum);
              
               
                document.querySelector(".priceTag").innerHTML=`NRP ${sum}`;
           
            
            })

        })
    })
}
exit.addEventListener("click",function(){
    purchasedItem.style.visibility="hidden"
    blurBg();
})
cart.addEventListener("click",function(){
    blurBg();
    purchasedItem.style.visibility="visible";

})

// blur/unblur background
function blurBg() {
    productsDisplay.classList.toggle("blurbg")
    navBar.classList.toggle("blurbg")
    ellipses.forEach(function (e) {
        e.classList.toggle("blurbg")
    })
}

