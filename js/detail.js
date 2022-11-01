
const form = document.getElementById('form body'); //references the whole form (all three fieldsets)
const pizza = document.getElementById('thepizza'); //references the layout of the pizza (fieldset)
const person = document.getElementById('person'); //references to customer details (fieldset)

// rewritten arrangePizza() function
var arrangePizza = function() {

    //getSize()
    var size = document.getElementsByName('sizeradio');
    var sizeValue = 0;
    var sizeName;
    for(var i = 0; i < size.length; i++){
        if(size[i].checked){
            sizeText = document.querySelector('label[for=' + size[i].id + ']').innerHTML
            sizeName = sizeText.replace(/[^a-z]/gi, '');
            sizeValue += parseInt(sizeText.replace(/\D/g,''));
            break;
        } else {
            sizeName = ' ';
            sizeValue += 0;
        }
    }
    console.log(sizeName, sizeValue, "getSize() working"); //for checking

    //getcrust()
    var crust = document.getElementsByName('crustradio');
    var crustValue = 0;
    var crustName;
    for(var i = 0; i < crust.length; i++){
        if(crust[i].checked){
            crustText = document.querySelector('label[for=' + crust[i].id + ']').innerHTML
            crustName = crustText.replace(/[^a-z]/gi, '');
            crustValue += parseInt(crustText.replace(/\D/g,''));
            break;
        } else {
            crustName = ' ';
            crustValue += 0;
        };
    }; //can shorten by looking up way to check whole name to find which is check
    console.log(crustName, crustValue, "getCrust() working");//for checking

    //getMainToppings()
    var toppings = document.getElementById("toppingsoption");
    var toppingsName;
    var toppingsValue = 0;
    if (toppings.options[toppings.selectedIndex].id == 'emptyoption') {
        var toppingsName = '';
        var toppingsValue = 0;
    } else {
        toppingsText = toppings.options[toppings.selectedIndex].innerHTML;
        var toppingsName = toppingsText.replace(/ -.*/, '');
        var toppingsValue = parseInt(toppingsText.replace(/\D/g,''));

        console.log(toppingsName, toppingsValue, "getMainToppings() working");
    }

    //getAdditionalToppings()
    var additionalToppings = document.getElementsByClassName("addtopcheck");
    const additionalToppingsName = [];
    let additionalToppingsValue = 0;
    for (i = 0; i < 3; i++) {
        additionalToppingsText = document.querySelector('label[for=' + additionalToppings[i].id + ']').innerHTML;
        switch(true) {
            case additionalToppings[i].checked === true:
                additionalToppingsName.push(additionalToppingsText.replace(/[^a-z]/gi, ''));
                additionalToppingsValue += parseInt(additionalToppingsText.replace(/\D/g,''));
        }
    }

    console.log(additionalToppingsName, additionalToppingsValue, "getAdditionalToppings() working" ); //for checking

    //order
    completeOrder = sizeName + `\n` + crustName + `\n` + toppingsName + `\n` + additionalToppingsName;
    document.getElementById('sizeOrder').innerHTML = sizeName;
    document.getElementById('crustOrder').innerHTML = crustName;
    document.getElementById('mainOrder').innerHTML = toppingsName;
    document.getElementById('additionalOrder').innerHTML = additionalToppingsName.join(", ");
    console.log(completeOrder);
    console.log("order() working") //for checking

    //receipt()
    var gross = 0;
    gross += sizeValue + crustValue + toppingsValue + additionalToppingsValue;
    net = Math.round(100*(gross + (gross**.12)))/100;   // round to hundredths
    console.log(net)
    document.getElementById('total').innerHTML = net;
    console.log("receipt() working") //for checking

    return {
        size: sizeName,
        crust: crustName,
        toppings: toppingsName,
        additionalToppings: additionalToppingsName,
        cost: net
    };
}

pizza.addEventListener('change', arrangePizza);

form.addEventListener('submit', async function (event) {
    
    event.preventDefault();
    
    var completePizza = arrangePizza();

    var getUnixTime = function () {
        let delHours = parseInt((deltime.value).substring(0,2));
        let delMinutes = parseInt((deltime.value).substring(3));
        console.log(delHours, delMinutes);
        
        let myDate = new Date();
        myDate.setHours(delHours, delMinutes, 00);
        let unixDate = Math.floor(myDate.getTime()/1000.0);

        return {
            hours: delHours,
            minutes: delMinutes,
            finalTime: myDate,
            finalUnixTime: unixDate
        };
    };

    console.log(getUnixTime());
    console.log(completePizza);

    submit = document.getElementById('submit');
    submit.disabled = true;
    setTimeout(function() {
        submit.disabled = false;
    },3000);

   /*  function getTime() {

    }; */
    
    const { customerName, emadd, add, mno } = form;

    const body = {
        name: customerName.value,
        email: emadd.value,
        address: add.value,
        mobileNumber: mno.value,
        formSize: completePizza.size,
        formCrust: completePizza.crust,
        formToppings: completePizza.toppings,
        formAdditionalToppings: completePizza.additionalToppings,
        cost: completePizza.cost,
        formAdditionalRequests: document.getElementById('addRequest').value,
        unixTime: getUnixTime().finalUnixTime,
    }; 

    console.log(body);

    const response = await fetch(form.action, {
        method: form.method,
        body: JSON.stringify(body)
    });

    const text = await response.text();
    code.innerHTML = text;

    form.reset();
    document.getElementById('sizeOrder').innerHTML = "";
    document.getElementById('crustOrder').innerHTML = "";
    document.getElementById('mainOrder').innerHTML = "";
    document.getElementById('additionalOrder').innerHTML = "";
    document.getElementById('total').innerHTML = "";

    sweetAlert("Your order has been processed!", "Your food will arrive shortly.", "success");
});

