使用ES5 Array新增的方法

+ Array.isArray()
+ Array.prototype.every()
+ Array.prototype.filter()
+ Array.prototype.forEach()
+ Array.prototype.indexOf()
+ Array.prototype.lastIndexOf()
+ Array.prototype.map()
+ Array.prototype.reduce()
+ Array.prototype.some()

###

	var arrPro = Array.prototype;
	
    Array.isArray = function(arr){
        return Object.prototype.toString.call(arr) === '[object Array]';
    }

    arrPro.forEach = function(callback , opt_thisArg){
        var length = this.length ;
        for(var i = 0; i < length ; i++){
            callback.apply(opt_thisArg , [this[i] , i , this]);
        }
    }
    
    arrPro.filter = function(callback , opt_thisArg){
        var res = [];
        var length = this.length ;
        for(var i = 0; i < length ; i++){
            if(callback.apply(opt_thisArg  , [this[i] , i , this])){
                res.push(this[i])
            }
        }
        return res ;
    }
    
    arrPro.indexOf = function(element , opt_fromIndex){
        opt_fromIndex = (opt_fromIndex == undefined || typeof opt_fromIndex !== 'number' )? 0 : opt_fromIndex;
        var length = this.length ;
        if(opt_fromIndex < 0){
            opt_fromIndex = opt_fromIndex %length + length;
        }
        for(var i = opt_fromIndex ; i < length ; i++){
            if(this[i] === element) {
                return i
            }
        }
        return -1 ;
    }

    arrPro.lastIndexOf  = function(element , opt_fromIndex ){
        var length = this.length ;
        opt_fromIndex = (opt_fromIndex == undefined || typeof opt_fromIndex !== 'number' ) ? length - 1 : opt_fromIndex ;
        if(opt_fromIndex < 0 ){
            if(Math.abs(opt_fromIndex) > length) return -1 ;
            opt_fromIndex = opt_fromIndex + length ;
        }
        if(opt_fromIndex >= length){
            opt_fromIndex = length -1 ;
        }

        for(var i = opt_fromIndex ; i > -1 ; i--){
            if(this[i] == element){
                return i ;
            }
        }
        return -1 ;
    }
    
    arrPro.map = function(callback , opt_thisArg){
        var res = [];
        var length = this.length ;
        for(var i = 0 ; i < length ; i++){
            res.push(callback.apply(opt_thisArg  , [this[i] , i , this]));
        }
        return res ;
    }

    arrPro.some = function(callback , opt_thisArg){
        var length = this.length ;
        for(var i = 0 ; i < length ; i++){
            if(callback.apply(opt_thisArg  , [this[i] , i , this])){
                return true ;
            }
        }
        return false ;
    }

    arrPro.every = function(callback , opt_thisArg){
        var length = this.length ;
        for(var i = 0 ; i < length ; i++){
            if(!callback.apply(opt_thisArg  , [this[i] , i , this])){
                return false ;
            }
        }
        return true ;
    }

    arrPro.reduce = function(callback , opt_initialValue){
        var length = this.length ;
        var value = opt_initialValue ;

        for(var i = 0 ; i < length ; i++){
            if(i == 0 && opt_initialValue === undefined){
                value = this[0] ;
            }else{
                value = callback.apply( null ,[ value , this[i] , i , this]);
            }
        }
        return value ;
    }

    arrPro.reduceRight = function(callback , opt_initialValue){
        var length = this.length ;
        var value = opt_initialValue ;

        for(var i = length-1 ; i > -1 ; i--){
            if(i == length-1 && opt_initialValue === undefined){
                value = this[length-1] ;
            }else{
                value = callback.apply( null , [value , this[i] , i , this]);
            }
        }
        return value ;
    }
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