###使用ES5 Array新增的方法

在不涉及复杂算法或者数据结构的前提下，数组可能是平时编写javascript代码用的最多的数据结构,基本的简单的算法实现都依赖于数组。鉴于此，为native的javascript数组提供便捷的快捷方法可以很好重用代码，并且提高开发效率，避免了反复编写util辅助类带来的冗余。
###Array extras
ECMAScript 5.1版本在2011年6月被ECMA组织批准通过,并定义了一系列的新的javascript特性，这其中就包括几个**Array extras**方法

新增的方法说明


+ [Array.isArray(arg)][1.1]

	判断传入的参数`arg`是否是数组类型，`arg`为数组类型调用返回`true`，反之返回`false`。
	
	早先的实现方式如下：
	
		Array.isArray = function(arg){
	    	return Object.prototype.toString.call(arg) === '[object Array]';
		}

	>同功能实现
	>		
	>	+ [`jQuery.isArray()`](http://api.jquery.com/jQuery.isArray/)方法，
	>	+ [`_.isArray()`](http://underscorejs.org/#isArray)方法。
	
+ [Array.prototype.indexOf(searchElement [,fromIndex])][1.2]

	在当前数组中从前往后查找`searchElement`在数组中的位置，如果找到返回其在数组中的索引，否则返回`-1`。
	
	第二个可选参数`fromIndex`默认值为`0`,指定搜索的起始位置，如果`fromIndex`大于等于数组长度，停止搜索，返回`-1`;如果`fromIndex`是负数，那么会作为后置偏移来搜索，即`fromIndex = array.length + fromIndex`，如果负数`fromIndex`的绝对值大于数组长度`length`,那么停止搜索，返回`-1`。简单实现如下

		var arrPro = Array.prototype;
		
		
		arrPro.indexOf = function(searchElement , opt_fromIndex){
	        var length = this.length ;
    	    if(length == 0) return -1 ;
        	var n = opt_fromIndex ;
	        n = (n == undefined || typeof n !== 'number' )? 0 : n;
    	    if(n >= length) return -1 ;
        	if(n < 0){
            	n = n + length;
	            if(n < 0) return -1 ;
    	    }
        	while(n < length){
            	if(this[n] === searchElement) return n ;
	            n++;
    	    }
        	return -1 ;
	    }
	    
	>同功能实现
	>		
	>	+ [`jQuery.inArray()`](http://api.jquery.com/jQuery.inArray/)方法，
	>	+ [`_.indexOf()`](http://underscorejs.org/#indexOf)方法。
	
		    
+ [Array.prototype.lastIndexOf( searchElement [,fromIndex ])][1.3]	

	同样是搜索`searchElement`在数组中的索引，但与`indexOf()`相反的是，该方法执行的是反向搜索，从后往前依次搜索查找`searchElement`首次出现的位置，找到的话返回其索引，否则返回`-1`。第二个可选参数`opt_fromIndex`默认值为`array.length - 1` , 如果`opt_fromIndex`大于等于`array.length`会搜索全部数组；如果是负数，会取去绝对值作为后置偏移，即`opt_fromIndex = array.length - Math.abs(opt_fromIndex)`,如果计算后的`opt_fromIndex < 0`则返回`-1`,简单实现如下
	
		arrPro.lastIndexOf  = function(searchElement , opt_fromIndex ){
	        var length = this.length ;
    	    if(length == 0) return -1 ;
        	var n = opt_fromIndex ;
	        n = (n == undefined || typeof n !== 'number' ) ? length - 1 : n ;
    	    if(n >= 0 ){
        	    n = Math.min(n , length -1);
	        }else{
    	        n = length - Math.abs(n);
        	}
	        while(n >= 0){
    	        if(this[n] == searchElement) return n ;
        	    n--;
	        }
    	    return -1 ;
	    }
	    
	>同功能实现
	>		
	>	+ [`_.lastIndexOf_()`](http://underscorejs.org/#lastIndexOf_)方法。
	
		    
+ [Array.prototype.forEach(callbackfn [ , thisArg ])][1.6]

	在每个数组元素上执行`callbackfn`函数，`callbackfn`接受三个参数`callbackfn(item , index , array)`,依次是当前数组元素，元素索引，以及当前数组对象，第二个可选参数`thisArg`指定了每次`callbackfn`调用时`this`所指向的对象，如果未传入`thisArg`，那么`callbackfn`中的`this`,在严格模式下为`null`或`undefined`,否则为全局对象，通常是`window`。简单实现如下
	
		arrPro.forEach = function(callbackfn , opt_thisArg){
     	   var length = this.length ;
        	for(var n = 0; n < length ; n++){
            	callbackfn.apply(opt_thisArg , [this[n] , n , this]);
	        }
    	}
    	
	>同功能实现
	>
	>	+ [jQuery.each()](http://api.jquery.com/jQuery.each/)
	>	+ [`_.each()`](http://underscorejs.org/#each)方法。
	    	

+ [Array.prototype.filter(callbackfn [ , thisArg ])][1.10]

	执行过滤操作，在每个数组元素上执行`callbackfn`函数，`callbackfn`需要返回一个布尔值，并将返回值为`true`的元素组合成的新数组返回，`callbackfn`函数参数以及`thisArg`参数的说明见`forEach`。简单实现如下
	
		arrPro.filter = function(callback , opt_thisArg){
        	var res = [];
	        var length = this.length ;
    	    for(var n = 0; n < length ; n++){
        	    if(callback.apply(opt_thisArg  , [this[n] , n , this])){
            	    res.push(this[n]);
	            }
    	    }
        	return res ;
	    }

	>同功能实现
	>
	>	+ [jQuery.grep()](http://api.jquery.com/jQuery.grep/)
	>	+ [`_.filter()`](http://underscorejs.org/#filter)方法。
	
		    
+ [Array.prototype.map(callbackfn [ , thisArg ])][1.7]
	
	处理数组中的每个元素，在每个数组元素上执行`callbackfn`函数，并将每个`callbackfn`的返回值组成新数组返回。`callbackfn`函数参数以及`thisArg`参数的说明见`forEach`。简单实现如下
	
    	arrPro.map = function(callback , opt_thisArg){
        	var res = [];
	        var length = this.length ;
    	    for(var n = 0 ; n < length ; n++){
        	    res.push(callback.apply(opt_thisArg  , [this[n] , n , this]));
	        }
    	    return res ;
	    }
	>同功能实现
	>
	>	+ [jQuery.map()](http://api.jquery.com/jQuery.map/)
	>	+ [`_.map()`](http://underscorejs.org/#map)方法。



+ [Array.prototype.every(callbackfn [ , thisArg ])][1.4]

	处理数组中的每个元素，在每个数组元素上执行`callbackfn`函数,直到`callbackfn`调用返回`false`为止，如果找到返回值为`false`的元素，则返回`false`，如果所有调用都返回`true`，则返回`true`。`callbackfn`函数参数以及`thisArg`参数的说明见`forEach`。简单实现如下：

	    arrPro.every = function(callback , opt_thisArg){
	        var length = this.length ;
    	    for(var n = 0 ; n < length ; n++){
        	    if(!callback.apply(opt_thisArg  , [this[n] , n , this])){
            	    return false ;
	            }
    	    }
        	return true ;
	    }
	    
	>同功能实现
	>
	>	+ [`_.every()`](http://underscorejs.org/#every)方法。

+ [Array.prototype.some(callbackfn [ , thisArg ])][1.5]

	处理数组中的每个元素，在每个数组元素上执行`callbackfn`函数,直到`callbackfn`调用返回`true`为止，如果找到返回值为`true`的元素，则返回`true`，如果所有调用都返回`false`，则返回`false`。`callbackfn`函数参数以及`thisArg`参数的说明见`forEach`。简单实现如下：

	    arrPro.some = function(callback , opt_thisArg){
     	   var length = this.length ;
        	for(var n = 0 ; n < length ; n++){
            	if(callback.apply(opt_thisArg  , [this[n] , n , this])){
                	return true ;
	            }
    	    }
        	return false ;
	    }
	>同功能实现
	>
	>	+ [`_.some()`](http://underscorejs.org/#some)方法。	    
	    
+ [Array.prototype.reduce(callbackfn [ , initialValue ] )][1.8]

	该方法接受一个累加器函数`callbackfn`，数组中的每个元素从左到右依次递减，最终缩减为一个值并返回。累加器函数`callbackfn`接受四个参数`previousValue`(上一次`callbackfn`调用的返回值),`currentValue`(当前数组元素),`index`(当前数组元素索引),`array`(当前数组)。如果传入了`initialValue`，那么首次调用`callbackfn`时的`previousValue`值等于`initialValue`,`currentValue`为第一个数组元素，否则为`previousValue`为第一个数组元素，`currentValue`为第二个数组元素。简单实现如下
	
	    arrPro.reduce = function(callback , opt_initialValue){
    	    var length = this.length ;
        	var value = opt_initialValue ;
	        for(var n = 0 ; n < length ; n++){
    	        if(n == 0 && opt_initialValue === undefined){
        	        value = this[0] ;
            	}else{
                	value = callback.apply( null ,[ value , this[n] , n , this]);
	            }
    	    }
        	return value ;
	    }
	
	>同功能实现
	>
	>	+ [`_.reduce()`](http://underscorejs.org/#reduce)方法。	    

+ [Array.prototype.reduceRight(callbackfn [ , initialValue ] )][1.9]

	类似于`reduce()`方法，接受一个累加器函数`callbackfn`，但执行的是反向操作，数组中的元素从右到左依次递减，最终缩减为一个值并返回。累加器函数`callbackfn`接受四个参数`previousValue`(上一次`callbackfn`调用的返回值),`currentValue`(当前数组元素),`index`(当前数组元素索引),`array`(当前数组)。如果传入了`initialValue`，那么首次调用`callbackfn`时的`previousValue`值等于`initialValue`,`currentValue`为第一个数组元素，否则为`previousValue`为倒数第一个数组元素，`currentValue`为倒数第二个数组元素。简单实现如下
	
		arrPro.reduceRight = function(callback , opt_initialValue){
    	    var length = this.length ;
        	var value = opt_initialValue ;
	        for(var n = length-1 ; n > -1 ; n--){
    	        if(n == length-1 && opt_initialValue === undefined){
        	        value = this[length-1] ;
            	}else{
                	value = callback.apply( null , [value , this[n] , n , this]);
	            }
    	    }
        	return value ;
	    }
	>同功能实现
	>
	>	+ [`_.reduceRight()`](http://underscorejs.org/#reduceRight)方法。
	
	
以上几个方法，为处理数组提供了很大的便利，在ES5之前以上方法所提供的功能，都依赖于第三方库jQuery或者underscorejs实现。但随着个主流浏览器版本的升级以及对标准的更加亲密的靠近，现在基本在桌面或移动端[所有主流浏览器][5](IE9+ , Chrome , Firefox , Safari ， Opera)中都实现了这些方法，现在我们可以不再依赖第三方库而直接使用。

当然对于兼容旧的浏览器也可以继续使用诸如jQuery，underscorejs，或者[es5-shim][4]来实现类似功能处理。

[1.1]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.3.2
[1.2]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.14
[1.3]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.15
[1.4]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.16
[1.5]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.17
[1.6]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.18
[1.7]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.19
[1.8]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.21
[1.9]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.22
[1.10]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.20

###参考

+ [ES5 Array Object][2]
+ [underscorejs][1]
+ [speakingjs][3]
+ [es5-shim][4]
+ [es5 compat-table][5]
+ [What They Didn't Tell You About ES5's Array Extras][6]
+ [5 Array Methods That You Should Be Using Now][7]
+ [MDN Array][8]
+ [ECMAScript5.1中文版][9]


[1]: http://underscorejs.org/
[2]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4
[3]: http://speakingjs.com/es5/ch18.html
[4]: https://github.com/es-shims/es5-shim
[5]: http://kangax.github.io/compat-table/es5/
[6]: http://code.tutsplus.com/tutorials/what-they-didnt-tell-you-about-es5s-array-extras--net-28263
[7]: http://colintoh.com/blog/5-array-methods-that-you-should-use-today
[8]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
[9]: http://yanhaijing.com/es5/#642