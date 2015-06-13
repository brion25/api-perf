module.exports = {
  help:{
    'Description:':"List of all the available commands and their descriptions",
    '--url:':' Url to perform the test *required',
    '--proxy:':' If you are behind a corporative proxy you should use it',
    '--c:':' Number of concurrencies',
    '--i:':' Number of iterations',
    '--rname:':' New name for your report',
    'Ex.':'aperf --url=http://www.example.com --c=100 --i=200 --rname="New name" \n      aperf --proxy=proxy:port --url=http://www.example.com --c=100 --i=200 --rname="New name"\n\n'
  }
};
