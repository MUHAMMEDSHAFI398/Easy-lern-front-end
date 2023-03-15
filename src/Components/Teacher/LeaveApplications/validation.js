const validate = (values) => {


    const errors = {};
    if (values.from === "") {
        errors.from = "Field is required"
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.from)) {
        errors.from = "Invalid entry"
    }

    if (values.to === "") {
        errors.to = "Field is required"
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.to)) {
        errors.from = "Invalid entry"
    }

    if (values.leaveLetter === "") {
        errors.leaveLetter = "Field is required"
    } else if (values.leaveLetter.length <= 30) {
        errors.leaveLetter = "Letter should contains atlest 30 charecters"
    }

    const fromDate = new Date(values.from);
    const toDate = new Date(values.to);
    if (fromDate.getTime() > toDate.getTime()) {
        errors.date = "Start date should be less than end date";
    }



    return errors;
};

export default validate;