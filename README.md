API-PERF
=======
A module to test the performance of an API or any URL

Installation
=======

    $ npm install aperf

Examples
=======

Using the CLI
-------
    $ aperf --url=http://www.google.com

Using a config.js
-------
**command**

    $ aperf --config=./path/to/file.js

**file.js**

    module.exports = {
	    url:'http://www.google.com'
    }

Options
======

--c
-------
With **--c** you can modify the concurrency of the call, by default the value is 100

    $aperf --url=http://www.google.com --c=100

--i
-------
With **--i** you can modify the amount of  iterations, by default the value is 100

    $aperf --url=http://www.google.com --i=100

--method
-------
With **--method** you can modify the concurrency of the call, by default the value is GET

    $aperf --url=http://www.google.com --method=GET

--proxy
-------
If you are behind a corporate proxy, you can use the command **--proxy** to add it

    $aperf --url=http://www.google.com --proxy=http://user:password@proxy:port

Notes
=======

You can create a config file just adding the commands as arguments of the object, ex:

    module.exports = {
	    url:'http://www.google.com',
	    method:'GET',
	    c:100,
	    i:100,
	    proxy:'http://user:pass@proxy:port'
    }
