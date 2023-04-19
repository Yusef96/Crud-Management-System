var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productDesc = document.getElementById("productDesc");
var productList = [];
var addProductBtn = document.getElementById("addProductBtn");
var UpdateProductBtn = document.getElementById("UpdateProductBtn");





if (localStorage.getItem("productlist") == null){
    productList =[];
}else {productList = JSON.parse(localStorage.getItem("productlist"));
    display(productList)
}



function addProduct(){
    if (validProductName()==true){



    var product={
        name : productName.value,
        price : productPrice.value,
        model : productModel.value,
        desc : productDesc.value,
    }
    productList.push(product);
    display(productList);
    localStorage.setItem("productlist",JSON.stringify(productList))
    clearform();}
    else{
        // alert("wroooong")
}

}

function clearform(){
     productName.value = "";
     productPrice.value = "";
     productModel.value = "";
     productDesc.value = "";

}




function display(list){
    var cartona = '';
    for (var i=0 ; i<list.length ; i++){
        cartona += `                <tr>
        <td>${i+1}</td>
        <td>${list[i].newName ? list[i].newName : list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].model}</td>
        <td>${list[i].desc}</td>
        
        <td>
            <button onclick="getUpdatedProduct(${i})" class="btn btn-warning btn-sm">Update</button>
        </td>
        <td>
            <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button>
        </td>
        

    </tr>
    `

    }
    // console.log(cartona);
    document.getElementById("tbody").innerHTML = cartona
}

function deleteProduct(i){
    productList.splice(i,1);
    localStorage.setItem("productlist",JSON.stringify(productList));
    display(productList); 

}

function searchByName(term){
    var foundedItems = [];
    for (var i=0 ; i<productList.length ; i++){
        if (productList[i].name.toLowerCase().includes(term.toLowerCase()) == true) 
        {   productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase(),`<span class="text-danger">${term}</span>`)
            console.log("founded",i);
            foundedItems.push(productList[i]);
    }
    }
    display(foundedItems)
}

function getUpdatedProduct(bteee5){
    addProductBtn.classList.add("d-none");
    UpdateProductBtn.classList.replace("d-none","d-block");

    productName.value = productList[bteee5].name;
    productPrice.value = productList[bteee5].price;
    productModel.value = productList[bteee5].model;
    productDesc.value = productList[bteee5].desc;

}

function updateProduct(){
    addProductBtn.classList.replace("d-none","d-block");
    UpdateProductBtn.classList.replace("d-block","d-none");

}


function validProductName(){
    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(productName.value)== true){
        productName.style.border="none"
        document.getElementById("wrongName").classList.add("d-none");

        return true;
    }else {
        productName.style.border="5px solid red"
        document.getElementById("wrongName").classList.remove("d-none");
        return false}

    // return regex.test(productName.value);

}