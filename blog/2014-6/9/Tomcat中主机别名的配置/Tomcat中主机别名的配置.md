### Tomcat中主机别名的配置

Tomcat的`server.xml`中`Host`元素代表着服务器上关联了一个域名的虚拟主机，通过已经在DNS服务上注册的域名，我们可以访问在该虚拟主机下部署的所有Web Application，通常情况下一个`Host`元素只需要关联一个网络名称，如

	<Host name="www.molasync.com"  appBase="webapps" unpackWARs="true" autoDeploy="true">
	</Host>
`name`属性代表当前虚拟主机的域名。

但有时一个IP地址可能在DNS服务器上注册并关联多个域名，同时我们又希望将多个域名都能统一映射到Tomcat下的同一个虚拟主机上，`Host`元素中可以添加`Alias`元素，用来提供域名别名功能，以完成多域名映射到同一虚拟主机的效果。假如需要将`developer.molasync.com`与`www.molasync.com`映射到同一个虚拟主机下，可以如下配置:

	<Host name="www.molasync.com"  appBase="webapps" unpackWARs="true" autoDeploy="true">
		<Alias>developer.molasync.com</Alias>
	</Host>

当然，真实环境中这样配置的前提是需要`developer.molasync.com`和`www.molasync.com`在DNS服务器上注册Tomcat所在服务器所指向的同一IP地址，在普通PC下可以通过更改**hosts文件**来简单模拟这个效果，如在**hosts文件**中添加以下IP与域名的映射：

	# hosts文件中新的ip与域名映射
	127.0.0.1 developer.molasync.com
	127.0.0.1 www.molasync.com

这样重启tomcat，在浏览器中输入`http://developer.molasync.com:8080`或`http://www.molasync.com:8080`，二者都会访问到同一个虚拟主机了。