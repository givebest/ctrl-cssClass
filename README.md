# ctrl-cssClass
----

## 简介

支持兼容IE6+的HTML元素Class操作，提供'hasClass', 'addClass', 'removeClass', 'toggleClass'。
  

## 使用

### Browser

	<script src="js/Ctrl-cssClass-compatible.js"></script> 


### Require.js

	require(['ctrl-cssClass-compatible'], function(ccc){
		ccc.hasClass(ele, 'c1');
		ccc.addClass(ele, 'c1 c2 c3');
		ccc.removeClass(ele, 'c1 c2 c3');
		ccc.toggleClass(ele, 'c1 c2 c3');	
	});	


### 示例

	ccc.hasClass(ele, 'c1');
	ccc.addClass(ele, 'c1 c2 c3');
	ccc.removeClass(ele, 'c1 c2 c3');
	ccc.toggleClass(ele, 'c1 c2 c3');






## 感谢他们

演示网页排版来自： [https://github.com/sofish/typo.css](https://github.com/sofish/typo.css)       



## License

[MIT](./LICENSE) © 2016 [givebest](https://github.com/givebest)

 
