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
        try {
            (new contactData()).firstName = nameList[0];
            (new contactData()).lastName = nameList[1];
            textError.textContent = "";
        } catch(e){
            textError.textContent = e;
        }
    }
    else {
        try {
            (new contactData()).firstName = nameList[0];
            textError.textContent = "";
        } catch(e) {
            textError.textContent = e;
        }      
    }
});

    const address = document.querySelector("#address");
    const addressError = document.querySelector('.address-error')
    address.addEventListener('input', function() {
        try {
            (new contactData()).address = address.value;
            addressError.textContent = "";
        }
        catch (e) {
            addressError.textContent = e;
        }
    })

    const phNo = document.querySelector('#phoneNumber');
    const phoneError = document.querySelector('.phone-error');
    phNo.addEventListener('input', function() {
        try {
            (new contactData()).phoneNumber =  phNo;
            phoneError.textContent = "";
        }
        catch(e)
        {
            phoneError.textContent = e;
        }
    })

});

const save = (event) => {
    alert("saved");
    let newContact = createNewContact();
    // let JsonData = JSON.stringify(newContact);
    alert(newContact);
}

const createNewContact = () => {
    let contact = new contactData();
    let names = getInputDetail("#name").split(" ");
    contact.firstName = names[0];
    contact.lastName = names[1];
    contact.address = getInputDetail("#address");
    contact.city = getInputDetail("#city");
    contact.state = getInputDetail("#state");
    contact.zip = getInputDetail("#zipcode");
    contact.phoneNumber = getInputDetail("#phoneNumber");
    return contact;
}

const getInputDetail = (id) => {
    let data = document.querySelector(id).value;
    return data;
}