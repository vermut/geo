
function SearchBoxViewController() {
    console.log('GeolocationViewController()');

    /* Initialize DOM objects */
    this.nominatimSearch = document.querySelector('#nominatimSearch');
    this.contactSearch = document.querySelector('#contactSearch');
    this.googleSearch = document.querySelector('#googleSearch');
    this.hybridSearch = document.querySelector('#hybridSearch');

    this.contactSearchInput = this.contactSearch.querySelector('#contactSearch input');
    this.contactSearchButton = this.contactSearch.querySelector('#contactSearch button#contactSearchBtn');
    this.contactDatalist = this.contactSearch.querySelector('#contacts');

    this.contactShowAllButton = this.contactSearch.querySelector('button#contactShowAllBtn');

    var self = this;

    /* Initialize event handlers */
    this.contactSearchInput.value = '';
    this.contactSearchButton.onclick = function() {
        self.searchContact(self.contactSearchInput.value);
        return false;
    };
    this.contactShowAllButton.onclick = function() {
        self.showAllContacts();
        return false;
    };

    window.mContactManager.getAllContacts(function(contact) {
        self.contactDatalist.innerHTML = self.contactDatalist.innerHTML + '<option>' + contact.name + '</option>';
    });
}

SearchBoxViewController.prototype = {
    /*
     * search
     * Submit the query to the search engine of the map displayed and show the search results on the map
     * @param {String} query
     */
    search: function(query, markerImage, showPOIs) {
        console.log('SearchBoxViewController.search(' + query + ')');

        /* Perform the search if a query is specified */
        if (query) {
            window.mMapViewController.search(query, markerImage, showPOIs);
        }
        else {
            alert("Please insert a address");
        }
    },
    /*
     * searchContact
     * Submit the query to the address book and show the search results on the map
     * @param {String} query
     */
    searchContact: function(query) {
        console.log('SearchBoxViewController.searchContact(' + query + ')');

        var self = this;

        /* Perform the search if a query is specified */
        if (query) {
            window.mContactManager.findContact({
                filterBy: ['name'],
                filterValue: query,
                filterOp: 'contains'
            }, function(contactsFound) {
                if (contactsFound.length > 0) {
                    var contact = contactsFound[0];

                    self.contactSearchInput.value = contact.name[0];

                    if (contact.note) {
                        self.search(contact.note[0], contact.photo[0], false);
                    }
                    else {
                        // TODO: ask to insert a address
                    }
                }
                else {
                    alert(query + ' not found in address book');
                }
            });
        }
        else {
            alert("Please insert a value");
        }
    },
    /*
     * showAllContacts
     * Show all contacts on the map
     */
    showAllContacts: function() {
        console.log('SearchBoxViewController.showAllContacts()');

        var self = this;

        window.mContactManager.getAllContacts(function(contact) {
            if (contact.note) {
                self.search(contact.note[0], contact.photo[0], false);
            }
        });
    },
    /*
     * showNominatimSearch
     * Show the nominatim search UI
     */
    showNominatimSearch: function() {
        console.log('SearchBoxViewController.showNominatimSearch()');
        this.googleSearch.style.display = 'none';
        this.hybridSearch.style.display = 'none';
        this.nominatimSearch.style.display = 'block';

        if (window.mContactManager.isContactsApiSupported()) {
            this.showContactSearch();
        }
    },
    /*
     * showGoogleSearch
     * Show the Google search UI
     */
    showContactSearch: function() {
        console.log('SearchBoxViewController.showContactSearch()');
        this.contactSearch.style.display = 'block';
    },
    /*
     * showGoogleSearch
     * Show the Google search UI
     */
    showGoogleSearch: function() {
        console.log('SearchBoxViewController.showGoogleSearch()');
        this.nominatimSearch.style.display = 'none';
        this.contactSearch.style.display = 'none';
        this.hybridSearch.style.display = 'none';
        this.googleSearch.style.display = 'block';
    },
    /*
     * showHybridSearch
     * Show the Google search UI
     */
    showHybridSearch: function() {
        console.log('SearchBoxViewController.showHybridSearch()');
        this.nominatimSearch.style.display = 'none';
        this.contactSearch.style.display = 'none';
        this.googleSearch.style.display = 'none';
        this.hybridSearch.style.display = 'block';
    }
};
