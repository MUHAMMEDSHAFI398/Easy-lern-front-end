const validate = (values) => {


    const errors = {};
    if (values.month === "") {
        errors.month  = "Month is required"
    } 

    if (values.numberOfWorkingDays === "") {
        errors.numberOfWorkingDays = "Working days is required"
    } else if (isNaN(values.numberOfWorkingDays)) {
        errors.numberOfWorkingDays = "Invalid entry"
    } else if(values.numberOfWorkingDays < 0){
        errors.numberOfWorkingDays = "Invalid entry"
    }else if(values.numberOfWorkingDays>31){
        errors.numberOfWorkingDays = "enter valid number of days"
    }


    return errors;
};

export default validate;