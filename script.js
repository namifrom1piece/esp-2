function playAudio(id) {
    var audio = document.getElementById(id);
    if (audio) {
        audio.play();
    }
}

function scrollToDescription() {
    document.getElementById('description').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        document.getElementById('description').classList.add('show-description');
    }, 500);
}

document.getElementById("startButton").addEventListener("click", function() {
    window.location.href = "wordbank.html"; // Change this to the correct page
});