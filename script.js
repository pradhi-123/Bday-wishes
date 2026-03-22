// Music Toggle Logic
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
let isMusicPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '<span>🎵 Play Music</span>';
    } else {
        bgMusic.play();
        musicBtn.innerHTML = '<span>🎶 Pause Music</span>';
    }
    isMusicPlaying = !isMusicPlaying;
});

// Try to auto-play immediately on load
bgMusic.volume = 0.5;
let playPromise = bgMusic.play();

if (playPromise !== undefined) {
    playPromise.then(() => {
        isMusicPlaying = true;
        musicBtn.innerHTML = '<span>🎶 Pause Music</span>';
    }).catch(error => {
        // Auto-play was prevented by the browser's strict interaction policy
        // Set it to play stealthily on the very first user interaction (like clicking the gift box)
        document.body.addEventListener('click', () => {
            if (!isMusicPlaying && bgMusic.paused) {
                bgMusic.play().then(() => {
                    isMusicPlaying = true;
                    musicBtn.innerHTML = '<span>🎶 Pause Music</span>';
                });
            }
        }, { once: true });
    });
}

// Page Navigation
function nextPage(currentPage) {
    const currentSection = document.getElementById(`page-${currentPage}`);
    const nextSection = document.getElementById(`page-${currentPage + 1}`);

    if (currentSection && nextSection) {
        currentSection.classList.remove('active');
        nextSection.classList.add('active');

        // Trigger specific logic for certain pages
        if (currentPage + 1 === 9) {
            startTypewriter();
        }
        if (currentPage + 1 === 10) {
            createConfetti();
        }
    }
}

// Floating Aesthetics background effect
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Diverse cute emojis
    const aestheticsArray = ['🤍', '🤍', '🤍', '💖', '💕', '💌', '💘', '💗', '🎀', '✨'];
    heart.innerText = aestheticsArray[Math.floor(Math.random() * aestheticsArray.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    
    const duration = Math.random() * 4 + 5; // 5 to 9 seconds
    heart.style.animationDuration = duration + 's';
    
    // Randomize size heavily
    const size = Math.random() * 2 + 0.8;
    heart.style.fontSize = `${size}rem`;

    // Randomize path
    const wiggle = Math.random() > 0.5 ? 'floatUpWiggle1' : 'floatUpWiggle2';
    heart.style.animationName = wiggle;

    document.getElementById('hearts-container').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createHeart, 600);

// Typewriter Effect for the Letter
const letterText = `My dearest Jency,\n\nI can't even begin to describe how much you mean to me. We've been through so much together, from our weirdest inside jokes to our deepest late-night talks. \n\nYou are the person I know I can always count on, the one who makes bad days better just by being there. Thank you for being you, for understanding my crazy, and for giving me the best memories.\n\nI promise to always be here for you too, no matter what. Let's make this year the best one yet!\n\nHappy Birthday once again! 💖\n\nYours forever, \nPradhiksha`;

let i = 0;
let speed = 50; 

function startTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    const letterNextBtn = document.getElementById('letter-next-btn');
    typewriterElement.innerHTML = '';
    i = 0;
    
    function typeWriter() {
        if (i < letterText.length) {
            if(letterText.charAt(i) === '\n') {
                typewriterElement.innerHTML += '<br>';
            } else {
                typewriterElement.innerHTML += letterText.charAt(i);
            }
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Show next button when typing is done
            letterNextBtn.style.display = 'inline-block';
            setTimeout(() => {
                letterNextBtn.style.opacity = '1';
            }, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// Confetti Effect for the Final Page
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ffb7b2', '#e2f0cb', '#c7ceea', '#ffdeeb', '#f1c40f', '#e74c3c', '#3498db'];

    for (let j = 0; j < 100; j++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        // Random shape
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        container.appendChild(confetti);
    }
}

// Interactive Gift Box Logic
function openGift() {
    const lid = document.querySelector('.gift-lid') || document.querySelector('.luxury-gift-lid');
    const bowtie = document.querySelector('.gift-bowtie') || document.querySelector('.luxury-gift-bow');
    const text = document.querySelector('.tap-text') || document.querySelector('.coquette-tap-text');
    const giftWrapper = document.querySelector('.interactive-gift');
    
    if(giftWrapper && giftWrapper.classList.contains('opened')) return; // prevent double clicks
    if(giftWrapper) giftWrapper.classList.add('opened');
    
    // Animate lid blowing off elegantly
    if(lid) {
        lid.style.transform = 'translateY(-40px) rotate(-5deg)';
        lid.style.opacity = '0';
    }
    if(bowtie) {
        bowtie.style.transform = 'translateX(-50%) translateY(-40px) rotate(-5deg)';
        bowtie.style.opacity = '0';
    }
    if(text) {
        text.style.opacity = '0';
        text.style.transform = 'translateY(10px)';
    }
    
    // Smooth transition to next page after showing the opened box
    setTimeout(() => {
        nextPage(1);
    }, 900);
}
