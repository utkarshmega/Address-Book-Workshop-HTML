class contactData {

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get firstName() {
        return this._firstName;
    }
    set firstName(firstName) {
        let nameRegex = RegExp('^[A-Z][a-z]{2,}$');
        if(nameRegex.test(firstName))
            this._firstName = firstName;
        else
            throw 'Invalid First Name';        
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(lastName) {
        let nameRegex = RegExp('^[A-Z][a-z]{2,}$');
        if(nameRegex.test(lastName))
            this._lastName = lastName;
        else
            throw 'Invalid Last Name';
    }

    get address() {
        return this._address;
    }
    set address(address) {
        let addressRegex = RegExp('^[A-Za-z, 0-9]{3,}$');
        let addressWords = address.split(" ");
        if(addressWords.length>1) {
            for(let words of addressWords) {
                if(!addressRegex.test(words))   
                    throw "Word should be of minimum 3 length";
                else
                    this._address = address;
            }
        }
        else {
            throw "Address Must have multile words";
        }
    }

    get city()
    {
        return this._city;
    }
    set city(city)
    {
        this._city = city;
    }

    get state()
    {
        return this._state;
    }
    set state(state)
    {
        this._state = state;
    }

    get zip()
    {
        return this._zip;
    }
    set zip(zip)
    {
        this._zip = zip;
    }

    get phoneNumber()
    {
        return this._phone;
    }
    set phoneNumber(phone)
    {
        let phoneRegex1 = RegExp('^[1-9]{1}[0-9]{9}$');
        let phoneRegex2 = RegExp('^[0-9]{2}[1-9]{1}[0-9]{9}$');
        let phoneRegex3 = RegExp('^[+]{1}[0-9]{2}[1-9]{1}[0-9]{9}$');
        if(phoneRegex1.test(phone) || phoneRegex2.test(phone) || phoneRegex3.test(phone))
            this._phone = phone;
        else 
            throw "Invalid Phone Number";
    }

    toString()
    {
        return "Id = "+this.id+", FirstName = "+this.firstName+", LastName = "+this.lastName+", Address = "+this.address+
                ", City = "+this.city+", State = "+this.state+", Zip = "+this.zip+", Phone = "+this.phone;
    }
}