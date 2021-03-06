

###CSS元素水平居中对齐


###内敛元素

适用于诸如如文本，图片，链接等`display`属性值为`inline`或`inline-block`的元素

	el{
		text-align:center;
	}

如，居中对齐文本

	<div class="wrapper">文字居中</div>
	
	.wrapper{
		width:500px;
		text-align:center;
	}
	
内联块级元素居中

	<div class="wrapper">
		<button>新建</button>
		<button>保存</button>
		<button>复制</button>					
		<button>黏贴</button>
	</div>	
	
	.wrapper{
		width:400px;
		text-align:center;
	}
	

###块级元素

1. 方式一，使用`margin`

		<div class="wrapper">
			<div class="inner_el"></div>
		</div>
		
		.inner_el{
			margin:0 auto;
		}
		
2. 方式二,使用`absolute`绝对布局和负`margin`，要求元素**定宽**,且其父元素为定位元素


		<div class="wrapper">
			<div class="inner_el"></div>
		</div>
		.wrapper{
			position:relative;
		}
		.wrapper .inner_el{
			position:absolute;
			left:50%;
			width:200px;
			margin-left:-100px;
		}

3. 方式三，使用`absolute`绝对布局和`transform`,要求父元素为定位元素

		<div class="wrapper">
			<div class="inner_el"></div>
		</div>
		.wrapper{
			position:realtive;
		}
		.wrapper .inner_el{
			position:absolute;			
			width:200px;
			left:50%;
			transform:translateX(-50%);
		}
		
4. 方式四，使用Flexbox弹性布局	,要求父元素为flex布局

		<div class="wrapper">
			<div class="inner_el"></div>
		</div>
		.wrapper{
			display:flex;
			flex-direction:row;
			justify-content:center; /* 居中对齐子元素 */
		}

5. 方式五，使用`absolute`绝对布局和CSS的`calc()`函数，要求定位元素定宽,父元素为定位元素

		
		<div class="wrapper">
			<div class="inner_el"></div>
		</div>
		
		.wrapper{
			position:relative;
		}
		.inner_el{
			position:absolute;
			width:200px;
			left:calc(50% - 100px);		
		}
		
		
		
###参考

+ [Centering in CSS: A Complete Guide][1]
+ [THE ULTIMATE FLEXBOX CHEAT SHEET][2]
+ [THE COMPLETE GUIDE TO CENTERING A DIV][3]
+ [HOW TO CENTER IN CSS][4]
+ [CSS Flexbox Examples][5]
+ [CSS Flexible Box Layout][6]


[1]: https://css-tricks.com/centering-css-complete-guide/
[2]: http://www.sketchingwithcss.com/samplechapter/cheatsheet.html
[3]: http://www.tipue.com/blog/center-a-div/
[4]: http://howtocenterincss.com/
[5]: https://umaar.github.io/css-flexbox-demo/
[6]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout