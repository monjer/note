### iframe元素的用法总结

#### 移除边框
	
结合CSS的`border`属性和`iframe`标签的`frameBorder`属性完成对`<iframe>`元素移除边框的操作。如下：


	iframe{
		border:0; /*IE9+(包括IE9),以及其它浏览器*/
	}
	<iframe frameborder="0"></iframe><!-- IE6/7/8必须设置frameborder="0" -->

#### 禁用滚动

当`iframe`元素的文档内容的高宽度超过旗本身的高宽度时，`iframe`会出现滚动条，`scrolling`属性设置为`no`可以禁用滚动。

	<iframe scrolling="no"></iframe>

#### 去除默认内容边距

`marginheight `和`marginwidth`属性分别规定了其内容文档在垂直和水平方向上的边距。设置为`0`,可以去除默认的边距。

	<iframe marginheight="0" marginwidth="0"></iframe>

#### 在新窗口中打开连接

以下代码是`iframe`嵌入的页面文档，分别演示用`<a>`标签和使用javascript代码在嵌入的页面中在新窗口中打开链接。


	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8">
			<title>内嵌文档</title>			
		</head>
		<body>
			<a href="http://www.google.com" target="_blank">Open new page</a>
			<br>
			<button onclick="top.open('http://www.google.com')">Open new page</button>
		</body>
	</html>

#### 动态嵌入文档

通过为`iframe`元素的`src`属性赋值不同的URL，来实现动态的嵌入其它文档。

	<!-- html -->
	<iframe id="frameDoc" src="http://www.google.com"></iframe>
	<button onclick="jumpToBaidu()">Baidu</button>
	<!-- script -->
	<script type="text/javascript">
		function jumpToBaidu(){
			var frameDoc = document.getElementById("frameDoc");
			frameDoc.src = "http://www.baidu.com";
		}
	</script>

#### iframe加载事件处理

`iframe`元素支持`load`事件来检测嵌入的文档是否加载完毕,原生代码写法

	<!-- HTML -->
	<iframe id="frameDoc" src="framePage.html"></iframe>
	<!-- script-->
	<script>		
		//function addLoadEventToIframe
		var iframeDom = document.getElementById("embedIframe");
		if(window.addEventListener)(){
				iframeDom.addEventListener("load" , iframePageLoadedCallback);
		}else if(window.attachEvent){
				iframeDOM.attachEvent("onload" , iframePageLoadedCallback);
		}
		function iframePageLoadedCallback(){
			console.log("iframe page loaded");
		}
	</script>

使用jQuery写法，

	<!-- HTML -->
	<iframe id="frameDoc" src="framePage.html"></iframe>
	<!-- script-->
	<script type="text/javascript">
		$(function(){
			$("#frameDoc").bind("load",function(){
				console.log("iframe page loaded");
			});
		});
	</script>
	

#### 获取彼此的window和document对象

`iframe`嵌入文档的脚本与其父文档之间的脚本可以直接交互，但要满足**同源策略**,即`iframe`嵌入的页面URL与其父文档的URL要属于相同的域（协议，域名和端口号要完全相同）。在此基础上它们之间可以自由实现对象的互访。

在`iframe`的页面中获取父文档的`window`对象和`document`对象

	<!-- iframe page script -->
	<script>		
		var parentWindow = window.parent ;
		var parentDoc = window.parent.document ;
	<script>

在父文档中获取`ifrmae`嵌套页面的`window`对象和`document`对象

	<!-- embed iframe-->
	<iframe id="frameDoc" src="iframePage.html"></iframe>
	<!-- script of parent page containing iframe page-->
	<script>
		var iframeDom = document.getElementById("frameDoc");
		var iframeWindow = iframeDom.contentWindow ;
		var iframeDoc = iframeDom.contentDocument || iframeWindow.document ; // IE6/7/8不支持iframe.contentDocument属性
	</script>

#### js代码互调

同样在满足**同源策略**的前提下，`iframe`嵌入文档的脚本与其父文档的脚本可以实现全局方法的调用和全局属性的访问。示例：

`iframe`的父文档`iframe-parent-page.html`代码


	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8">
			<title>父文档</title>
		</head>
		<body>
			<p>Ifrmae Page</p>
			<iframe id="framePage" src="framePage.html" style="width:400px;"></iframe>
			<br/>
			<button onclick="callIframeMethod()">调用iframe中嵌入文档的全局方法</button>	
			<button onclick="callIframeMethod()">访问iframe中嵌入文档的全局属性</button>

			<script type="text/javascript">				
				// 当前文档的全局属性可以被iframe内嵌的文档访问
				var globalPro = "父文档的全局属性" ; 			
				// 当前文档的全局方法可以被iframe内嵌的文档调用
				function globalMethod(){
					alert("父文档的全局方法");
				}				
				// ------------------------------------------------------				
				// 调用iframe中嵌入页面的全部方法
				function callIframeMethod(){
					var framePage = document.getElementById("framePage");
					var iframeWin = framePage.contentWindow ;
					iframeWin.globalMethod();
				}				
				// 访问iframe中嵌入文档的全局属性
				function accessIframeProperty(){
					var framePage = document.getElementById("framePage");
					var iframeWin = framePage.contentWindow ;
					alert(iframeWin.globalPro) ;
				}
			</script>		
		</body>
	</html>

`iframe`的内嵌文档`frame-page.html`的代码

	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8">
			<title>iframe内嵌文档</title>
		</head>
		<body>		
			<button id="btn" onclick="callParentGlobalMethod()">调用父文档的全局方法</button>
			<button id="btn" onclick="accessParentGlobalPro()">访问父文档的全局属性</button>
			<script type="text/javascript">			
				// 当前文档的全局属性可以被iframe内嵌的文档访问
				var globalPro = "iframe内嵌文档的全局属性" ; 		
				// 当前文档的全局方法可以被iframe内嵌的文档调用
				function globalMethod(){
					alert("iframe内嵌文档的全局方法");
				}			
				// ----------------------------------------------------			
				// 调用父文档的全局方法
				function callParentGlobalMethod(){
					var parentWindow = window.parent ;
					parentWindow.globalMethod();
				}				
				// 访问父文档的全局属性
				function accessParentGlobalPro(){
					var parentWindow = window.parent ;
					alert(parentWindow.globalPro);
				}	
				
			</script>		
		</body>
	</html>


#### 自适应高度

有时在Web页面的布局中需要`iframe`元素的高度自适应其嵌入文档的高度，在满足**同源策略**的前提下，可以以下方式完成

原生代码写法：

	<!-- html-->
	<iframe src="http://www.google.com" onload="autoHeigt()"></iframe>	
	<!-- script -->
	<script type="text/javascript">
		function autoHeigt(){
			var doc = docFrame.contentDocument || docFrame.contentWindow.document ;
			this.style.height = doc.documentElement.scrollHeight+"px";
		}
	</script>

使用jQuery，代码如下

	<!-- html-->
	<iframe id="frameDoc" src="http://www.google.com"></iframe>	
	<!-- script -->
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
	<script type="text/javascript">	
		$("#frameDoc").bind("load" , function(){
			var doc = this.contentDocument || this.contentWindow.document ;			
			$(this).css("height" , $(doc).height());
		});
	</script>


#### 参考

+ [Remove border from IFrame](http://stackoverflow.com/questions/65034/remove-border-from-iframe)
+ [Invoking JavaScript code in an iframe from the parent page](http://stackoverflow.com/questions/251420/invoking-javascript-code-in-an-iframe-from-the-parent-page)
+ [Adjust width height of iframe to fit with content in it](http://stackoverflow.com/questions/819416/adjust-width-height-of-iframe-to-fit-with-content-in-it?lq=1)
+ [iframe element | iframe object](http://msdn.microsoft.com/en-us/library/ie/ms535258\(v=vs.85\).aspx)
+ [load | onload event](http://msdn.microsoft.com/en-us/library/ie/cc197055\(v=vs.85\).aspx)
+ [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
+ [HTML iframe 标签](http://www.w3school.com.cn/tags/tag_iframe.asp)
+ [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Same_origin_policy_for_JavaScript)
+ [About Cross-Frame Scripting and Security](http://msdn.microsoft.com/en-us/library/ms533028\(VS.85\).aspx)
+ [Iframes, onload, and document.domain](http://www.nczonline.net/blog/2009/09/15/iframes-onload-and-documentdomain/)
+ [Resizing an iframe based on content](http://stackoverflow.com/questions/153152/resizing-an-iframe-based-on-content)