const linkTowardsStudentJson = "http://petlatkea.dk/2019/hogwartsdata/students.json";
const linkTowardsFamilyNamesJson = "http://petlatkea.dk/2019/hogwartsdata/families.json";
const sortingSection = document.querySelector("#sortingSection");
const expelledButton = sortingSection.querySelector("#expelledStudents");
const houseFilter = sortingSection.querySelector("#houseFilter");
const nameList = document.querySelector("#nameList");
const blackOverlay = document.querySelector("#blackOverlay");
const studentList = [];
let i = 0; // Integer Meant for Looping in studentList.
let i2 = 0; //Integer Meant for sorting algorithm.
let integerMeantForOneTimeUse = 0; // Integer Meant for injecting myself.
let sortingVariable;
let halfFamilies = []; // Making it global.
let pureFamilies = []; // Making it global.
let lengthOfStudent = studentList.length; // Fixing initialization error.
let allStudentsInteger = 0;
let houseGryffindorInteger = 0;
let houseSlytherinInteger = 0;
let houseHufflepuffInteger = 0;
let houseRavenclawInteger = 0;



function Student(First, Last, House, Gender, Nickname) {
    this.firstName = First;
    this.lastName = Last;
    this.houseS = House;
    this.gender = Gender;
    this.nickname = Nickname;
    this.expelled = false;
    this.prefect = false;
    this.racialProfile = checkRacialProfile(Last);
    this.inquisition = false;
    this.getGender = function () {return this.gender};
    this.getFirstName = function() {
        if(this.nickname !== undefined){
            return this.firstName + " " + this.nickname;
        } else {
            return this.firstName
        }
    };
    this.getLastName = function() {
        if(this.lastName !== undefined) {
            return this.lastName
        } else {
            return ""
        }
    };
    this.getHouse = function() {return this.houseS};
    this.expel = function () {
        this.expelled = true;
    };
    this.getExpelled = function () {
        return this.expelled;
    };
    this.getPrefect = function () {
        return this.prefect;
    };
    this.doprefect = function () {
        this.prefect = true;
    };
    this.unPrefect = function () {
        this.prefect = false;
    };
    this.getBlood = function () {
        return this.racialProfile
    };
    this.addToInquisition = function () {
        this.inquisition = true;
    };
    this.removeFromInquisition = function () {
        this.inquisition = false;
    };
    this.getInquisitionEligibility = function () {
        return this.houseS === "Slytherin" || this.racialProfile === "Pure-Blooded";
    };
    this.getInquisitionStatus = function () {
        return this.inquisition;
    }
}
function main(fullName, house, initial, gender) {
    let student = document.createElement("article");
    if(integerMeantForOneTimeUse === 0) {
        injectMyself();
    }
    createStudentDOM();
    if(initial === "initial") {
        createStudent(student, gender);
        countStudentsDisplay();
        lengthOfStudent ++;
    }
    if(houseFilter.value === "all") {
        nameList.appendChild(student);
    } else {
        if(house === houseFilter.value) {
            nameList.appendChild(student);
        }
    }
    function injectMyself() {
        integerMeantForOneTimeUse ++;
        const myself = new Student("Robert Alin", "Coroama", "Slytherin", "Boy");
        const myName = document.createElement('p');
        myName.innerHTML = "Name: " + "Robert Alin Coroama";
        myName.classList.add("name");
        const myHouse = document.createElement('p');
        myHouse.innerHTML = "House: " + "Slytherin";
        myHouse.classList.add("house");
        const myArticle = document.createElement("article");
        myArticle.appendChild(myName);
        myArticle.appendChild(myHouse);
        nameList.appendChild(myArticle);
        studentList.push(myself);
    }
    function createStudentDOM() {
        let name = document.createElement("p");
        let houseOfStudent = document.createElement("p");
        name.classList.add("name");
        houseOfStudent.classList.add("house");
        name.innerText = "Name: " + fullName;
        countStudents(house);
        houseOfStudent.innerText = "House: " + house;
        student.appendChild(name);
        student.appendChild(houseOfStudent);
    }
}
function popUp(article) {
    let student = findStudent(article.querySelector(".name").innerHTML.substring(article.querySelector(".name").innerHTML.lastIndexOf(": ") + 2));
    let foundStudent;
    let objectArray = [];
    let popUP = objectInitialize("div", "popUP");
    let popUPPhoto = objectInitialize("img", "popUPPhoto");
    let popUPName = objectInitialize("p", "popUPName");
    let popUPHouse = objectInitialize("p", "popUPHouse");
    let popUPGender = objectInitialize("p", "popUPGender");
    let popUPRacialProfile = objectInitialize("p", "popUPRacialProfile");
    let popUPHouseCrest = objectInitialize("img", "popUPHouseCrest");
    let popUPExpelButton = objectInitialize("button", "popUPExpelButton");
    let popUPPrefectButton = objectInitialize("button", "popUPPrefectButton");
    let popUPInquisitionButton = objectInitialize("button", "popUPInquisitionButton");

    function eventListenerAction(student, studentMethod1, studentMethod2, extra1, innerText, button, extra2) {
        foundStudent = studentLoop(student);
        if(extra2 === undefined) {
            if(studentMethod2 === true) {
                modifyStudentName(extra1);
            } else {
                modifyStudentName();
            }
        } else {
            if(studentMethod2 === true) {
                modifyStudentName(extra2, extra1);
            } else {
                modifyStudentName(extra1);
            }
        }
        eval(button).innerText = innerText;
    }
    function studentLoop(student) {
        i = 0;
        for (; i < lengthOfStudent; i++) {
            if(student.getFirstName() === studentList[i].getFirstName() && student.getLastName() === studentList[i].getLastName()) {
                return studentList[i]
            }
        }
    }
    function modifyStudentName(extra, extra1) {
        if(extra === "addExtra"){
            popUPName.innerHTML += " (" + extra1 + ")";
            return;
        }
        popUPName.innerHTML = student.getFirstName() + " " + student.getLastName();
        if(extra !== undefined) {
            popUPName.innerHTML += " (" + extra + ")"
        }
    }
    function objectInitialize(tag, id) {
        let object = document.createElement(tag);
        object.id = id;
        switch (id) {
            case "popUP":
                object.classList.add(student.getHouse());
                break;
            case "popUPName":
                object.innerHTML = student.getFirstName() + " " + student.getLastName();
                objectArray.push(id);
                break;
            case "popUPRacialProfile":
                object.innerHTML = "Blood: " + student.getBlood();
                objectArray.push(id);
                break;
            case "popUPHouse":
                object.innerHTML = "House: " + student.getHouse();
                objectArray.push(id);
                break;
            case "popUPGender":
                object.innerHTML = "Gender: " + student.getGender();
                objectArray.push(id);
                break;
            case "popUPHouseCrest":
                object.src = "images/" + student.getHouse() + ".jpg";
                objectArray.push(id);
                break;
            case "popUPPhoto":
                if(student.getLastName() !== "" ) {
                    object.src = "images/" + findPhoto(student) + ".png";
                    objectArray.push(id);
                }
                break;
            case "popUPExpelButton":
                object.innerHTML = "Expel";
                break;
            case "popUPPrefectButton":
                object.innerHTML = "Add as Prefect";
                break;
            case "popUPInquisitionButton":
                object.innerHTML = "Add to Inquisition Squad";
                break;
        }
        return object;
    }
    function openBlack() {
        blackOverlay.style.display = "block";
        document.body.addEventListener("click", event => {
            if(event.target.id === "blackOverlay") {
                if(expelledButton.innerText === "See Expelled Students") {
                    popUP.remove();
                    blackOverlay.style.display = "none";
                    reinitialize("normal");
                } else {
                    popUP.remove();
                    blackOverlay.style.display = "none";
                }
            }
        });
    }
    function verifyStudentProperties(property) {
        switch(property) {
            case "isExpelled?":
                doExpelledAction();
                break;
            case "isPrefect?":
                doPrefectAction();
                break;
            case "isInquisitorMember?":
                doInquisitorAction();
                break;
        }
        function doExpelledAction() {
            if(student.getExpelled() === true) {
                modifyStudentName("Expelled");
            } else {
                popUP.appendChild(popUPExpelButton);
                popUP.appendChild(popUPPrefectButton);
                if(student.getInquisitionEligibility()) {
                    popUP.appendChild(popUPInquisitionButton);
                }
            }
        }
        function doPrefectAction() {
            if(student.getPrefect() === true) {
                modifyStudentName("addExtra", "Prefect");
                popUPPrefectButton.innerText = "Remove as Prefect";
            }
        }
        function doInquisitorAction() {
            if(student.getInquisitionStatus() === true) {
                modifyStudentName("addExtra", "Inquisition Member");
                popUPInquisitionButton.innerText = "Remove from Inquisition Squad";
            }
        }
    }
    function appendObjects() {
        objectArray.forEach(element => {
            popUP.appendChild(eval(element))
        });
        document.querySelectorAll("article").forEach( element => {
          element.style.animation = "paused";
        })
    }
    function expelButtonEventListener() {
        popUPExpelButton.addEventListener("click", () => {
            if(student.getFirstName() + " " + student.getLastName() !== "Robert Alin Coroama") {
                expelAction();
                if(foundStudent.getPrefect() === true) {
                    foundStudent.unPrefect();
                }
                if(foundStudent.getInquisitionStatus() === true) {
                    foundStudent.removeFromInquisition();
                }
            } else {
                alert("Don't even try!");
            }
        });
        function expelAction() {
            student.expel();
            popUPName.innerHTML = student.getFirstName() + " " + student.getLastName() + " (Expelled)";
            popUPExpelButton.remove();
            popUPPrefectButton.remove();
            popUPInquisitionButton.remove();
            foundStudent = studentLoop(student);
            foundStudent.expel();
        }
    }
    function prefectButtonEventListener() {
        popUPPrefectButton.addEventListener("click", () => {
            if(!student.getPrefect() === true) {
                let availableORstudent = checkPrefect(student);
                if(availableORstudent === "Available") {
                    eventListenerAction(student, student.doprefect(), student.getInquisitionStatus(), "Prefect", "Remove as Prefect", "popUPPrefectButton", "addExtra");
                }
                else {

                    let popUPChangePrefect = document.createElement("div");
                    let popUPChangePrefectMessage = document.createElement("p");
                    let popUPChangePrefectMessageReject = document.createElement("button");
                    let popUPChangePrefectMessageAccept = document.createElement("button");
                    function acceptMessage() {
                        foundStudent = studentLoop(availableORstudent);
                        foundStudent.unPrefect();
                        eventListenerAction(student, student.doprefect(), student.getInquisitionStatus(), "Prefect", "Remove as Prefect", "popUPPrefectButton", "addExtra");
                        blackOverlay.style.zIndex = "99";
                        popUPChangePrefect.remove();
                    }
                    function addModal() {
                        popUPChangePrefect.id = "popUPChangePrefect";
                        blackOverlay.style.zIndex = "101";
                        popUPChangePrefectMessage.innerHTML = "Do you wish to remove " + availableORstudent.getFirstName() + " " +availableORstudent.getLastName() + " as prefect and add " + student.getFirstName() + " " +student.getLastName();
                        popUPChangePrefectMessageReject.innerText = "Reject";
                        popUPChangePrefectMessageAccept.innerText = "Accept";
                        popUPChangePrefectMessageReject.addEventListener("click", () => {
                            popUPChangePrefect.remove();
                            blackOverlay.style.zIndex = "99";
                        });
                        popUPChangePrefectMessageAccept.addEventListener("click", acceptMessage);
                        popUPChangePrefect.appendChild(popUPChangePrefectMessage);
                        popUPChangePrefect.appendChild(popUPChangePrefectMessageAccept);
                        popUPChangePrefect.appendChild(popUPChangePrefectMessageReject);
                        document.body.appendChild(popUPChangePrefect);
                    }
                    addModal();
                }
            } else {
                foundStudent = studentLoop(student);
                foundStudent.unPrefect();
                if(student.getInquisitionStatus() === true) {
                    modifyStudentName("Inquisition Member");
                } else {
                    modifyStudentName();
                }
                popUPPrefectButton.innerText = "Add as Prefect"
            }
        });
    }
    function inquisitionButtonEventListener() {
        popUPInquisitionButton.addEventListener("click", () => {
            if(!student.getInquisitionStatus() === true) {
                eventListenerAction(student, student.addToInquisition(), student.getPrefect(), "Inquisition Member", "Remove from Inquisition Squad", "popUPInquisitionButton", "addExtra");
                setTimeout(() => {
                    eventListenerAction(student, student.removeFromInquisition(), student.getPrefect(), "Prefect", "Add to Inquisition Squad", "popUPInquisitionButton");
                }, 5000)
            } else {
                eventListenerAction(student, student.removeFromInquisition(), student.getPrefect(), "Prefect", "Add to Inquisition Squad", "popUPInquisitionButton");
            }
        });
    }
    function verifyStudentPropertiesAll() {
        verifyStudentProperties("isExpelled?");
        verifyStudentProperties("isPrefect?");
        verifyStudentProperties("isInquisitorMember?");
    }
    function addEventListenersAll() {
        inquisitionButtonEventListener();
        expelButtonEventListener();
        prefectButtonEventListener();
    }
    verifyStudentPropertiesAll();
    addEventListenersAll();
    appendObjects();
    openBlack();

    document.body.appendChild(popUP);
}
function createStudent(student, gender) {
    let firstName = student.querySelector(".name").innerHTML.split(" ")[1];
    let nickname;
    let lastName;
    if(student.querySelector(".name").innerHTML.split(" ")[3]) {
        nickname = student.querySelector(".name").innerHTML.split(" ")[2];
        lastName = student.querySelector(".name").innerHTML.split(" ")[3];
    }
    else {
        lastName = student.querySelector(".name").innerHTML.split(" ")[2];
    }
    let house = student.querySelector(".house").innerHTML.split(" ")[1];
    let newStudent = new Student(firstName, lastName, house, gender, nickname);
    studentList.push(newStudent);
}
function reinitialize(type) {
    reinitializeHelper();
    for (; i < lengthOfStudent; i++) {
        if(type === "normal") {
            if(!studentList[i].getExpelled()) {
                main(studentList[i].getFirstName() + " " +  studentList[i].getLastName(), studentList[i].getHouse())
            }
        } else {
            if(studentList[i].getExpelled()) {
                main(studentList[i].getFirstName() + " " +  studentList[i].getLastName(), studentList[i].getHouse())
            }
        }
        countStudentsDisplay()
    }
}
function countStudentsDisplay() {
    sortingSection.querySelector("#Hufflepuff").innerHTML = "Hufflepuff (" + houseHufflepuffInteger +  ")";
    sortingSection.querySelector("#Gryffindor").innerHTML = "Gryffindor (" + houseGryffindorInteger +  ")";
    sortingSection.querySelector("#Ravenclaw").innerHTML = "Ravenclaw (" + houseRavenclawInteger +  ")";
    sortingSection.querySelector("#Slytherin").innerHTML = "Slytherin (" + houseSlytherinInteger +  ")";
    sortingSection.querySelector("#all").innerHTML = "All Students (" + allStudentsInteger +  ")";
}
function reinitializeHelper() {
    allStudentsInteger = 0;
    houseGryffindorInteger = 0;
    houseSlytherinInteger = 0;
    houseHufflepuffInteger = 0;
    houseRavenclawInteger = 0;
    nameList.innerHTML = "";
    i = 0;
    lengthOfStudent = studentList.length;
}
function sortStudents(byWhat) {
    if(byWhat !== sortingVariable) {
        sortingVariable = byWhat;
        switcher(1, -1)
    }
    else {
        sortingVariable = "else";
        switcher(-1, 1)
    }
    function switcher(var1, var2) {
        switch (byWhat) {
            case "firstName":
                studentList.sort((a, b) => (a.getFirstName() > b.getFirstName()) ? var1 : var2);
                switcherHelper();
                break;
            case "lastName":
                studentList.sort((a, b) => (a.getLastName() > b.getLastName()) ? var1 : var2);
                switcherHelper();
                break;
            case "houseName":
                if(houseFilter.value === "all") {
                    studentList.sort((a, b) => (a.getHouse() > b.getHouse()) ? var1 : var2);
                    switcherHelper();
                }
                break;
        }
    }
    function switcherHelper() {
        if(expelledButton.innerHTML === "See Expelled Students") {
            reinitialize("normal");
        } else {
            reinitialize("expelled");
        }
    }
}
function makeStringNice(string) {
    if(string === undefined) {
        return "";
    } else {
        let splitStr = string.toString().toLowerCase().trim().split(' ');
        for (let i3 = 0; i3 < splitStr.length; i3++) {
            splitStr[i3] = splitStr[i3].charAt(0).toUpperCase() + splitStr[i3].substring(1);
            if(splitStr[i3].charAt(0) === '"' ) {
                splitStr[i3] = '"' + splitStr[i3].charAt(1).toUpperCase() + splitStr[i3].substring(2);
            }
            if(splitStr[i3].includes("-")) {
                let index = splitStr[i3].indexOf("-");
                splitStr[i3] = splitStr[i3].substring(0, index) + "-" + splitStr[i3].charAt(index + 1).toUpperCase() + splitStr[i3].substring(index + 2)
            }
        }
        return splitStr.join(' ');
    }
}
function toggleExpelled(target) {
    if(target.target.innerHTML === "See Enrolled Students") {
        reinitialize("normal");
        target.target.innerHTML = "See Expelled Students";
    } else {
        reinitialize("expelled");
        target.target.innerHTML = "See Enrolled Students";
    }
}
function addFamilies(data) {
    halfFamilies = data.half;
    pureFamilies = data.pure;
}
function checkRacialProfile(lastName) {
    let racialProfile = "Muggle";
    i = 0;
    for (; i < pureFamilies.length; i++) {
        if(lastName === pureFamilies[i]) {
            racialProfile = "Pure-Blooded"
        }
    }
    i = 0;
    for (; i < halfFamilies.length; i++) {
        if(lastName === halfFamilies[i]) {
            racialProfile = "Half-Muggle"
        }
    }
    racialProfile = hackFamilies(racialProfile);
    return racialProfile;
}
function hackFamilies(racialProfile) {
    if(racialProfile === "Muggle") {
        return "Pure-Blooded"
    }
    if(racialProfile === "Pure-Blooded") {
        let randomInt = getRandomInt(3);
        switch (randomInt) {
            case 0:
                return "Pure-Blooded";
            case 1:
                return "Muggle";
            case 2:
                return "Half-Muggle";
        }
    }
    return "Half-Muggle";
}
function getRandomInt(maxValue) {
    return Math.floor(Math.random() * Math.floor(maxValue));
}
function addEventListeners() {
    document.body.addEventListener("click", event => {
        if(event.target.nodeName === "ARTICLE") {
            popUp(event.target);
        }
    });
    houseFilter.addEventListener("change", () =>{
        if(expelledButton.innerHTML === "See Expelled Students") {
            reinitialize("normal");
        } else {
            reinitialize("expelled");
        }
    });
    sortingSection.querySelector("#firstNameSort").addEventListener("click", () =>{sortStudents("firstName")});
    sortingSection.querySelector("#lastNameSort").addEventListener("click", () =>{sortStudents("lastName")});
    sortingSection.querySelector("#houseNameSort").addEventListener("click", () =>{sortStudents("houseName")});
    expelledButton.addEventListener("click", event => toggleExpelled(event));
}
function fetchJson() {
    fetch(linkTowardsFamilyNamesJson).then(e=>e.json()).then(data => addFamilies(data));
    fetch(linkTowardsStudentJson).then(e=>e.json()).then(data => data.forEach((data) => {
        main(makeStringNice(data.fullname), makeStringNice(data.house), "initial", makeStringNice(data.gender))
    }));
}
function findStudent(name) {
    i = 0;
    for (; i < lengthOfStudent; i++) {
        if(studentList[i].getFirstName() + " " + studentList[i].getLastName() === name) {
            return studentList[i]
        }
        if(studentList[i].getFirstName() === name) {
            return studentList[i]
        }
    }

}
function findPhoto(student) {
    if(student.getLastName() !== "") {
        let lastName;
        let initial;
        if (student.getLastName().includes("-")) {
            lastName = student.getLastName().substring(student.getLastName().lastIndexOf("-") + 1)[0].toLowerCase() + student.getLastName().substring(student.getLastName().lastIndexOf("-") + 2);
        } else {
            lastName = student.getLastName()[0].toLowerCase() + student.getLastName().substring(1);
        }
        i = 0;
        let i4 = 0;
        for (; i < lengthOfStudent; i++) {
            if (student.getLastName() === studentList[i].getLastName()) {
                i4++;
                if (i4 >= 2) {
                    initial = student.getFirstName()[0].toLowerCase() + student.getFirstName().substring(1);
                } else {
                    initial = student.getFirstName()[0].toLowerCase();
                }
            }
        }
        return lastName + "_" + initial;
    }
}
function checkPrefect(student) {
    let house = student.getHouse();
    let gender = student.getGender();
    i = 0;
    for(; i < lengthOfStudent; i++) {
        if(studentList[i].getHouse() === house && studentList[i].getGender() === gender) {
            if (studentList[i].getPrefect()) {
                return studentList[i];
            } else {
                return "Available";
            }
        }
    }
}
function countStudents(house) {
    allStudentsInteger ++;
    switch (house) {
        case "Gryffindor":
            houseGryffindorInteger++;
            break;
        case "Hufflepuff":
            houseHufflepuffInteger++;
            break;
        case "Ravenclaw":
            houseRavenclawInteger++;
            break;
        case "Slytherin":
            houseSlytherinInteger++;
            break;

    }
}

fetchJson();
addEventListeners();


