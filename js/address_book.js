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
            (new contactData()).phoneNumber =  phNo.value;
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
    try {
        let newContact = createNewContact();
        // let JsonData = JSON.stringify(newContact);
        createAndUpdateStorage(newContact);
        // resetForm();
    } catch (e)
    {
        alert(error);
    }
}

function createAndUpdateStorage(addContactData) {

    let contactDataList = JSON.parse(localStorage.getItem("ContactDataList"));

    if(contactDataList != undefined) {
        contactDataList.push(addContactData);
    } else {
        contactDataList = [addContactData];
    }
    alert(contactDataList.toString());
    localStorage.setItem("ContactDataList", JSON.stringify(contactDataList));
}

const createNewContact = () => {
    let contactList = JSON.parse(localStorage.getItem('ContactDataList'));
    let max = 0;
    if(contactList) {
        for(const contactTemp of contactList){
            if(max < contactTemp._id) {
                max = contactTemp._id;
            }
        }
    }
    let contact = new contactData();
    contact.id = parseInt(max) + 1;
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