# poiv2
I have created a Beaches of ireland app, using node.js, HTML, Handlebars, Hapi(inert, vision, cookie, axios, joi, boom,)

Mongodb, Mongoose,chai@mocha. I started using vs code but ran into some trouble when i was changing my html pages to 
Handlebars so I started my project again in webstorm instead. I have found this easier to use for this project but i
had some issues with my mongodb install and use of mongoose which took quite some time to resolve, I understand that i
was setting up a new connection everytime i connected instead of calling the one same db everytime to save my data. I 
was able to add api and get data but my fetch data would only work on html page even tough I spent alot of time studying
fetching data in node. I have implemented login logout, map data aboout beaches and added weather data retrieval and 
also left in a donate option so users could donate to clean up beaches. Added cookies authentication,tests, routes and 
components.
I have committed everything to git with branches and all changes added. On the main page I have added a map with 
hardcoded beach coordinates with beach flag locaters. Added Url links to website on footer of main page.
when the user signs up or logs in, they are brought to the main page with api of an embedded map of irish beaches and when 
they click on the location icon they can view a sidebar with pictures of said beach, information about it, ratings and
a link to google maps and to local county websites. 
Below this I have added a google map with search bar for users to enter a beach location that's not in my first map or
just search for any location they require.
