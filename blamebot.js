/*
 * Http Service to show git blame on a specified line of code.
 *
 * Pass it a url like this:
* http://localhost:1776/blamebot/11/conf/ApplicationContext.xml
*
* And it will give you JSON back with the git blame. Like this:
* {"stdout":"9f7c18aa (CyberRodent 2011-08-21 00:48:16 -0400 11) <beans_file>apps/Generic/etc/XSTACK_APPLICATION_ENV/beans.xml</beans_file>", "stderr":""}
*/
              
//
// blameBot configuration
//

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
//  In this case, the URI "interface" works like this:
//  Starting slash.
//  The literal string "blamebot/".
//  The line number to blame (one or more digits)
//    followed by a slash.
//  The rest is the relative path from the repository root to file
//  you want to see blame on.
//  Untested on Windows, but you would send in the path as it would
//  work on your host OS.

//
// This is the end of the blameBot configuration section.
//


var http = require("http"),
  url = require("url"),
  util = require("util"),
  child_process = require("child_process"),
  exec = child_process.exec;

http.createServer(function (req, res) {
  var pathname,
    parts,
    linenumber,
    filename,
    cmd,
    child;

  pathname = url.parse(req.url).pathname;

  if (pathname.match(uri_match_regexp)) {

    parts = pathname.match(/^\/gitblame\/(\d+)\/(.*)/);
    linenumber = parts[1];
    filename = parts[2];

    cmd = git_command + " blame -L " + linenumber + "," +
      linenumber + " " + filename;

    child = exec(cmd, {"cwd" : git_checkout_dir} ,
      function (error, stdout, stderr) {
        stdout = stdout.replace(/\n/, "");

        var result = '{"stdout":"' + stdout + '",' +
          '"stderr":"' + stderr + '"}';

        res.writeHead(200, {'Content-Type': "text/plain"});
        res.end(result + '\n');
      });
  } else {
    res.writeHead(404, {'Content-Type': "text/plain"});
    res.end('\n');
  }
}).listen(http_listen_port, http_listen_iface);

// vim: set tabstop=2 softtabstop=2 shiftwidth=2 expandtab
