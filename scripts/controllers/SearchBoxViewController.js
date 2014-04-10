
function SearchBoxViewController() {
    console.log('SearchBoxViewController()');

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

    self.showContactSearch(); // TODO: css

    /* Init contact search if address book is not empty */
    window.mContactManager.getAllContacts(function(contact) {
        console.log("Retrieving contact from the address book");
        self.contactDatalist.innerHTML = self.contactDatalist.innerHTML + '<option>' + contact.name + '</option>';
    }, function() {
        console.log("Error in retrieving contacts from the address book");
        self.hideContactSearch();
    });
}

SearchBoxViewController.prototype = {
    /*
     * search
     * Submit the query to the search engine of the map displayed and show the search results on the map
     * @param {String} query
     */
    search: function(query) {
        console.log('SearchBoxViewController.search(' + query + ')');

        var contactName = this.contactSearchInput.value;

        if (contactName !== '' && query instanceof String) {
            window.mContactManager.findContact({
                filterBy: ['name'],
                filterValue: contactName,
                filterOp: 'equals'
            }, function(contactsFound) { // success callback
                if (contactsFound.length > 0) {
                    var contact = contactsFound[0];

                    if (contact.adr) {
                        console.log(contactName + ' has already an address');
                    }
                    else {
                        // update the contact
                        window.mContactManager.updateAddress(contact, query, function() {
                            alert("address updated");
                        }, function() {
                            alert("error in updating address");
                        });
                    }
                }
                else {
                    alert(contactName + ' not found in address book');
                }
            }, function() { // error callback

            });
        }

        /* Perform the search if a query is specified */
        if (query) {
            window.mMapViewController.search(query);
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
            }, function(contactsFound) { // success callback
                if (contactsFound.length > 0) {
                    var contact = contactsFound[0];

                    self.contactSearchInput.value = contact.name[0];

                    if (contact.adr) {
                        self.search(contact);
                    }
                    else {
                        alert(contact.name[0] + " has not provided a address. You can now insert a address by searching it.");
                    }
                }
                else {
                    alert(query + ' not found in address book');
                }
            }, function() { // error callback

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
            if (contact.adr) {
                self.search(contact);
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
    },
    /*
     * showContactSearch
     * Show the contact search UI
     */
    showContactSearch: function() {
        console.log('SearchBoxViewController.showContactSearch()');
        this.contactSearch.style.display = 'block';
    },
    /*
     * hideContactSearch
     * Hide the contact search UI
     */
    hideContactSearch: function() {
        console.log('SearchBoxViewController.showContactSearch()');
        this.contactSearch.style.display = 'none';
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
