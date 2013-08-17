(function(){

	var root = {
				name:"root",
				isLeaf:false ,
				isRoot:true ,				
				nodes:[{
					name:'IOS',
					isLeaf:true,					
					nodes:[{
						name:'IOS',
						isLeaf:true,
						href:"http://www.baidu.com",
					}]
				},{
					name:'FLEX/AIR/ActionScript',
					isLeaf:true,
					nodes:[{
						name:"flash_builder_设置默认启动的浏览器",
						isLeaf:true,
						href:"./blog/2013-8/flash_builder_设置默认启动的浏览器.html"
					}]
				},{
					name:'Javascript/HTML/CSS',
					isLeaf:true,					
					nodes:[]
				}]
			};
	
	

	function getHTMLStringFromConfigObject(node){
		var html ;	
		if (node.isRoot) {			
			html = "<ul>" ;			
			var length = node.nodes.length ;
			for (var i = 0; i < length; i++) {
				 html += getHTMLStringFromConfigObject(node.nodes[i]);
			}
			html += "</ul>" ;
			return html ;
		}else{

			if (node.isLeaf) {
				// root级节点
				if(!node.href){
					var length = node.nodes.length ;
					if (length > 0) {
						html = "<li>"+node.name+"<ul style='display:none;'>"	
						for (var i = 0; i < length; i++) {
						 html += getHTMLStringFromConfigObject(node.nodes[i]);
						}
						html += "</ul></li>" ;	
					}else{
						html = "<li>"+node.name+"</li>"				
					}													
					return html ;
				}else{
						return "<li><a href="+node.href+">"+node.name+"</a></li>" ;	
				}
			}
		}					
	}	

	var docList = getHTMLStringFromConfigObject(root);
	$(function(){
		$(docList).appendTo($("#l-slider"));	
		$("#l-slider li").click(function(){
			$(this).children().toggle();
		});
		$("#l-slider li a").click(function(e){
			e.preventDefault()
			var articleLink = $(this).attr('href');

			$("#l-content-body article").load(articleLink);		
			
		});
	});
	

})()