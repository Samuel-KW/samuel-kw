// Toggle menu
document.getElementById('toggle-menu').addEventListener('click', function() {
    this.classList.toggle('clicked');
});


// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('scripts/sw.js').then(function(registration) {

            console.log('Registrated service worker: ', registration.scope);

        }, function(err) {

            console.log('Failed to register service worker: ', err);
        });
    });
}