function playAudio(id) {
    var audio = document.getElementById(id);
    if (audio) {
        audio.play();
    }
}

document.querySelectorAll(".playButton").forEach(button => {
    button.addEventListener("click", function() {
        var audioFile = button.getAttribute("data-audio"); // Each button should have a data-audio attribute
        if (audioFile) {
            var audio = new Audio(`audio/${audioFile}`); // Replace 'audio/' with the correct folder path if needed
            audio.play();
        }
    });
});

function scrollToDescription() {
    document.getElementById('description').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        document.getElementById('description').classList.add('show-description');
    }, 500);
}

document.getElementById("startButton").addEventListener("click", function() {
    window.location.href = "wordbank.html"; // Change this to the correct page
});
