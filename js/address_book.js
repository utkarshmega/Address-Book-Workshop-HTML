window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name'); 
  const textError = document.querySelector('.text-error');
  name.addEventListener('input', function () {
    let nameList = name.value.split(" ");
    let nameRegex = RegExp('^[A-Z][a-z]{2,}$');
    if (nameList.length == 0) {
      textError.textContent = "";
      return;
    }
    if (nameList.length == 2) {
        if(!nameRegex.test(nameList[0]))
        textError.textContent = 'Invalid First Name';
        if(!nameRegex.test(nameList[1]))
        textError.textContent = 'Invalid Last Name';
    }
    else {
      if(!nameRegex.test(nameList[0]))
        textError.textContent = 'Invalid First Name';
      else
        textError.textContent = "";
    }
});

    const address = document.querySelector("#address");
    const addressError = document.querySelector('.address-error')
    address.addEventListener('input', function() {
        let addressRegex = RegExp('^[A-Za-z, 0-9]{3,}$');
        let addressWords = address.value.split(" ");
        if(addressWords.length>1) {
            for(words of addressWords) {
                if(!addressRegex.test(words))   
                    addressError.textContent = "Word should be of minimum 3 length";
                else
                    addressError.textContent = "";
            }
        }
        else {
            addressError.textContent = "Address Must have multile words";
        }
    })

    const phNo = document.querySelector('#phoneNumber');
    const phoneError = document.querySelector('.phone-error');
    phNo.addEventListener('input', function() {
        let phoneRegex1 = RegExp('^[1-9]{1}[0-9]{9}$');
        let phoneRegex2 = RegExp('^[0-9]{2}[1-9]{1}[0-9]{9}$');
        let phoneRegex3 = RegExp('^[+]{1}[0-9]{2}[1-9]{1}[0-9]{9}$');
        if(phoneRegex1.test(phNo) || phoneRegex2.test(phNo) || phoneRegex3.test(phNo))
            phoneError.textContent = "";
        else 
            phoneError.textContent = "Invalid Phone Number";
    })

});