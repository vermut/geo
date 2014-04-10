
function ContactManager() {
    console.log('ContactManager()');

    this.mozContactManager = window.navigator.mozContacts;
}

ContactManager.prototype = {
    isContactsApiSupported: function() {

        if (this.mozContactManager) {
            return true;
        }
        return false;
    },
    isContact: function(contact) {

        if (this.isContactsApiSupported()) {
            if (contact instanceof mozContact) {
                return true;
            }
        }

        return false;
    },
    addContact: function(contact, successCallBack, errorCallback) {
        console.log('ContactManager.addContact(contact, successCallBack, errorCallback)');
        console.log(contact);

        if (this.isContactsApiSupported() === false) {
            errorCallback();
            return;
        }

        var self = this;

        window.mContactManager.findContact({
            filterBy: ['name'],
            filterValue: contact.name,
            filterOp: 'equals'

        }, function(contactsFound) { // success callback

            if (contactsFound.length === 0) {
                /* Add contact */

                var saving = self.mozContactManager.save(new mozContact(contact));

                saving.onsuccess = function() {
                    console.log('new contact saved');
                    successCallBack();
                };

                saving.onerror = function(error) {
                    console.log(error);
                    errorCallback();
                };
            }
            else {
                console.log(contact.name + ' already exists');
            }

        }, function() { // error callback
            errorCallback();
            return;
        });
    },
    addAddressToContact: function(address, contact, successCallback, errorCallback) {
        console.log('ContactManager.addAddressToContact(address, contact, successCallBack, errorCallback)');
        console.log(address);
        console.log(contact);

        if (this.isContactsApiSupported() === false) {
            return;
        }

        contact.adr = [{
                streetAddress: address
            }];

        var saving = this.mozContactManager.save(contact);

        saving.onsuccess = function() {
            console.log('the address was inserted correctly');
            successCallback();
        };

        saving.onerror = function(error) {
            console.log("error in inserting address");
            console.log(error);
            errorCallback();
        };
    },
    contactAddressToString: function(contact) {
        console.log('ContactManager.contactAddressToString(contact)');
        console.log(contact);
        
        /* Build a query search string */
        var contactAddress = contact.adr[0];
        var addressString = '';

        console.log(contactAddress);

        addressString += contactAddress.streetAddress ? (contactAddress.streetAddress + ' ') : '';
        addressString += contactAddress.locality ? (contactAddress.locality + ' ') : '';
        addressString += contactAddress.region ? (contactAddress.region + ' ') : '';
        addressString += contactAddress.postalCode ? (contactAddress.postalCode + ' ') : '';
        addressString += contactAddress.countryName ? (contactAddress.countryName + ' ') : '';

        return addressString;
    },
    findContact: function(filter, successCallback, errorCallback) {
        console.log('ContactManager.findContact(filter)');
        console.log(filter);

        if (this.isContactsApiSupported() === false) {
            errorCallback();
            return;
        }

        var request = this.mozContactManager.find(filter);

        request.onsuccess = function() {
            console.log(this.result.length + ' contacts found.');
            successCallback(this.result);
        };

        request.onerror = function() {
            console.log('findContact error');
            errorCallback();
        };
    },
    getAllContacts: function(successCallback, errorCallback) {
        console.log('ContactManager.getAllContacts()');

        if (this.isContactsApiSupported() === false) {
            errorCallback();
            return;
        }

        var allContacts = this.mozContactManager.getAll({
            // no options
        });

        allContacts.onsuccess = function(event) {
            if (this.result) {
                successCallback(this.result);
                this.continue();
            }
        };

        allContacts.onerror = function() {
            console.log('getAllContacts error');
            errorCallback();
        };
    },
    removeContact: function(contact) {
        console.log('ContactManager.removeContact()');

        if (this.isContactsApiSupported() === false) {
            return;
        }

        var request = this.mozContactManager.clear(contact);

        request.onsuccess = function() {
            console.log('The contact have been removed.');
        };

        request.onerror = function() {
            console.log('No contacts were removed.');
        };
    },
    clearContacts: function() {
        console.log('ContactManager.clearContacts()');

        if (this.isContactsApiSupported() === false) {
            return;
        }

        var request = this.mozContactManager.clear();

        request.onsuccess = function() {
            console.log('All contacts have been removed.');
        };

        request.onerror = function() {
            console.log('No contacts were removed.');
        };
    }
};
