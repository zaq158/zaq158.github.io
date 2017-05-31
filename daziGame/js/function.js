'use strict';
//获取文档中指定的元素
function $(selector,ranger=document){
	let type=typeof selector;
	if(type=='string'){
		//获取
		let select=selector.trim();
		let slice=select.substring(1);
		let firstChar=select.charAt(0);
			if(firstChar=='.'){
				return ranger.getElementsByClassName(slice);
			}else if(firstChar=='#'){
				return document.getElementById(slice);
			}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(select)){
				return ranger.getElementsByTagName(select);
			}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(select)){
				//<div>创建div
				return document.createElement(select.slice(1,-1));
			}
		}else if(type=='function'){
		//添加
		/*window.onload=function(){
			selector();//把一个函数的指针作为另一个函数的参数
		}*/
		addEvent(window,'load',selector);
	}
}
//获取文档中指定元素的属性 有兼容性
function getStyle(obj,attr){
	if(window.getComputedStyle){
		return getComputedStyle(obj,null)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}
//修改指定元素中的内容
function xiuGai(obj,content){
	console.log(obj,content);
	if(content){
		obj.innerHTML=content;
	}else{
		return obj.innerHTML;
	}
}
//获取指定元素的子元素节点
function getChilds(obj){
	var childs=obj.childNodes;
	var arr=[];
	 childs.forEach(function(value){
	 	if(value.nodeType==1){
	 		arr.push(value);
	 	}
	 });
	 return arr;
}
//获取第一个
function getFirst(obj){
	return getChilds(obj)[0];
}
//获取最后一个
function getLast(obj){
	let childs=getChilds(obj);
	return childs[childs.length-1];
}
//随机一个
function getRandom(obj,index){
	let childs=getChilds(obj);
	return childs[index];
}
//getNext()  获取下一个元素节点
//思路：先得到下一个兄弟节点a，进行判断；
//若不是,继续找下一个兄弟节点
function getNext(obj){
	let a=obj.nextSibling;
	//如果没有兄弟节点怎么办
	if(a===null){
		return false;
	}
	//如果有
	while(a.nodeType!==1){
		a=a.nextSibling;
		if(a===null){
			return false;
		}
	}
	return a;
}
//轮播图  一次可以移动任意张图片。
function lunbo(obj,num){
		var imgbox=$('.imgbox',obj)[0];
		var lis=$('li',imgbox);
		var widths=parseInt(getStyle(lis[0],'width'))+parseInt(getStyle(lis[0],'margin-right'));
		var btnl=document.querySelector('.btnl');
		var btnr=document.querySelector('.btnr');
		var t=setInterval(fun,2000);
		var flag=true;
		obj.onmouseenter=function(){
			clearInterval(t);
		}
		obj.onmouseleave=function(){
			t=setInterval(fun,2000);
		}
		btnl.onclick=function(){
			if(!flag){
				return;
			}
			fun();
			flag=false;
		}
		btnr.onclick=function(){
			if(!flag){
				return;
			}
			fun1();
			flag=false;
		}
		// 从右往左
		function fun(){
			animate(imgbox,{left:-num*widths},function(){
				for(let i=0;i<num;i++){
					let first=getFirst(imgbox);
					imgbox.appendChild(first);
					imgbox.style.left=0;
				}
				flag=true;
			});
		}
		//从左往右
		// setInterval(fun1,2000);  
		function fun1(){
			for(let i=0;i<num;i++){
				let last=getLast(imgbox);
				let first=getFirst(imgbox);
				console.log(last);
				imgbox.insertBefore(last,first);
				imgbox.style.left=-num*widths+'px';
				animate(imgbox,{left:0},function(){
					flag=true;
				});
			}
		}
}
//轮播图 display
function lunbo1(obj){
	let imgBox=$('.imgbox',obj)[0];//包图片的盒子
	let imgBoxLi=$('li',imgBox);//图片
	let hotbox=document.getElementsByClassName('hotbox');//包轮播点的盒子
	let hotboxLi=hotbox[0].getElementsByTagName('li');//轮播点
	let index=0;
	let pause=setInterval(time,2000);
	let btnl=$('.btnl')[0];//左边按钮
	let btnr=$('.btnr')[0];//右边按钮
	//左右按钮点击
	btnl.onclick=function(){
		moveDown();
	}
	btnr.onclick=function(){
		time();
	}
	function moveDown(){
		index--;
		if(index<0){
			index=imgBoxLi.length-1;
		}
		for(let i=0;i<imgBoxLi.length;i++){
			imgBoxLi[i].style.display='none';
			hotboxLi[i].id='yanse1';
		}
		imgBoxLi[index].style.display='block';
		hotboxLi[index].id='yanse';
	}
	//鼠标移入停止自动轮播
	obj.onmouseover=function(){
		clearInterval(pause);
	}
	obj.onmouseout=function(){
		pause=setInterval(time,2000);
	}
	// 图片自动轮播
	function time(){
		index++;
		if(index==imgBoxLi.length){
			index=0;
		}
		for(let i=0;i<imgBoxLi.length;i++){
			imgBoxLi[i].style.display='none';
			hotboxLi[i].id='yanse1';
		}
		imgBoxLi[index].style.display='block';
		hotboxLi[index].id='yanse';
	}
	//轮播点
	for(let i=0;i<hotboxLi.length;i++){
		hotboxLi[i].onclick=function(){
			for(let j=0;j<hotboxLi.length;j++){
				imgBoxLi[j].style.display='none';
				hotboxLi[j].id='yanse1';
			}
			imgBoxLi[i].style.display='block';
			hotboxLi[i].id='yanse';
			index=i;
		}
	}
}
//轮播图 左右移动
function lunbo2(obj){
	let imgBox=$('.imgBox',obj)[0];
	let lis=$('li',imgBox);
	let width=parseInt(getComputedStyle(lis[0],null).width);
	let current=0,next=0,flag=true;
	let hotbox=$('.hotbox')[0];
	let hotLi=$('li',hotbox);
	var btnl=$('.btnl')[0];
	var btnr=$('.btnr')[0];
	console.log(banner,hotbox,hotLi,btnl,btnr);
	let t=setInterval(move,2000);
	//鼠标移入、移出
	obj.onmouseover=function(){
		clearInterval(t);
	}
	obj.onmouseout=function(){
		t=setInterval(move,2000);
	}
	//点击轮播点
	/*for(var i=0;i<hotLi.length;i++){
		hotLi[i].index=i;
		hotLi[i].onclick=function(){
			hotLi[current].id='yanse1';
			this.id='yanse';
			if(this.index==current){
				return;
			}
			if(this.index>current){
				lis[this.index].style.left=width+'px';
				animate(lis[current],{left:-width});
				animate(lis[this.index],{left:0});
			}else if(this.index<current){
				lis[this.index].style.left=-width+'px';
				animate(lis[current],{left:width});
				animate(lis[this.index],{left:0});
			}
			current=next=this.index;
		}
	}*/
	//利用数组的forEac遍历
	// console.log(hotLi instanceof Array);
	Array.from(hotLi).forEach(function(value,index,obj){
		value.onclick=function(){
			hotLi[current].id='yanse1';
			this.id='yanse';
			if(current==index){
				return;
			}
			if(current<index){
				lis[index].style.left=width+'px';
				animate(lis[current],{left:-width});
				animate(lis[index],{left:0});
			}else if(current>index){
				lis[index].style.left=-width+'px';
				animate(lis[current],{left:width});
				animate(lis[index],{left:0});
			}
			current=next=index;
		}
	});
	//转化数组
	//法2：
	Array(0).forEach.call(hotLi,function(value,index,obj){
		console.log(value);
	})
	//法1：
	Array.from(hotLi)
	//左右按钮
	btnl.onclick=function(){
		if(flag){
			flag=false;
			moveDown()
		}
	}
	btnr.onclick=function(){
		if(!flag){
			return;
		}
		flag=false;
		move();
	}
	//图片
	for(let i=0;i<lis.length;i++){
		if(i==0){
			continue;
		}
		lis[i].style.left=width+'px';
	}
	function move(){
		next++;
		if(next==lis.length){
			next=0;
		}
		hotLi[current].id='yanse1';
		lis[next].style.left=width+'px';
		hotLi[next].id='yanse';
		animate(lis[next],{left:0},function(){
			flag=true;
		});
		animate(lis[current],{left:-width});
		current=next;
	}
	function moveDown(){
		next--;
		if(next<0){
			next=lis.length-1;
		}
		hotLi[current].id='yanse1';
		lis[next].style.left=-width+'px';
		hotLi[next].id='yanse';
		animate(lis[next],{left:0},function(){
			flag=true;
		});
		animate(lis[current],{left:width});
		current=next;
	}
}
// 添加方法 在一个元素后面添加元素
Node.prototype.insertAfter=function(ele){
	let _next=this.nextElementSibling;
	let _parent=this.parentNode;
	_parent.insertBefore(ele,_next);
}
//在一个元素前面添加元素节点
Node.prototype.pretendChild=function(ele){
	let _first=this.firstElementChild;
	this.insertBefore(ele,_first);
}
//把一个元素添加到父元素中
Node.prototype.appendTo=function(parent){
	parent.appendChild(this);
}
//addEevent
function addEvent(obj,type,fun){
	obj.addEventListener(type,fun,false);
}