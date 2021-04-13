if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    console.log("readdyyy")
    ready()
}

function ready(){
    var removecartitems = document.getElementsByClassName("cart-close-icon")
    console.log(removecartitems)
    for (var i =0; i < removecartitems.length; i++){
//        if (i > 4){
        var button = removecartitems[i]
        button.addEventListener("click", removingcartitems)
//        }
    }
    var itemcontent= document.getElementsByClassName("product-carousel-container mb-50 mb-md-30 mb-sm-30")[0]
    var cartbutton= itemcontent.getElementsByClassName("single-product__content")
    for (var i =0; i< cartbutton.length; i++){
        var butt = cartbutton[i].getElementsByTagName("a")
        butt[1].addEventListener("click", addtocart)
    }
    var quickviewbutton = document.getElementsByClassName("quickview")
    for (var i =0; i<quickviewbutton.length; i++){
        quickviewbutton[i].addEventListener("click", quickview)
    }
    var cartbuttons = document.getElementsByClassName("cart-buttons")[0]
    cartbuttons.getElementsByTagName("a")[1].addEventListener("click", processtoflask)

    updatetotal()
    updateitemcount()
}

function removingcartitems(event){
    var button = event.target
    var productid=button.parentElement.parentElement.parentElement.getElementsByClassName("content")[0].getElementsByTagName("a")[0].textContent
    console.log(productid, 'hiii')
    $.ajax({
    url:'/',
    contentType:'application/json',
    data:JSON.stringify(['remove',productid]),
    dataType:'text',
    type:'POST'


    })

    button.parentElement.parentElement.parentElement.remove()
    updatetotal()
    updateitemcount()

}

function updatetotal(){
    var cartcontainer= document.getElementsByClassName("cart-product-container  ps-scroll")[0]
    var cartrows = cartcontainer.getElementsByClassName("single-cart-product")
    var total=0
    for (var i = 0; i<cartrows.length; i++){
        var price=cartrows[i].getElementsByClassName("discounted-price")[0].textContent.replace("$","")
        price=parseFloat(price)
        var quantity1=cartrows[i].getElementsByClassName("cart-count")[0].textContent
        var quantity = parseFloat(quantity1.replace("x",""))
        total=total+ (price * quantity)

    }
//    console.log(total)
    total1=document.getElementsByClassName("cart-subtotal")[0]
    total2=total1.getElementsByClassName("subtotal-amount")[0].textContent= "$" + total

}

function addtocart(event){
    var button = event.target
    var item= button.parentElement.parentElement
    var item2= item.getElementsByClassName("main-price")[0]
    var item3= item.parentElement
    var item4 = item3.getElementsByClassName("single-product__image")[0]
    var imgsrc = item4.getElementsByTagName("img")[0].src.replace("http://127.0.0.1:5000/","")
    var price=parseFloat(item2.textContent.replace("$",""))
    var listofnames=item.getElementsByTagName("a")
    var name=listofnames[0].textContent
    var productid=item.getElementsByClassName("price")[0].getElementsByTagName("p")[0].textContent
    console.log(listofnames[0].textContent)
    console.log(price,imgsrc,productid)
    var there = 0
    var cartcontainer= document.getElementsByClassName("cart-product-container  ps-scroll")[0]
    var cartrows = cartcontainer.getElementsByClassName("single-cart-product")

    for (var i=0; i < cartrows.length; i++){
        var contentname= cartrows[i].getElementsByClassName("content")[0].getElementsByTagName("a")[0].textContent
        if ( name == contentname){
            there=there + 1
            $.ajax({
                url:'/',
                contentType:'application/json',
                data:JSON.stringify(['update quantity',1,productid]),
                dataType:'text',
                type:'POST'

            })
        }
    }
    if (there == 0){
        appendtocart(name,price,imgsrc,1,productid)
    }


}

function appendtocart(name,price,pic,quantity,productid){
    var cartrow = document.createElement("div")
    cartrow.innerText = name
    var cartrowcontent = '<div class="single-cart-product"> <span class="cart-close-icon"> <a href="#"><i class="ti-close"></i></a> </span> <div class="image"> <a href="shop-product-basic.html"> <img src="static/image-1-2.png" class="img-fluid" alt=""> </a> </div> <div class="content"> <h5><a href="shop-product-basic.html">'+ name +'</a></h5> <p><span class="cart-count">'+  quantity + ' x ' + '</span> <span class="discounted-price">'+'$'+ price +'</span></p> </div> </div>'
    var cartitems= document.getElementsByClassName("cart-product-container ps-scroll ps")[0]
    cartrow.innerHTML=cartrowcontent
    cartitems.append(cartrow)

    var itemdict = {}
    itemdict["name"]=name
    itemdict["price"]=price
    itemdict["img"]=pic
    itemdict["quantity"]=quantity
    itemdict["productid"]=productid
    $.ajax({
        url:'/',
        contentType:'application/json',
        data:JSON.stringify(['new_item',itemdict]),
        dataType:'text',
        type:'POST'


    })
    ready()
    updatetotal()
    updateitemcount()
}

function quickview(event){
    var check = document.getElementById("qv-1")
    if (check != null){
        if (document.getElementsByClassName("cd-slider-wrapper").length != 0){
            var del=check.getElementsByClassName("cd-slider-wrapper")[0]
            del.parentElement.remove()
            console.log('removed')
        }
    }

    var quick=document.createElement("div")
    var quickcontent= '<div class="cd-slider-wrapper"> <ul class="cd-slider"> <li class="selected"><img src="images/products/furniture-1-1-600x800.jpg" alt="Product 2"></li> </ul> </div> <div class="lezada-item-info cd-item-info ps-scroll"> <h2 class="item-title">Wooden round table</h2> <p class="price"> <span class="main-price discounted">$360.00</span> <span class="discounted-price">$300.00</span> </p> <p class="description">Hurley Dry-Fit Chino Short. Mens chino short. Outseam Length: 19 Dri-FIT Technology helps keep you dry and comfortable. Made with sweat-wicking fabric. Fitted waist with belt loops. Button waist with zip fly provides a classic look and feel .</p> <span class="quickview-title">Quantity:</span> <div class="pro-qty d-inline-block mb-40"> <input name="quantinput" type="text"> </div> <div class="add-to-cart-btn mb-25"> <button class="lezada-button lezada-button--medium">add to cart</button> </div> <div class="quick-view-other-info"> <table> <tr class="single-info"> <td class="quickview-title">SKU: </td> <td class="quickview-value">12345</td> </tr> <tr class="single-info"> <td class="quickview-title">Categories: </td> <td class="quickview-value"> <a href="#">Fashion</a>, <a href="#">Men</a>, <a href="#">Sunglasses</a> </td> </tr> <tr class="single-info"> <td class="quickview-title">Tags: </td> <td class="quickview-value"> <a href="#">Fashion</a>, <a href="#">Men</a> </td> </tr> <tr class="single-info"> <td class="quickview-title">Share on: </td> <td class="quickview-value"> <ul class="quickview-social-icons"> <li><a href="#"><i class="fa fa-facebook"></i></a></li> <li><a href="#"><i class="fa fa-twitter"></i></a></li> <li><a href="#"><i class="fa fa-google-plus"></i></a></li> <li><a href="#"><i class="fa fa-pinterest"></i></a></li> </ul> </td> </tr> </table> </div> </div> <a href="#0" class="cd-close">Close</a>'
    var quickv= document.getElementById("qv-1")
    quick.innerHTML = quickcontent
    quickv.append(quick)

    document.getElementsByClassName("lezada-button lezada-button--medium")[1].addEventListener("click", addtocartfromquickview)

}

function addtocartfromquickview(event){
    var button=event.target.parentElement.parentElement.parentElement
    var imglink=button.getElementsByTagName("img")[0].src
    var name=button.getElementsByClassName("item-title")[0].textContent
    var price=button.getElementsByClassName("main-price discounted")[0].textContent
    var producid = button.getElementsByClassName("quickview-value")[0].textContent
    console.log(name,imglink,price,producid)
    var quantity=parseFloat(button.getElementsByTagName("input")[0].value)
    if (quantity < 0 || quantity == ""){
        alert("Invalid quantity")
    }
    var there = 0
    var cartcontainer= document.getElementsByClassName("cart-product-container  ps-scroll")[0]
    var cartrows = cartcontainer.getElementsByClassName("single-cart-product")

    for (var i=0; i < cartrows.length; i++){
        var contentname= cartrows[i].getElementsByClassName("content")[0].getElementsByTagName("a")[0].textContent
        if ( name == contentname){
            there=there + 1
            $.ajax({
                url:'/',
                contentType:'application/json',
                data:JSON.stringify(['update quantity',quantity,producid]),
                dataType:'text',
                type:'POST'


            })
        }
    }
    if (there == 0){
        appendtocart(name,price,imglink,quantity)
    }

    ready()
    updatetotal()

}

function processtoflask(event){
    var cartarray=[]

    var cartcontainer= document.getElementsByClassName("cart-product-container  ps-scroll")[0]
    var cartrows = cartcontainer.getElementsByClassName("single-cart-product")
    for (var i=0; i < cartrows.length; i++){
        var itemdict={}
        var contentname= cartrows[i].getElementsByClassName("content")[0].getElementsByTagName("a")[0].textContent
        var contentprice = parseFloat(cartrows[i].getElementsByClassName("discounted-price")[0].textContent.replace("$",""))
        var contentquantity1 = cartrows[i].getElementsByClassName("cart-count")[0].textContent.replace(" ","")
        var contentquantity=parseFloat(contentquantity1.replace("x",""))
        var contentimgsrc = cartrows[i].getElementsByTagName("img")[0].src
        itemdict["name"]=contentname
        itemdict["price"]=contentprice
        itemdict["quantity"]=contentquantity
        itemdict["img"]=contentimgsrc
        cartarray.push(itemdict)
//        console.log(contentname,contentprice,contentquantity,contentimgsrc)
    }

    $.ajax({
        url:'/',
        contentType:'application/json',
        data:JSON.stringify(['save_c',cartarray]),
        dataType:'text',
        type:'POST'

    })

}

function updateitemcount(){
    var carticon= document.getElementsByClassName("single-icon cart")[0]
    var cartcontainer= document.getElementsByClassName("cart-product-container  ps-scroll")[0]
    var cartrows = cartcontainer.getElementsByClassName("single-cart-product")
    var count=cartrows.length

    carticon.getElementsByClassName("count")[0].textContent = count


}
