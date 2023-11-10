const userSeed = require("./user.seed")
const enrolmentSeed = require("./enrolment.seed")
const courseSeed = require("./course.seed")
const contentSeed = require("./content.seed")



const seeding = async () =>  {
    
    try {
        await Promise.all[
    userSeed(),
    enrolmentSeed(),
    courseSeed(),
    contentSeed()
    ]
    } catch (error) {
        console.log(error);
        
    }



}

seeding()