class Csp {
    constructor(id, title, desc, imageURL, igURL,
        telehandle, signupFormURL, signupDeadline, isLocal, noOfHours, causes, skills, settings, posterURL, postalCode ) {
            this.id = id;
            this.title = title;
            this.desc = desc;
            this.imageURL = imageURL;
            this.igURL = igURL;
            this.telehandle = telehandle;
            this.signupFormURL = signupFormURL;
            this.signupDeadline = signupDeadline;
            this.isLocal = isLocal;
            this.noOfHours = noOfHours;
            this.causes = causes;
            this.skills = skills;
            this.settings = settings;
            this.posterURL = posterURL;
            this.postalCode = postalCode;
    }
}

module.exports = Csp;