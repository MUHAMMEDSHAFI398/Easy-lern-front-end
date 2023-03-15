const validate = (values) => {


    const errors = {};

    if (values.startDate === "") {
        errors.startDate = "Start date is required"
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.startDate)) {
        errors.startDate = "Invalid date"
    }

    if (values.duration === "") {
        errors.duration = "Duration is required"
    } else if (isNaN(values.duration)) {
        errors.duration = "Invalid entry"
    }

    if (values.fee === "") {
        errors.fee = "courese fee is required"
    } else if (isNaN(values.fee)) {
        errors.fee = "Invalid entry"
    }

    if (values.numberOfSeat === "") {
        errors.numberOfSeat = "Number of seat is required"
    } else if (isNaN(values.numberOfSeat)) {
        errors.numberOfSeat = "Invalid entry"
    }

    if (values.headOfTheBatch === "") {
        errors.headOfTheBatch = "Head of the batch is required"
    } else if (!isNaN(values.headOfTheBatch)) {
        errors.headOfTheBatch = "Invalid entry"
    }

    return errors;
};

export default validate;