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