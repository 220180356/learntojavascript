var productNameInput = document.getElementById("productName")
var productPriceInput = document.getElementById("productPrice")
var productCategoryInput = document.getElementById("productCategory")
var productDescriptionInput = document.getElementById("productDescription")
var productSearchInput=document.getElementById("searchInput")

var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var indexUpdate = 0;
var productContainer = []
// var productContainer = JSON.parse(localStorage.getItem("products")) || [];
// displayData()

if(localStorage.getItem("products")){
    var productContainer = JSON.parse(localStorage.getItem("products")) || [];
displayData()
}
    
function addProduct(){
    var product ={
             name : productNameInput.value,
             price : productPriceInput.value,
             category : productCategoryInput.value,
             description : productDescriptionInput.value,
    }
   
    console.log(product);
    productContainer.push(product)
    localStorage.setItem("products",JSON.stringify(productContainer))
    // console.log(productContainer);
    displayData()
    clearForm()
}

function displayData(){
    var cartona ='';
    for(var i=0;i<productContainer.length;i++){
            cartona+=`
            <tr >
                        <td> ${productContainer[i].name} </td>
                        <td> ${productContainer[i].price} </td>
                        <td> ${productContainer[i].category} </td>
                        <td> ${productContainer[i].description} </td>
                        <td>
                            <button class="btn btn-outline-warning" onclick="setData(${i})">Update</button>
                            <button class="btn btn-outline-danger"  onclick="deleteProduct(${i})">Delete</button> 
                        </td>
                    </tr>
                    `
                document.getElementById("data").innerHTML=cartona
    }
    
}


function deleteProduct(elemntNumber){
    productContainer.splice(elemntNumber,1)
    localStorage.setItem("products",JSON.stringify(productContainer))
    displayData();
}

function searchProduct(){
    // console.log("hello");
    var term = productSearchInput.value;
    // console.log(search);

    var cartona ='';
    for(var i=0;i<productContainer.length;i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){    
        cartona+=`
        <tr >
                    <td> ${productContainer[i].name} </td>
                    <td> ${productContainer[i].price} </td>
                    <td> ${productContainer[i].category} </td>
                    <td> ${productContainer[i].description} </td>
                    <td>
                        <button class="btn btn-outline-warning" >Update</button>
                        <button class="btn btn-outline-danger"  onclick="deleteProduct(${i})">Delete</button> 
                    </td>
                </tr>
                `
                document.getElementById("data").innerHTML=cartona
            }
    }

    
}

function setData(index){
    indexUpdate = index;
    var currentProduct = productContainer[index]
    productNameInput.value = currentProduct.name;
    productPriceInput.value = currentProduct.price;
    productCategoryInput.value = currentProduct.category;
    productDescriptionInput.value = currentProduct.description;

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none")
    console.log(currentProduct);
    
}

function updateProduct(){
    var product = {
        name: productNameInput.value,
        price : productPriceInput.value,
        category : productCategoryInput.value,
        description : productDescriptionInput.value
    }
    productContainer.splice(indexUpdate,1,product);
    localStorage.setItem("products",JSON.stringify(productContainer))
    displayData()
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    clearForm()
}

function clearForm(){
    productNameInput.value="";
    productPriceInput.value="";
    productDescriptionInput.value="";
    productCategoryInput.value="";
}