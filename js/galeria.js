document.addEventListener("DOMContentLoaded", function() {
    var audios = document.querySelectorAll("audio");

    audios.forEach(function(audio) {
        var progressBar = audio.parentElement.querySelector(".progress-bar");
        var tiempoReproduccion = audio.parentElement.querySelector(".tiempo-reproduccion");

        audio.addEventListener("timeupdate", function() {
            var percent = (audio.currentTime / audio.duration) * 100;
            progressBar.value = percent;
            tiempoReproduccion.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
        });

        audio.addEventListener("ended", function() {
            audio.currentTime = 0;
            audio.pause();
        });

        progressBar.addEventListener("input", function() {
            var time = parseFloat(progressBar.value);
            audio.currentTime = audio.duration * (time / 100);
        });
    });

    document.addEventListener("click", function(event) {
        audios.forEach(function(audio) {
            if (!audio.paused && !audio.parentElement.contains(event.target)) {
                audio.pause();
            }
        });
    });

    document.querySelectorAll(".imagen").forEach(function(imagen) {
        imagen.addEventListener("click", function() {
            var audio = imagen.querySelector("audio");
            if (audio.paused) {
                audios.forEach(function(audio) {
                    audio.pause();
                    audio.currentTime = 0;
                });
                audio.play();
            }
        });
    });
});

function formatTime(seconds) {
    var minutos = Math.floor(seconds / 60);
    var segundos = Math.floor(seconds % 60);
    segundos = segundos < 10 ? "0" + segundos : segundos;
    return minutos + ":" + segundos;
}
