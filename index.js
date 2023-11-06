function calculate(){
    var adults=document.getElementById("adults").value;
       var children=document.getElementById("children").value;
       var rooms=document.getElementById("rooms").value;
       var basecost=5000;
       var adultscharge=2500;
       var childrencharge=1500;
       var extraroomcharge=3000;
       var price = basecost + (adults-1)*adultscharge + children*childrencharge;
       var cartprice=totalcart(); 
       var totalprice=price+cartprice;

       document.getElementById("result").innerHTML="Cart Price "+cartprice +"<br> Package Price "+price +"<br><br><b>Total Price</b>         "+totalprice +"<br><br><br> <button id=\"book\" class=\"btn btn-primary btn-purchase\" name=\"book\" type=\"button\" onclick=\" return purchaseClicked()\"><b>Book Now</b></button> <br><br>" ;
       
       return false;
   }
function createorder()
{
    alert("Order Placed Successfully");
	
}

   if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}
 function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
function purchaseClicked() {
	
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    //window.alert(typeof(cartItemNames));
    var leng=cartItemNames.length-1
     
    var pricearray = new Array(leng);
    var quanarray = new Array(leng);

	var parser = new DOMParser();
    //var xml = "<?xml version=\"1.0\" standalone=\"yes\" ?>";
    var xml ="<Order  DocumentType=\"0001\" EnterpriseCode=\"Matrix\" EntryType=\"WEB\" OrderType=\"REGULAR\" OrderNo=\"_ITERNARY_ORDER_01\" SellerOrganizationCode=\"Matrix-R\" PaymentStatus=\"NOT_APPLICABLE\">"
	xml=xml+"<OrderLines>"

	var cartRows = cartItems.getElementsByClassName('cart-row')
	
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        quanarray[i]=quantity
		pricearray[i]= price 
		xml= xml+ "<OrderLine OrderedQty=\""+quanarray[i]+"\" PrimeLineNo=\""+ (i+1) +"\" SubLineNo=\"1\">"
		xml= xml + "<Item ItemID=\""+cartItemNames[i].innerText+"\" ItemShortDesc=\""+cartItemNames[i].innerText+"+ProductClass=\"GOOD\" UnitOfMeasure=\"EACH\"/>"
		xml= xml + "</OrderLine>"

		//xml = xml + "<Item Name=\"" + cartItemNames[i].innerText   + "\" Price=\"" + pricearray[i] + "\" Quantity=\"" + quanarray[i] + "\" />";
		
    }
	xml= xml + "</OrderLines>"
	xml= xml + "<PersonInfoShipTo AddressLine1=\"#205, 3rd Main\" Country=\"US\" EMailID=\"pravallika@mail.com\" FirstName=\"Pravallika\" ZipCode=\"500001\"/>"
	xml= xml + "<PersonInfoBillTo AddressLine1=\"#205, 3rd Main\" Country=\"US\" EMailID=\"pravallika@mail.com\" FirstName=\"Pravallika\" MobilePhone=\"123456789\" ZipCode=\"500001\"/>"
	xml= xml + "</Order>"

	
	//xml = xml + "</Items></CustomerInfo>";
    //alert(xml)
	var xmlDoc = parser.parseFromString(xml, "application/xml");
	/*for (var i = 0; i < cartItemNames.length; i++) {
        alert(cartItemNames[i].innerText) 
		alert(pricearray[i])
		alert(quanarray[i])
    }*/
	var xmlhttp = new XMLHttpRequest();
	//var res = new XMLHttpResponse();
 
	//var xhr = new XMLHttpRequest();
 //xmlhttp.open('GET', 'http://example.com/', true);
// var res = XMLHttpRequest.response;
	//xmlhttp.setHeader('Access-Control-Allow-Origin', '*');
	//res.setHeader('Access-Control-Allow-Origin', '*');
	//response.setHeader("Access-Control-Allow-Origin", "*");
   // xmlhttp.open("POST","http://9.202.179.26:9080/smcfs/restapi/executeFlow/TestDbService");
	xmlhttp.open("POST","https://hookb.in/E7mWzxgYYziDEEaxNWRr");
	var xmlDoc;
	var kee ="_ITERNARY_ORDER_01"
	xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		xmlDoc = xmlhttp.responseXML;
		console.log(xmlDoc);
		//alert(array2[0])
		alert("order successfully placed")
		alert("your order id " + kee );
		}
	};
	//alert(array2[0])
	xmlhttp.setRequestHeader('Content-Type', 'text/xml');
	xmlhttp.send(xml);
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
	
	
    return xmlDoc;

} 
function prettyprint(xmlDoc)
{
	
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    
addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
 alert('Item added')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Sorry,This item is already added to the cart.You can add quantity by navigating to cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

 
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₹', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '₹' + total
}
function totalcart()
{
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₹', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100;
    return total;
}
