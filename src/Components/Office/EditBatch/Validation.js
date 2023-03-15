const validate = (values) => {

    const errors = {};

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