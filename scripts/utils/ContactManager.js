
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
    addContact: function(contactData, successCallBack, errorCallback) {
        console.log('ContactsManager.addContact(contactData, successCallBack, errorCallback)');
        console.log(contactData);
        
        if (this.isContactsApiSupported() === false) {
            return;
        }

        var saving = this.mozContactManager.save(new mozContact(contactData));

        saving.onsuccess = function() {
            console.log('new contact saved');
            successCallBack();
        };

        saving.onerror = function(error) {
            console.log(error);
            errorCallback();
        };
    },
    updateAddress: function(contact, address, successCallBack, errorCallback) {
        console.log('ContactsManager.updateAddress(contact, address, successCallBack, errorCallback)');
        console.log(contact);
        console.log(address);
        
        if (this.isContactsApiSupported() === false) {
            return;
        }
        
        contact.note = [address];

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
    findContact: function(filter, successCallback, errorCallback) {
        console.log('ContactsManager.findContact(filter)');
        console.log(filter);
        
        if (this.isContactsApiSupported() === false) {
            return;
        }

        var request = this.mozContactManager.find(filter);

        request.onsuccess = function() {
            console.log(this.result.length + ' contacts found.');
            successCallback(this.result);
        };

        request.onerror = function() {
            console.log('findContact error');
        };
    },
    getAllContacts: function(successCallback, errorCallback) {
        console.log('ContactsManager.getAllContacts()');
        
        if (this.isContactsApiSupported() === false) {
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
