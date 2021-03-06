### 获取select列表的单选值

对于`<select>`元素来说一般我们都会在其`change`事件中获取当前选中的`<option>`的值，示例HTML代码片段如下


	 <select id="list">
	    <option value="1">Value 1</option>
	    <option value="2">Value 2</option>
	    <option value="3">Value 3</option>
	    <option value="3">Value 3</option>
	  </select>
	  <div id="desc"></div>

#### options属性和selectedIndex属性

`<select>`的DOM元素中`options`属性保存所有`<option>`DOM元素的集合，而`selectedIndex`属性的值指向的是`<option>`DOM集合中当前选中的`<option>`的索引，如果未选择任何一个`<option>`，那么`selectedIndex`的值为`-1`,结合以上两个属性可以获取当前选中`<option>`的值，原生写法如下:

	var list = document.getElementById("list");
	var desc = document.getElementById("desc");
	list.onchange = function(){
		var selOption , value ;
		if(list.selectedIndex>-1){
			selOption = list.options[list.selectedIndex] ;
			value = selOption.value ;
			desc.innerText="selected : " + value
		}	
	}
	
jQuery写法

	$("#list").change=function($e){
		var val = $("option:selected",this).val();
		$("#des").html("selected : "+val) ;
	}

> HTML5中`<select>`DOM元素新增了一个`selectedOptions`属性，该属性类型为`HTMLCollection`,用以获取当前选中的`option`集合，但目前并非所有浏览器都支持该属性。
> 

#### 参考

 + [HTMLSelectElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement)
 + [:selected Selector](http://api.jquery.com/selected-selector/)
 + [Is selectedOptions broken or…?](http://stackoverflow.com/questions/10711767/is-selectedoptions-broken-or)
 + [selectedOptions[0].textContent; not working in IE or Firefox](http://stackoverflow.com/questions/13753201/selectedoptions0-textcontent-not-working-in-ie-or-firefox)
 + [selectedOptions](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-button-element.html#dom-select-selectedoptions)
 + [Code](http://jsfiddle.net/DaJun/d8YDE/)