const subjectValidate = (values) => {

    const subErrors = {};

    if (values.subject === "") {
        subErrors.subject = "Subject is required"
    } else if (!isNaN(values.subject)) {
        subErrors.subject = "Invalid entry"
    }

    if (values.teacher === "") {
        subErrors.teacher = "Teacher is required"
    } else if (!isNaN(values.teacher)) {
        subErrors.teacher = "Invalid entry"
    }

    return subErrors;
};

export default subjectValidate;