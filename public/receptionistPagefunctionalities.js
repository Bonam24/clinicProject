
function animation() {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
        emojiSize: 40,
        confettiNumber: 100,
        spread: 70
    });
}



function prventBack() { window.history.forward(); }
setTimeout("prventBack()", 0);
window.onunload = function () { null };

function confirmDelete() {
    return confirm("Are you sure you want to delete this record?");
}