# Geo

Geo is a geolocation web application. It let users:
- choose among OpenStreetMap, Google Maps, and a hybrid map that is a Google Map with OpenStreetMap tiles placed on it (this feature does not work on Firefox OS at the moment: see [issue #7](https://github.com/franciov/geo/issues/7) for details)
- access the address book to show all contacts on the map, look for a contact and insert a address if not provided

You can try it [live](http://franciov.github.io/geo/) or in the [Firefox OS Simulator](https://developer.mozilla.org/en/docs/Tools/Firefox_OS_Simulator).

![Screenshot](https://raw.githubusercontent.com/franciov/geo/master/img/screenshots/osm-search-rome.png)
![Screenshot](https://raw.githubusercontent.com/franciov/geo/mdn_updating_phone_contacts_from_the_web/img/screenshots/contacts-all.png)

## Notes

This demo is part of the following MDN articles:
- [Plotting yourself on the map (MDN App Center)](https://developer.mozilla.org/en-US/Apps/Developing/gather_and_modify_data/Plotting_yourself_on_the_map) that explains how to use interactive maps in Open Web Apps.
- [Updating phone contacts from the web (MDN App Center)](https://developer.mozilla.org/en-US/Apps/Developing/gather_and_modify_data/Updating_phone_contacts_from_the_web) that explains how to use the [Contacts API](https://developer.mozilla.org/en-US/docs/WebAPI/Contacts) in Open Web Apps.

Note that OpenStreetMap data is free for everyone to use, but OpenStreetMap tile servers are not: heavy use of OpenStreetMap tiles is forbidden without prior permission from OpenStreetMap's System Administrators: please read the [Tile Usage Policy](http://wiki.openstreetmap.org/wiki/Tile_usage_policy) and [this article on blog.openstreetmap.org](https://blog.openstreetmap.org/2011/11/01/tile-usage-policy/) if you want to distribute an app that gets use of tiles from openstreetmap.org

Marcos Lin developed a [AngularJS-based version of this app](https://github.com/marcoslin/sample-geo-angular), and we explored the trade-offs between core Javascript and AngularJS development in [this presentation](http://lanyrd.com/2014/romajs-incontro-marzo/scygrd/#link-ydcz).

## Contributing

- open github issues
- fix github issues
- add tests
- better look&feel
- navigator (watchPosition)
- route
- FxOS installer
