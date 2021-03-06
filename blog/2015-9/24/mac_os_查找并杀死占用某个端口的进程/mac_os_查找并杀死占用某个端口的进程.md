###Mac os 查找并杀死占用某个端口的进程

###依赖于两个命令

+ `lsof` , 列出当前系统中所有运行进程所打开的文件信息，并写入到标准输出中
+ `kill` , 根据指定进程的PID杀死进程

###示例

以开发中mongodb默认的`27107`端口占用为例

1. 查找占用`27107`端口进程的PID

		$ lsof -i:27107
		
		##在命令行客户端输出，进程的pid为11637
		COMMAND   PID      USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
		mongod  11637 manjunhan    5u  IPv4 0x8ed01787a1cc4099      0t0  TCP *:27107 (LISTEN)
	
2. 根据找到PID杀掉进程 

		$ kill -9 11637


> 如果要结束占用`80`及以下端口的进程，需要使用root权限，在每个命令行前使用`sudo`，之后输入root用户的密码即可，如:
> `$ sudo lsof -i:80`

###参考

+ [Introduction to lsof](http://www.akadia.com/services/lsof_intro.html)
+ [OS X Man Pages : KILL](https://developer.apple.com/library/prerelease/mac/documentation/Darwin/Reference/ManPages/man1/kill.1.html)
+ [Linux Tools Quick Tutorial](http://linuxtools-rst.readthedocs.org/zh_CN/latest/tool/lsof.html)
+ [Find (and kill) process locking port 3000 on Mac [closed]](http://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac)