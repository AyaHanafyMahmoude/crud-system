var productName=document.getElementById("ProductName");
var productPrice=document.getElementById("PriceName");
var productCategory=document.getElementById("CategoryName");
var productQuality=document.getElementById("QUalityName");
var addandupdatebtn=document.getElementById("changebtn");
var inputsearch=document.getElementById("search-id");
var arrOfProducts;
if(localStorage.getItem("productsinfo")==null){
  arrOfProducts=[];
}else{

  arrOfProducts=JSON.parse(localStorage.getItem("productsinfo"));
  displayProducts();
}
productName.addEventListener("keyup",validationName)
productPrice.addEventListener("keyup",validationPric)
productCategory.addEventListener("keyup",validatecategory)
productQuality.addEventListener("keyup",validatquality)

function addProduct(){
  if(validationName()&&validationPric()&&validatquality()&&validatecategory()){
    var product={
      name:productName.value,
      price:productPrice.value,
      category:productCategory.value,
      quality:productQuality.value,
  }
arrOfProducts.push(product);
localStorage.setItem("productsinfo",JSON.stringify(arrOfProducts));
displayProducts();
clearData()
  }else{
    window.alert("all input required")
  }
   

}

function displayProducts(){
    var heading=` <th>name</th>
    <th>price</th>
    <th>category</th>
    <th>quality</th>
    <th>update</th>
    <th>delete</th>`;
    var temp="";
   
   for (var i=0;i < arrOfProducts.length ; i++){
    temp+=`<tr>
    <td>${arrOfProducts[i]["name"]}</td>
    <td>${arrOfProducts[i].price}</td>
    <td>${arrOfProducts[i].category}</td>
    <td>${arrOfProducts[i].quality}</td>
    <td>
      <button class="btn btn-warning" onclick="updatdatapart1(${i})">upate</button>
    </td>
    <td>
      <button class="btn btn-danger" onclick="deletdata(${i})">delete</button>
    </td>
  </tr>`;
   }
    document.getElementById("th-id").innerHTML=heading;
    document.getElementById("table-body").innerHTML=temp;


}
// عاوزه اشيل الheader????????????
function deletdata(index)
{
  arrOfProducts.splice(index,1);
  
  localStorage.setItem("productsinfo",JSON.stringify(arrOfProducts));
  displayProducts();
  if(arrOfProducts.length ==0){
localStorage.removeItem("productsinfo");
  }
  localStorage.setItem("productsinfo",JSON.stringify(arrOfProducts));

}
var t;
function updatdatapart1(index){
  t=index;
 productName.value=arrOfProducts[index].name;
 productPrice.value=Number(arrOfProducts[index].price);
 productCategory.value=arrOfProducts[index].category;
 productQuality.value=arrOfProducts[index].quality;
 addandupdatebtn.innerHTML="update";

}
function updatdatapart2(t){
  arrOfProducts[t].name=productName.value;
  arrOfProducts[t].price=productPrice.value;
  arrOfProducts[t].category=productCategory.value;
  arrOfProducts[t].quality=productQuality.value;
  localStorage.setItem("productsinfo",JSON.stringify(arrOfProducts));
  displayProducts();
}
function z(){
  if(addandupdatebtn.innerHTML=="update"){
    updatdatapart2(t);
    addandupdatebtn.innerHTML="ADD Product";
    clearData()

  }else{
    addProduct();
  }
}
function searching(){
  var term=inputsearch.value;
  var cart="";
  for (var i=0;i<arrOfProducts.length;i++) {
    
    if(arrOfProducts[i].name.toLowerCase().includes(term.toLowerCase())){
      cart+=`<tr>
      <td>${arrOfProducts[i]["name"]}</td>
      <td>${arrOfProducts[i].price}</td>
      <td>${arrOfProducts[i].category}</td>
      <td>${arrOfProducts[i].quality}</td>
      <td>
        <button class="btn btn-warning" onclick="updatdatapart1(${i})">upate</button>
      </td>
      <td>
        <button class="btn btn-danger" onclick="deletdata(${i})">delete</button>
      </td>
    </tr>`;
    }else{

    }
  }
  document.getElementById("table-body").innerHTML=cart;
}
function validationName(){
  let regx=/^[A-Z][A-Za-z]+$/
  let result=regx.test(productName.value);
    
     if(result){
       document.getElementById("div-name-validate").style.display="none"
       return true;
  
     }else{
      document.getElementById("div-name-validate").style.display="block"
      return false;
  
     }
}
function validationPric(){
  let regx=/^[0-9]{2,10}$/
  let result=regx.test(productPrice.value);
    
     if(result){
       document.getElementById("div-pric-validate").style.display="none"
       return true;
  
     }else{
      document.getElementById("div-pric-validate").style.display="block"
      return false;
  
     }
}
function clearData(){
  productName.value=""
  productPrice.value=""
  productQuality.value=""
  productCategory.value=""
}
function validatecategory(){
  if(productCategory.value!=""){
    document.getElementById("div-category-validate").style.display="none"
    return true
  }else{
    document.getElementById("div-category-validate").style.display="block"
    return false

  }
 
}
function validatquality(){
  if(productQuality.value!=""){
    document.getElementById("div-quality-validate").style.display="none"
    return true
  }else{
    document.getElementById("div-quality-validate").style.display="block"
    return false

  }
 
}