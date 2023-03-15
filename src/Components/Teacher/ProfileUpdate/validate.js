const validate = (values,address) => {

    const errors = {};

    

    if (values.phone === "") {
        errors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = "Invalid phone number"
    }

    if (values.email === "") {
        errors.email = "Email is required"
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
        errors.email = "Invalid email"
    }

    if (address.house_name === "") {
        errors.house_name = "House name is required"
    } else if (!isNaN(address.house_name)) {
        errors.house_name = "Invalid entry"
    }

    if (address.place === "") {
        errors.place = "Place is required"
    } else if (!isNaN(address.place)) {
        errors.place = "Invalid entry"
    }

    if (address.post === "") {
        errors.post = "Post is required"
    } else if (!isNaN(address.post)) {
        errors.post = "Invalid entry"
    }

    if (address.pin === "") {
        errors.pin = "Pin is required"
    } else if (isNaN(address.pin)) {
        errors.pin = "Invalid entry"
    }

    if (address.district === "") {
        errors.district = "District is required"
    } else if (!isNaN(address.district)) {
        errors.district = "Invalid entry"
    }

    if (address.state === "") {
        errors.state = "State is required"
    } else if (!isNaN(address.state)) {
        errors.state = "Invalid entry"
    }


    return errors;
};

export default validate;