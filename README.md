BlameBot
========
Http Service to show git blame for a specified line of code.

Usage:
------
To configure the service, edit the blamebot.js configuration settings:

```javascript

// Where is your git repo?
var git_checkout_dir = "/Path/To/Your/Git/checkout";

// What git command would you like me to use?
var git_command = "/usr/bin/git";

// What port shall I listen on for http service?
var http_listen_port = 1776;

// What interface shall I listen on for http service?
var http_listen_iface = '0.0.0.0';

// What URI should I respond to?
var uri_match_regexp = /^\/blamebot\/\d+\/.*/;

```

Start the service:

    node blamebot.js

Pass it a url like this:

    http://localhost:1776/blamebot/11/conf/ApplicationContext.xml

And it will give you back JSON with the git blame like this:

    {
    "stdout":"9f7c18aa (CyberRodent 2011-08-21 00:48:16 -0400 11) <beans_file>apps/Generic/etc/XSTACK_APPLICATION_ENV/beans.xml</beans_file>",
    "stderr":""
    }


