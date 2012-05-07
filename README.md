BlameBot
========
Http Service bot to show a line of git blame.

Usage:
------
Pass it a url like this:

    http://localhost:1776/gitblame/11/conf/ApplicationContext.xml

And it will give you back JSON with the git blame like this:

    {
    "stdout":"9f7c18aa (CyberRodent 2011-08-21 00:48:16 -0400 11) <beans_file>apps/Generic/etc/XSTACK_APPLICATION_ENV/beans.xml</beans_file>",
    "stderr":""
    }


