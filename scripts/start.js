
/* Initialize the web app */
function init() {

    /* Initialize Javascript objects */
    window.mContactManager = new ContactManager();
    window.mGeolocationManager = new GeolocationManager();
    window.mGeolocationViewController = new GeolocationViewController();
    window.mSearchBoxViewController = new SearchBoxViewController();
    window.mMapSwitcherViewController = new MapSwitcherViewController();

    initContacts();
}

/*
 * Add default contacts
 */
function initContacts() {
    console.log('initContacts()');

    /* Add default contacts */

    JS.getBlobFromImagePath("img/end3r.jpeg", function(blob) {

        /* Add default contacts to the address book */
        window.mContactManager.addContact({
            name: ["Andrzej Mazur"],
            givenName: ["Andrzej"],
            familyName: ["Mazur"],
            nickname: ["end3r"],
            photo: [blob],
            adr: [{
                    locality: "Warsaw",
                    countryName: "Poland"
                }]
        },
        function() {
            console.log('Contact added successfully');
        }, function() {
            console.log('Error adding contact to the address book');
        });

    });
    
    JS.getBlobFromImagePath("img/chrisdavidmills.jpg", function(blob) {
        window.mContactManager.addContact({
            name: ["Chris Mills"],
            givenName: ["Chris"],
            familyName: ["Mills"],
            nickname: ["chrisdavidmills"],
            photo: [blob],
            adr: [{
                    locality: "Oldham",
                    countryName: "UK"
                }]
        },
        function() {
            console.log('Contact added successfully');
        }, function() {
            console.log('Error adding contact to the address book');
        });
    });
    
    JS.getBlobFromImagePath("img/franciov.jpeg", function(blob) {
        window.mContactManager.addContact({
            name: ["Francesco Iovine"],
            givenName: ["Francesco"],
            familyName: ["Iovine"],
            nickname: ["franciov"],
            photo: [blob],
            adr: [{
                    locality: "Rome",
                    countryName: "Italy"
                }]
        },
        function() {
            console.log('Contact added successfully');
        }, function() {
            console.log('Error adding contact to the address book');
        });
    });
}


/* Call init() when window is loaded */
window.onload = init;
