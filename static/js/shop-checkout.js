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
    var order=document.getElementsByClassName("lezada-button lezada-button--medium mt-30")[0]
    order.addEventListener("click", processcheckout)
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
    document.getElementsByClassName("checkout-cart-total")[0].getElementsByTagName("h4")[1].textContent = "$" + total

}

function updateitemcount(){
    var carticon= document.getElementsByClassName("single-icon cart")[0]
    var cartcontainer= document.getElementsByClassName("cart-product-container  ps-scroll")[0]
    var cartrows = cartcontainer.getElementsByClassName("single-cart-product")
    var count=cartrows.length

    carticon.getElementsByClassName("count")[0].textContent = count


}

function processcheckout(){
    var form=document.getElementById("billing-form")
    var infos=form.getElementsByTagName("input")
    var firstname=infos[0].value
    var lastname=infos[1].value
    var email=infos[2].value
    var phone=infos[3].value
    var address=infos[4].value
    var city=infos[5].value
    var state=infos[6].value
    var zipcode=infos[7].value
    var cardnumber=infos[8].value
    var cardname=infos[9].value
    var expiration=infos[10].value
    var cvv=infos[11].value

    console.log(firstname,cvv)

    for (var i =0; i < infos.length; i++){
        if (infos[i].value == ""){
            alert("empty value or values")
        }
    }

    if (expiration.includes("/")== false){
        alert("invalid date format. Should be xx/xx")
    }

    if (cvv.length > 3){
        alert("invalid amount of numbers for CVV")
    }

    $.ajax({

    })
}


