# Geo

Geo is a geolocation web application. It let users:
- choose among OpenStreetMap, Google Maps, and a hybrid map that is a Google Map with OpenStreetMap tiles placed on it (this feature is temporarily disabled on the master branch, you can try it out in the [mdn_plotting_yourself_on_the_map branch](https://github.com/franciov/geo/tree/mdn_plotting_yourself_on_the_map): see [issue #7](https://github.com/franciov/geo/issues/7) for details)
- access the address book to show all contacts on the map, look for a contact and insert a address if not provided

You can try it [live](http://goo.gl/FVhr5L) or in the [Firefox OS Simulator](https://developer.mozilla.org/en/docs/Tools/Firefox_OS_Simulator).

![Screenshot](https://raw.githubusercontent.com/franciov/geo/master/img/screenshots/osm-search-rome.png)
![Screenshot](https://raw.githubusercontent.com/franciov/geo/mdn_updating_phone_contacts_from_the_web/img/screenshots/contacts-all.png)

## Notes

This demo is part of the following MDN articles:
- [Plotting yourself on the map - MDN App Center](https://developer.mozilla.org/en-US/Apps/Developing/gather_and_modify_data/Plotting_yourself_on_the_map) that explains how to use interactive maps in Open Web Apps.
- [Updating phone contacts from the web - MDN App Center](https://developer.mozilla.org/en-US/Apps/Developing/gather_and_modify_data/Updating_phone_contacts_from_the_web) that explains how to use the [Contacts API](https://developer.mozilla.org/en-US/docs/WebAPI/Contacts) in Open Web Apps.

## Contributing

- open github issues
- fix github issues
- add tests
- better look&feel
- navigator (watchPosition)
- route
- FxOS installer
