class Student {
    constructor(id, firstName, lastName, email, quizPreference, registeredCsps
        , achievements, statusOfCompletion ) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.quizPreference = quizPreference;
            this.registeredCsps = registeredCsps;
            this.achievements = achievements;
            this.statusOfCompletion = statusOfCompletion;

    }
}

module.exports = Student;