// scroll arrow
function scrollToDescription() {
    document.getElementById('description').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        document.getElementById('description').classList.add('show-description');
    }, 500);
}

// audio system
const audioQueue = {
    queue: [],
    playing: false,
    
    // adds id to audio
    add: function(audioId) {
        this.queue.push(audioId);
        this.updateQueueDisplay();
        
        // if not currently playing anything, start playing
        if (!this.playing) {
            this.playNext();
        }
    },
    
    // play next in queue
    playNext: function() {
        if (this.queue.length === 0) {
            this.playing = false;
            if (document.getElementById('status')) {
                document.getElementById('status').textContent = 'Ready to play sounds';
            }
            this.updateQueueDisplay();
            return;
        }
        
        // initialize
        this.playing = true;
        
        // get next audio id
        const nextAudioId = this.queue.shift();
        this.updateQueueDisplay();
        
        // update status
        if (document.getElementById('status')) {
            document.getElementById('status').textContent = `Playing: ${nextAudioId}`;
        }
        
        // get the audio element
        const audioElement = document.getElementById(nextAudioId);
        
        if (!audioElement) {
            console.error('Audio element not found:', nextAudioId);
            this.playNext(); // Skip to next audio
            return;
        }
        
        // reset audio to beginning
        audioElement.currentTime = 0;
        
        // when audio ends, play the next one in queue
        const endedHandler = () => {
            this.playNext();
        };
        
        // remove existing ended event listeners to prevent duplicates
        audioElement.removeEventListener('ended', endedHandler);
        audioElement.addEventListener('ended', endedHandler);
        
        // errors
        audioElement.onerror = () => {
            console.error('Error playing audio:', nextAudioId);
            if (document.getElementById('status')) {
                document.getElementById('status').textContent = `Error playing: ${nextAudioId}`;
            }
            this.playNext(); // skip to next audio
        };
        
        // play the audio
        const playPromise = audioElement.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error('Play error:', error);
                this.playNext();
            });
        }
    },
    
    // update queue display
    updateQueueDisplay: function() {
        const queueDisplay = document.getElementById('queue-display');
        if (!queueDisplay) return;
        
        if (this.queue.length === 0) {
            queueDisplay.textContent = 'Queue: Empty';
        } else {
            queueDisplay.textContent = 'Queue: ' + this.queue.join(' → ');
        }
    }
};

// modified playAudio function to use the queue
function playAudio(id) {
    console.log("Playing audio:", id);
    audioQueue.add(id);
}

// initialize other button listeners
document.addEventListener('DOMContentLoaded', function() {
    // initialize playButton listeners if they exist
    document.querySelectorAll(".playButton").forEach(button => {
        button.addEventListener("click", function() {
            var audioFile = button.getAttribute("data-audio");
            if (audioFile) {
                audioQueue.add(`audio/${audioFile}`);
            }
        });
    });
    
    // initialize data-sound button listeners if they exist
    document.querySelectorAll('button[data-sound]').forEach(button => {
        button.addEventListener('click', function() {
            const audioSrc = this.getAttribute('data-sound');
            audioQueue.add(audioSrc);
        });
    });
    
    // initialize startButton if it exists
    const startButton = document.getElementById("startButton");
    if (startButton) {
        startButton.addEventListener("click", function() {
            window.location.href = "wordbank.html";
        });
    }
    
    // check if myImage exists and add listener
    const myImage = document.getElementById('myImage');
    if (myImage) {
        myImage.addEventListener('click', function() {
            audioQueue.add('audio/sound1.mp3');
        });
    }
    
    // styling for status and queue display
    const statusElement = document.getElementById('status');
    const queueElement = document.getElementById('queue-display');
    
    if (statusElement && queueElement) {
        statusElement.style.textAlign = 'center';
        statusElement.style.marginTop = '20px';
        statusElement.style.fontWeight = 'bold';
        
        queueElement.style.textAlign = 'center';
        queueElement.style.marginTop = '10px';
        queueElement.style.padding = '10px';
        queueElement.style.backgroundColor = '#f0f0f0';
        queueElement.style.borderRadius = '5px';
    }
});