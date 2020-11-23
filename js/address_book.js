let isUpdate = false;
let contactObj = {};

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
    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setContactObj();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e)
    {
        alert(error);
        return;
    }
}

const setContactObj = () => {
    let names = getInputDetail('#name').split(" ");
    contactObj._firstName = names[0];
    contactObj._lastName = names[1];
    contactObj._address = getInputDetail('#address');
    contactObj._city = getInputDetail('#city');
    contactObj._state = getInputDetail('#state');
    contactObj._zip = getInputDetail('#zipcode');
    contactObj._phone = getInputDetail('#phoneNumber');
}

const getInputDetail = (id) => {
    let data = document.querySelector(id).value;
    return data;
}

const createAndUpdateStorage = () => {

    let contactDataList = JSON.parse(localStorage.getItem("ContactDataList"));

    if(contactDataList) {
        let contactData = contactDataList.find(contact => contact._id == contactObj._id);
        if(!contactData) {
            contactDataList.push(createNewContact());
        }
        else {
            const index = contactDataList.map(cnt => cnt._id)
                                        .indexOf(contactData._id);
            contactDataList.splice(index, 1, createNewContact(contactData._id));
        }
    }
    else {
        contactDataList = [createNewContact()];
    } 
    localStorage.setItem("ContactDataList", JSON.stringify(contactDataList));
}   

const createNewContact = (id) => {
    
    let contact = new contactData();
    if(!id) 
        contact.id = createNewContactId();
    else 
        contact.id = id;
    setContactData(contact);
    return contact;
}

const setContactData = (contactData) => {
    try{
        contactData.firstName = contactObj._firstName;
    } catch(e){
        setTextValue('.name-error',e);
    }
    try{
        contactData.lastName = contactObj._lastName;
    } catch(e){
        setTextValue('.name-error',e);
    }
    try{
        contactData.address = contactObj._address;
    } catch(e){
          setTextValue('.address-error',e);
    }
    
    contactData.city = contactObj._city;
    contactData.state = contactObj._state;
    contactData.zip = contactObj._zip;

    try{
        contactData.phoneNumber = contactObj._phone;
    } catch(e){
        setTextValue('.phone-error',e);
    }

    alert(contactData.toString());
}

const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}



const checkForUpdate = () => {
    const contactJsonData = localStorage.getItem("editContact");
    isUpdate = contactJsonData ? true : false;
    if(!isUpdate) return;
    contactObj = JSON.parse(contactJsonData);
    setForm();
  }

  const createNewContactId = () => {
    let cntID = localStorage.getItem("ContactID");
    cntID = !cntID ? 1 : (parseInt(cntID)+1).toString();
    localStorage.setItem("ContactID",cntID);
    return cntID;
  }
  
  const setForm = () => {
    setValue('#name', contactObj._firstName+" "+contactObj._lastName);
    setValue('#address',contactObj._address);
    setValue('#city',contactObj._city);
    setValue('#state',contactObj._state);
    setValue('#zipcode',contactObj._zip);
    setValue('#phoneNumber',contactObj._phone);
  }

  const resetForm = () => {
    setValue('#name','');
    setValue('#address','');
    setSelectedIndex('#city',0);
    setSelectedIndex('#state',0);
    setValue('#zipcode','');
    setValue('#phoneNumber','');
}

  const setValue = (id, value) => {
      const element = document.querySelector(id);
      element.value = value;      
  }

  const setSelectedIndex = (id,index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
  }