
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
 * David Bruant, Priyanka Nag, Kaustav Das Modak, Saurabh Nair, Francesco Iovine, Andrzej Mazur, Shafiul Azam Chowdhury, Isac Lagerblad, Fábio Magnoni, Majken Connor, Julien Gattelier, Frédéric Bourgeon, Thierry Régagnon, Jesús Pérez, Jerome Loi, Jeremie Patonnier, Havi Hoffman, Luke Crouch, Maris Fogels, John Karahalis, David Walsh, Eric Shepherd, Janet Swisher, Robert Nyman, Christian Heilmann, Florian Scholtz, Jannis Leidel, Jean-Yves Perrier, Chris Mills, Holly Habstritt, Josh Mize, Ricky Rosario, Rob Hudson, & Tony Santos
 */

function initContacts() {
    console.log('initContacts()');

    var contacts = {
        "mdnWordWeekendParis": [
            {
                "name": "Chris",
                "surname": "Mills",
                "nickname": "chrisdavidmills",
                "photo": "img/chrisdavidmills.jpg",
                "location": "Oldham, UK"
            },
            {
                "name": "Andrzej",
                "surname": "Mazur",
                "nickname": "end3r",
                "photo": "img/end3r.jpeg",
                "location": "Warsaw, Poland"
            },
            {
                "name": "Francesco",
                "surname": "Iovine",
                "nickname": "franciov",
                "photo": "img/franciov.jpeg",
                "location": "Rome, Italy"
            }
        ]
    };

    for (var i = 0; i < contacts.mdnWordWeekendParis.length; i++) {
        var contact = contacts.mdnWordWeekendParis[i];
        console.log(contact);
        addContact(contact);
    }
}


function addContact(contact) {
    console.log('addContact(contact)');
    console.log(contact);

    window.mContactManager.findContact({
        filterBy: ['name'],
        filterValue: contact.name + ' ' + contact.surname,
        filterOp: 'equals'
    }, function(contactsFound) {
        
        /* Get contact photo */
        var xhr = new XMLHttpRequest();

        xhr.open("GET", contact.photo, true);
        xhr.responseType = "arraybuffer";

        xhr.onload = function(e) {
            var arrayBufferView = new Uint8Array(this.response);
            var contactPhoto = new Blob([arrayBufferView], {type: "image/jpeg"});

            if (contactsFound.length === 0) {
                /* Add contact */
                window.mContactManager.addContact({
                    name: [contact.name + ' ' + contact.surname],
                    givenName: [contact.name],
                    familyName: [contact.surname],
                    nickname: [contact.nickname],
                    photo: [contactPhoto],
                    note: [contact.location]
                });
            }
            else {
                console.log(contact.name + ' ' + contact.surname + ' already exists');
            }
        };

        xhr.send();
    });
}


/* Call init() when window is loaded */
window.onload = init;
