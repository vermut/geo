
function ContactManager() {
    console.log('ContactsManager()');

    this.mozContactManager = window.navigator.mozContacts;

    this.contacts = [];
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
        console.log('ContactsManager.addContact(contact, successCallBack, errorCallback)');
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
    updateAddress: function(contact, address, successCallBack, errorCallback) {
        console.log('ContactsManager.updateAddress(contact, address, successCallBack, errorCallback)');
        console.log(contact);
        console.log(address);

        if (this.isContactsApiSupported() === false) {
            return;
        }

        contact.adr = [address];

        var saving = this.mozContactManager.save(contact);

        saving.onsuccess = function() {
            console.log(contact.name[0] + ' updated');
            successCallBack();
        };

        saving.onerror = function(error) {
            console.log(error);
            errorCallback();
        };
    },
    contactAddressToString: function(contact) {
        /* Build a query search string */
        var contactAddress = contact.adr[0];
        var addressString = '';
        
        console.log(contactAddress);
        console.log(contactAddress.toString());
        
        addressString += contactAddress.streetAddress ? (contactAddress.streetAddress + ' ') : '';
        addressString += contactAddress.locality ? (contactAddress.locality + ' ') : '';
        addressString += contactAddress.region ? (contactAddress.region + ' ') : '';
        addressString += contactAddress.postalCode ? (contactAddress.postalCode + ' ') : '';
        addressString += contactAddress.countryName ? (contactAddress.countryName + ' ') : '';
        
        return addressString;
    },
    findContact: function(filter, successCallback, errorCallback) {
        console.log('ContactsManager.findContact(filter)');
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
        console.log('ContactsManager.getAllContacts()');

        if (this.isContactsApiSupported() === false) {
            errorCallback();
            return;
        }

        console.log('ContactsManager.getAll()');

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
        console.log('ContactsManager.removeContact()');

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
        console.log('ContactsManager.clearContacts()');

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
