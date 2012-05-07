/*
 * Http Service bot to show a line of git blame
 * pass it a url like this:
 *
 * http://localhost:1776/gitblame/11/conf/ApplicationContext.xml
 *
 * and it will give you json back with the git blame like this:
 *
 * {
 * "stdout":"9f7c18aa (CyberRodent 2011-08-21 00:48:16 -0400 11)
 * <beans_file>apps/Generic/etc/XSTACK_APPLICATION_ENV/beans.xml</beans_file>",
 * "stderr":""
 * }
 */

var http = require("http"),
    url = require("url"),
    util = require("util"),
    child_process = require("child_process"),
    exec = child_process.exec;

var git_checkout_dir = "/Users/jeff/Projects/xstack";
var git_command = "git";

http.createServer(function (req, res) {

    var pathname = url.parse(req.url).pathname;
    if (pathname.match(/^\/gitblame\/\d+\/.*/)) {
        res.writeHead(200, {'Content-Type': "text/plain"});
        var parts = pathname.match(/^\/gitblame\/(\d+)\/(.*)/);
        var linenumber = parts[1];
        var filename = parts[2];
        var cmd = git_command + " blame -L " + linenumber + "," +
            linenumber + " " + filename;
        var child = exec(cmd, {"cwd" : git_checkout_dir} ,
            function (error, stdout, stderr) { 
                stdout = stdout.replace(/\n/, "");
                var result = '{"stdout":"'+ stdout + '","stderr":"' + stderr + '"}';
                res.end(result + '\n');
            });
    } else { 
        res.writeHead(404, {'Content-Type': "text/plain"});
        res.end('\n');
    }
}).listen(1776, '0.0.0.0');

