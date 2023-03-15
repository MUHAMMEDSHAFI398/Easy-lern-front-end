export const validate = (month, formNoOfDays) => {


    const errors = {};
    if (month.month === "" || month.month === "Select a month") {
        errors.month = "Month is required"
    }

    if (formNoOfDays.noOfDaysPresent === "") {
        errors.noOfDaysPresent = "Working days is required"
    } else if (isNaN(formNoOfDays.noOfDaysPresent)) {
        errors.noOfDaysPresent = "Invalid entry"
    } else if (formNoOfDays.noOfDaysPresent < 0) {
        errors.noOfDaysPresent = "Invalid entry"
    } else if (formNoOfDays.noOfDaysPresent > month.workingDays) {
        errors.noOfDaysPresent = "Present days should be less than working days"
    }


    return errors;
};





export const validateMarks = (month, marks) => {
    const errors = {};
    if (month.month === undefined || month.month=== "" ) {
        errors.month = "Month is required"
    }
    for (let i = 0; i < marks.length; i++) {
        if (marks[i].mark === undefined || marks[i].mark === "" ) {
            errors.mark = "Mark is required"
            break;
        } else if (isNaN(marks[i].mark)) {
            errors.mark = "Invalid entry"
            break;
        } else if (marks[i].mark < 0 || marks[i].mark > 100) {
            errors.mark = "Marks should be in between 0 & 100"
            break;
        }
    }

    return errors;
};