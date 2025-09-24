
function random_integer(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function ten_combination(num){
    num[2] = 10;
    num[1] = random_integer(1,9);
    num[0] = num[2] - num[1];

    return num;
}

function one_digit_one_digit_combination(num) {
    num[2] = random_integer(10,18);
    
    do {
        num[1] = random_integer(1,9);
    }
    while (num[2] - num[1] >= 10);

    num[0] = num[2] - num[1];

    return num;
}

function two_digit_one_digit_combination(num) {
    let ten_digit = random_integer(1,8) * 10;

    one_digit_one_digit_combination(num);
    num[random_integer(0,1)] += ten_digit;
    num[2] += ten_digit;

    return num;
}

function two_digit_combination_lv1(num) {
    num[2] = random_integer(22,99);
    num[1] = random_integer(num[2] - 11, 11);
    num[0] = num[2] - num[1];

    return num;
}

function two_digit_combination_lv2(num) {
    num[0] = random_integer(11,99);
    num[1] = random_integer(11,99);
    num[2] = num[0] + num[1];

    return num;
}

function two_digit_combination_lv3(num) {
    let ten_digit = [0,0,0];
    
    one_digit_one_digit_combination(ten_digit);
    one_digit_one_digit_combination(num);
    num[0] += (ten_digit[0] * 10);
    num[1] += (ten_digit[1] * 10);
    num[2] = num[0] + num[1];

    return num;
}

function equation_print(num, type) {
    switch(type) {
        case 0:
            console.log(num[0] , "+" , num[1] , "=" , "____");
            break;
        case 1:
            console.log("____" , "+" , num[0] , "=" ,num[2]);
            break;
        case 2:
            console.log(num[0] , "+" , "____" , "=" ,num[2]);
            break;
        case 3:
            console.log(num[2] , "-" , num[1] , "=" , "____");
            break;
        case 4:
            console.log(num[2] , "-" , "____" , "=" , num[0]);
            break;
        case 99:
            console.log(num[0] , "+" , num[1] , "=" , num[2]);
            break;
    }
}

function quesGen(num, type) {
    let ques = "";

    switch(type) {
        case 0:
            ques = num[0] + " + " + num[1] + " = " + "____";
            break;
        case 1:
            ques = "____" + " + " + num[0] + " = " + num[2];
            break;
        case 2:
            ques = num[0] + " + " + "____" + " = " +num[2];
            break;
        case 3:
            ques = num[2] + " - " + num[1] + " = " + "____";
            break;
        case 4:
            ques = num[2] + " - " + "____" + " = " + num[0] ;
            break;
        case 99:
            ques = num[0] + " + " + num[1] + " = " + num[2];
            break;
    }

    return ques;
}

function quesSelector(profile) {
    let num = [];

    if (profile.type === "add") {
        switch(profile.level_id){
            case "10":
                return ten_combination(num);
                break;
            case "1to1":
                return one_digit_one_digit_combination(num);
                break;
            case "2to1":
                return two_digit_one_digit_combination(num)
                break;
            case "2to2":
                return two_digit_combination_lv1(num);
                break;
            default:
                break;
        }
    } else if (profile.type === "multi") {
                switch(profile.level_id){
            case "1to1":
                return one_digit_one_digit_combination(num);
                break;
            case "2to1":
                return two_digit_one_digit_combination(num)
                break;
            case "3to1":
                return two_digit_combination_lv1(num);
                break;
            default:
                break;
        }
    } else{}
    return num;
}

const q_profile = [
    {
        "type": "add",
        "level": 
            ["combination of ten",
            "one digit",
            "two digit to one digit",
            "two digit to two digit"]
        ,
        "level_id" : ["10", "1to1", "2to1", "2to2"],
        "difficulty": ["easy","hard"]
    },
    {
        "type": "multi",
        "level": [
            "one digit",
            "two digit to one digit",
            "three digit to one digit"
        ],
        "level_id" : ["1to1", "2to1", "3to1"],
        "difficulty": ["easy","hard"]
    }
    
]



function changeSelectOption(){
    let qtype = document.getElementById("qtype");
    let qlevel = document.getElementById("qlevel");
    let difficulty = document.getElementById("difficulty");

    qlevel.innerHTML = "";
    difficulty.innerHTML = "";

    for (let i = 0; i < q_profile.length; i++){
        if (qtype.value === q_profile[i].type){

            for (let j = 0; j < q_profile[i].level.length; j++){
                let option = document.createElement("option");
                option.text = q_profile[i].level[j];
                option.value = q_profile[i].level[j];
                qlevel.add(option);
            };

            for (let k = 0; k < q_profile[i].difficulty.length; k++){
                let option = document.createElement("option");
                option.text = q_profile[i].difficulty[k].charAt(0).toUpperCase() + q_profile[i].difficulty[k].slice(1);
                option.value = q_profile[i].difficulty[k];
                difficulty.add(option);
            };
        }
    }
}

 let quesGen_profile = [
    {
        "type": "",
        "level": "",
        "level_id" : "",
        "difficulty": "",
        "num_of_ques": ""
    },
 ]

document.addEventListener("DOMContentLoaded", function() {
    const qtype = document.getElementById("qtype");
    const qlevel = document.getElementById("qlevel");
    const difficulty = document.getElementById("difficulty");
    const numOfQues = document.getElementById("numofq");

    const questionsDiv = document.getElementById("questions");

    document.getElementById("generate").addEventListener("click", function() {

        // get latest value on button click
        quesGen_profile.type = qtype.value;
        quesGen_profile.difficulty = difficulty.value;
        quesGen_profile.num_of_ques = numOfQues.value;

        for (let i = 0; i < q_profile.length; i++){
            if (quesGen_profile.type === q_profile[i].type) {
                for (let j = 0; j < q_profile[i].level.length; j++){
                    if(qlevel.value === q_profile[i].level[j]){ 
                        quesGen_profile.level_id = q_profile[i].level_id[j];
                        break;
                    }
                }
            }
        }

        //Clear previous content
        questionsDiv.innerHTML = "";


        //debuging
        //questionsDiv.innerHTML += quesGen_profile.type + "<br>";
        //questionsDiv.innerHTML += quesGen_profile.level_id + "<br>";
        //questionsDiv.innerHTML += quesGen_profile.difficulty + "<br>";

        /*
        if (isNaN(quesGen_profile.num_of_ques)) {
            questionsDiv.innerHTML = "⚠️ Please enter a number!";
            return;
        } else {
            questionsDiv.innerHTML += quesGen_profile.num_of_ques; 
            questionsDiv.innerHTML += quesGen_profile.level_id; 
        }
        */
        
        for ( let i = 0; i < quesGen_profile.num_of_ques; i++){
            questionsDiv.innerHTML += "<br><br>" + (i+1) + ". " + quesGen(quesSelector(quesGen_profile), 99);
        }
    });
});



for (let i = 0; i < 6; i++)
{
    digit = [1,2,3];
    //ten_combinaiton(equ);
    //one_digit_one_digit_combination(equ);
    //two_digit_combination_lv3(equ);

    // printing question
    //equation_print(equ, random_integer(1,4));
    //let ten_digit = [0,0,0];
    
    //one_digit_one_digit_combination(ten_digit);
    //one_digit_one_digit_combination[equ];
    //equ[0] += (ten_digit[0] * 10);
    //equ[1] += (ten_digit[1] * 10);
    //equ[2] = equ[0] + equ[1];

    // printing answer
    quesGen(digit, 99);
    //equation_print(equ, 99);
    //console.log();
}




