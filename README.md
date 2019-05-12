# Final Project Introduction
# Yufei Yuan

## Purpose

Amenities always have big influence on living qualities. The amenities here means proximity to public transit, education of children, healthcare, police supervision, etc.. On the other hand, people's acceptable distance usually varies by type of amenities.

This project aims to develop a tool that helps users easily identify amenities around their chosen locations of residency with their own selection of distance for each type of amenisties.



## The data

Data source: OpenDataPhilly (.geoJSON)
  a) Park/green space: Parks & Recreation Assets
  b) School: Schools
  c) Train/Subway: DVRPC Passenger Rail Stations
  d) Healthcare: Health Centers
  e) Police Station: Police_Stations



## Technologies used

Major technologies used in this project include:

Leaflet: Mapping, reading geojsons
Leaflet draw: User-side point input
Turf: calculate geospatial relationship between the input point and amenities
jQuery: Interact with users' input



## Design spec

#### User experience

After selecting range of distance for each type of amenties in the navigator, those amenities within the selected distance from user-input marker will be identified and counted.
When users click on certain amenity on the map, detailed info of this amenity will show on sidebar.
A list of randomly picked amenties will also be given.



#### Layouts and visual design
A basemap with amenity icons.
A top navigation for users' input of distances.
A sidebar bar listing detailed info of selected amenities and some randomly picked amenities.
An alert bar returning the searching results.
A reset button.
