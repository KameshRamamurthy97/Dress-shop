$(document).ready(function() {
  
    // focus first field
    $(':text:first').focus();
  
    //disable credit card info
  $('#paypal').click(function() {
      $('#creditCard input').attr('disabled', true).css('backgroundColor','#CCC');
      $('#creditCard label').css('color','#BBB');
  }); // end click()
  
    //enable credit card info
  $('#visa, #mastercard').click(function() {
      $('#creditCard input').attr('disabled', false).css('backgroundColor','');
      $('#creditCard label').css('color','');
      $('#cardNumber').focus();
  }); // end click()
  
  //hide shipping info
  $('#hideShip').click(function() {
      //check to make sure field is checked
      if ($(this).attr('checked')) {
           $('#shipping').slideUp('fast');
      } else {
           $('#shipping').slideDown('fast');
      }
  }); // end click()
  }); // end ready