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

    if (values.date_of_birth === "") {
        errors.date_of_birth = "Date of birth is required"
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date_of_birth)) {
        errors.date_of_birth = "Invalid date"
    }

    if (values.gender === "") {
        errors.gender = "Gender is required"
    } else if (!isNaN(values.gender)) {
        errors.gender = "Invalid entry"
    }

    if (values.salary === "") {
        errors.salary = "Salary is required"
    } else if (isNaN(values.salary)) {
        errors.salary = "Invalid entry"
    }

    if (values.qualification === "") {
        errors.qualification = "Qualification is required"
    } else if (!isNaN(values.qualification)) {
        errors.qualification = "Invalid entry"
    }

    if (values.experience === "") {
        errors.experience = "Experience is required"
    } else if (isNaN(values.experience)) {
        errors.experience = "Invalid entry"
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