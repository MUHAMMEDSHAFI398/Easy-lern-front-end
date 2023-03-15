const validate = (values) => {


    const errors = {};

    if (values.name === "") {
        errors.name = "Name is required";
    } else if (!/^[A-Za-z\s]*$/.test(values.name)) {
        errors.name = "Only letters and alphabets are allowed";
    }

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

    if (values.dateOfBirth === "") {
        errors.dateOfBirth = "Date of birth is required"
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.dateOfBirth)) {
        errors.dateOfBirth = "Invalid date"
    }

    if (values.gender === "") {
        errors.gender = "Gender is required"
    } else if (!isNaN(values.gender)) {
        errors.gender = "Invalid entry"
    }

    if (values.parentName === "") {
        errors.parentName = "Parent name is required"
    } else if (!isNaN(values.parentName)) {
        errors.parentName = "Invalid entry"
    }

    if (values.parentPhone === "") {
        errors.parentPhone = "Parent phone is required"
    } else if (isNaN(values.parentPhone)) {
        errors.parentPhone = "Invalid entry"
    }

    if (values.education === "") {
        errors.education = "Education is required"
    } else if (!isNaN(values.education)) {
        errors.education = "Invalid entry"
    }

    if (values.institute === "") {
        errors.institute = "Last sutdied institue is required"
    } else if (!isNaN(values.institute)) {
        errors.institute = "Invalid entry"
    }

    if (values.batch === "") {
        errors.batch = "Batch is required"
    } else if (!isNaN(values.batch)) {
        errors.batch = "Invalid entry"
    }

    if (values.house_name === "") {
        errors.house_name = "House name is required"
    } else if (!isNaN(values.house_name)) {
        errors.house_name = "Invalid entry"
    }

    if (values.place === "") {
        errors.place = "Place is required"
    } else if (!isNaN(values.place)) {
        errors.place = "Invalid entry"
    }

    if (values.post === "") {
        errors.post = "Post is required"
    } else if (!isNaN(values.post)) {
        errors.post = "Invalid entry"
    }

    if (values.pin === "") {
        errors.pin = "Pin is required"
    } else if (isNaN(values.pin)) {
        errors.pin = "Invalid entry"
    } else if (!/^\d{6}$/.test(values.pin)) {
        console.log('regex')
        errors.pin = "Pin should be exactly 6 digit"
    }

    if (values.district === "") {
        errors.district = "District is required"
    } else if (!isNaN(values.district)) {
        errors.district = "Invalid entry"
    }

    if (values.state === "") {
        errors.state = "State is required"
    } else if (!isNaN(values.state)) {
        errors.state = "Invalid entry"
    }

    if (values.file === null) {
        errors.file = "Image is required"
    }


    return errors;
};

export default validate;