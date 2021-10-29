const answers = ['You may rely on it', 'My reply is No', 'Better not tell you now' ]; // constant variable named answers

const resetText = 'Ask me anything.'; // this is the text when it resets

// these are the two elements that make the ball
const ball = document.querySelector('#ball'); // this is the element that is the black part of the ball you click on
const text = document.querySelector('#text'); // this is the white part of the ball that shows the text


// these are all audio tags that point to sound files
const wandSound = document.querySelector('#wandsound'); 
const chimesSound = document.querySelector('#chimessound');
const bmagic = document.querySelector('#bmagic'); // music
bmagic.loop = true;


const musicOnButton = document.querySelector('#musicOn'); // this is the mute button
bmagic.muted = true; 
musicOnButton.innerHTML = 'Music: Off'; // changes text to music off
musicOnButton.addEventListener('click', startMusic); // add event listener to button for the click event run start music function

function startMusic() {
    if (bmagic.muted) { // if it is muted
    bmagic.play(); // play music
    bmagic.muted = false; // unmute it;
    musicOnButton.innerHTML = 'Music: On'; 
    } else { // if not muted do this
        bmagic.muted = true; 
        musicOnButton.innerHTML = 'Music: Off'; 
    }
};

function getAnswer() { // find answer in array
  const randomIndex = Math.floor(Math.random() * answers.length); // first get random index(number)
  return answers[randomIndex];
}

ball.addEventListener('click', () => { // when someone clicks the ball
   text.classList.add('fade-out'); // add class for fade out
   ball.classList.add('shake'); // add class for shake
   chimesSound.play(); // play chime sound
});

function reset() { // this will change the text to the reset text (ask me anything)
  text.innerHTML = resetText;
}

reset();

text.addEventListener('animationend', () => {
    if (text.innerHTML === resetText && text.classList.contains('fade-out')) { // if it faded out and it has reset text then we want to get a random answer;
        text.innerHTML = getAnswer(); // this gets a random answer text
        text.classList.remove('fade-out');
        text.classList.add('fade-in');
        stopChimeSound(); // stop chime sound
    } else if (text.classList.contains('fade-out')) { // if it fades out but it does not have reset text then it must have a random answer and we want to reset text
        reset();
        text.classList.remove('fade-out');
        text.classList.add('fade-in');
        stopChimeSound();
    } else { // it faded in so we want to stop the fade and shake and sound
        text.classList.remove('fade-in');
        ball.classList.remove('shake');
        stopChimeSound();
    }
    wandSound.play(); // everytime it fades in or out we want to play the magic wand sound
   
});

function stopChimeSound() {
    setTimeout(() => {
          chimesSound.pause(); // stop the chime sound
    chimesSound.currentTime = 0;
    }, 500); // set timeout out delay for 500ms or half of 1 second
  
}