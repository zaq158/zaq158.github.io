
//获取类名，ID名，标签名的通用js
function $(selector,ranger=document){
	if(typeof selector == 'string'){
		let types=selector.trim(); //去空
		let firstCha=types.charAt(0);//获取标签的第一个字符 .或者#
		let slice=types.substring(1);//截取类名或者标签名
		if(firstCha == '.'){
           return ranger.getElementsByClassName(slice);
		}else if(firstCha == '#'){
			return document.getElementById(slice);
		}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(types)){
            return ranger.getElementsByTagName(types);
		}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(types)){
			return document.createElement(types.slice(1,-1));
		}
	}else if(typeof selector == 'function'){
		/*window.onload=function(){
			selector();
		}*/
		addEvent(window,'load',selector());			
	}
}

function addEvent(obj,types,fn){
	obj.addEventListener(types,fn,false);
}

// 获取样式的通用js
function getStyle(obj,attr){
		if(window.getComputedStyle){ //判断浏览器类型
			return getComputedStyle(obj,null)[attr];
		}else{
			return obj.currentStyle[attr];
		}
}

//获取或者修改HTML标签中的内容
function html(obj,content){
	if(content){
		obj.innerHTML=content;
	}else{
		return obj.innerHTML;
	}
}

//简单动画封装

function animation(obj,objArrt){
   let t=setInterval(move,200)
   let speed=10;
   function move(){
   	for(let i in objArrt){  		
   		let change=parseInt(getComputedStyle(obj,null)[i]);
   		if(change>=objArrt[i]){
   			change=objArrt[i];
   			clearInterval(t)
   		}
        obj.style[i]=change+speed+'px';
   	}

       
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


//滑轮滚动函数
function mouseWheel(obj,upFn,downFn){
	obj.addEventListener('mousewheel',fn,false);
	function fn(e){
		e.preventDefault();
		let dir=e.wheelDelta;
		if(dir == 120 || dir == 150 || dir==180){
			upFn();
		}else if(dir == -120 || dir == -150 || dir == -180){
            downFn();
		}
	}
}