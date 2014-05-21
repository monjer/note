####使用apachectl操作Apache服务器

[apachectl](2)是Apache HTTP服务器的前端脚本程序，设计用于帮助管理员控制Apache [httpd](1) 守护进程的功能。以单独守护进程运行的[httpd](1) 是Apache真正的服务器程序。[apachectl](2)可以接受[httpd](1)的所有运行参数，就好像其代理一样，但使用[apachectl](2)会在成功设置一些与服务器相关的脚本之后，再调用启动[httpd](1)，完成Apache服务器的启动。

本篇使用Mac OS X自带的Apache服务器，演示使用[apachectl](2)的常见使用以及涉及到的命令参数，以下命令的执行，需要有root权限。

####启动Apache

	shell> sudo apachectl start
	shell> Password:******

####关闭Apache

	shell> sudo apachectl stop
	shell> Password:******
	
####重启Apache

	shell> sudo apachectl restart
	shell> Password:******	

####优雅的重启Apache

	shell> sudo apachectl graceful
	shell> Password:******	
与`restart`参数不同的是，使用`graceful`选项重启Apache服务器，不会中断现有的连接。


####检查Apache配置文件的语法

	shell> sudo apachectl configtest
	shell> Password:******	
	
> apachectl graceful 等价于 apachectl -t	
	
配置正常，命令行输入

	Syntax OK
	
其它一些参数更详细的说明参考Apache官网。
	
[1]: https://httpd.apache.org/docs/2.2/zh-cn/programs/httpd.html
[2]: https://httpd.apache.org/docs/2.2/zh-cn/programs/apachectl.html
