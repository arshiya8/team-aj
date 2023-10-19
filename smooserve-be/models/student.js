class Student {
    constructor(id, firstName, lastName, email, quizPreference, registeredCsps
        , achievements, statusOfCompletion, favouriteCsps) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.quizPreference = quizPreference;
            this.registeredCsps = registeredCsps;
            this.achievements = achievements;
            this.statusOfCompletion = statusOfCompletion;
            this.favouriteCsps = favouriteCsps

    }
}

module.exports = Student;