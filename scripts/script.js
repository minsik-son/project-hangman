jsonData = {
    "answers":[
       {
          "answer":"canada",
          "hint":"a country"
       },
       {
         "answer":"firetruck",
         "hint":"911"
      },
      {
         "answer":"computer",
         "hint":"you are touching this"
      },
      {
         "answer":"snow",
         "hint":"winter and white"
      },
       {
          "answer":"apple",
          "hint":"a fruit"
       },
       {
        "answer":"water",
        "hint":"H2O"
        },
        {
         "answer":"qatar",
         "hint":"2022 World Cup host country"
         },
         {
          "answer":"theater",
          "hint":"a place to watch a movie"
        }
    ]
 };

const answer = document.querySelector("#answer");
const incorrect_count = document.querySelector('.incorrect_count');
const lost_answer = document.querySelector('.lost_answer');
const background_img = document.querySelector('.background_img');
const hint_answer = document.querySelector("#hint_answer");

let incorrect_num = 0;
let challenge_word = '';
let answer_word = '';
let img_num = 1;


String.prototype.showword = function(num, word) {
    if (num >= this.length) {
        return this.valueOf();
    }
 
    let chars = this.split('');
    chars[num] = word;
    chars = chars.join('');
    return chars;
}

//make _ words
function makeHide(word){
    for(i=0; i < word.length; i++){
        challenge_word += '_';
    }
    answer_word = word;
    answer.innerHTML = challenge_word;
}


function searchChar(value){
    for(i = 0; i < answer_word.length; i++){
        if(value === answer_word.charAt(i)){
            challenge_word = challenge_word.showword(i, value);
        }
    }
    if(answer_word.indexOf(value) == -1){
        incorrect_num += 1;
        incorrect_count.innerHTML = incorrect_num;
        nextImage();
    }
}

//functions that run when clicked
$('.words').click(function() {
    let value = $(this).val().toLowerCase();
    $(this).css({"opacity": "0.4"});
    $(this).prop('disabled', true);
    searchChar(value);
    answer.innerHTML = challenge_word;
    success();
    gameOver();
  });



function get_img_src(img_num) {
    return `./images/hangman${img_num}.jpeg`;
  }

function nextImage(){
    img_num++;
    background_img.src = get_img_src(img_num);
}

function playAgain(){
    window.location.href = "index.html";
}

  function gameOver(){
      if(incorrect_num == 7){
        $('.words').prop('disabled', true);
        document.getElementById("lose_page").style.opacity = "1";
        document.querySelector(".hangman").style.zIndex = "-1";
      }
  }

function success(){
    if(challenge_word.indexOf('_') == -1){
        $('.words').prop('disabled', true);
        document.getElementById("win_page").style.opacity = "1";
        document.querySelector(".hangman").style.zIndex = "-1";
    }
}

//output json value randomly
function mix_count(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let json_counter = mix_count(0,7);
const key = jsonData.answers[json_counter].answer;
localStorage.setItem("local_key", key);

let key2;
const hint = jsonData.answers[json_counter].hint;
hint_answer.innerHTML = hint;
document.querySelector(".win_answer").innerHTML = localStorage.getItem("local_key");
document.querySelector(".lose_answer").innerHTML = localStorage.getItem("local_key");
makeHide(key);



