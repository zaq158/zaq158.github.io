/*
* @Author: Administrator
* @Date:   2017-05-08 09:49:20
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-15 09:15:51
*/

'use strict';

// 头部nav
 let topNavLi=document.querySelectorAll('header>.top-conter>.r-top-conter>ul>li');
 let myXiala=topNavLi[0].querySelector('.my-xiala');
 let shoucang=topNavLi[3].querySelector('.shoucang-xiala');
 let phoneXiala=topNavLi[4].querySelector('.phone-xiala');
 topNavLi[0].onmouseover=function(){
     myXiala.style.display='block';
     topNavLi[0].style.background='#ffffff';
 }
 topNavLi[0].onmouseout=function(){
     myXiala.style.display='none';
     topNavLi[0].style.background='#f2f2f2';
 }
 topNavLi[3].onmouseover=function(){
     shoucang.style.display='block';
     topNavLi[3].style.background='#ffffff';
 }
 topNavLi[3].onmouseout=function(){
     shoucang.style.display='none';
     topNavLi[3].style.background='#f2f2f2';
 }
 topNavLi[4].onmouseover=function(){
     phoneXiala.style.display='block';
     topNavLi[4].style.background='#ffffff';
 }
 topNavLi[4].onmouseout=function(){
     phoneXiala.style.display='none';
     topNavLi[4].style.background='#f2f2f2';
 }


// banner猫头
let maotou=document.querySelectorAll('.maotou');
let topBannerLi=document.querySelectorAll('.banner .t-banner .r-t-banner>li');
topBannerLi.forEach(function(value,index){
	value.onmouseover=function(){
        maotou[index].id='show';
        maotou[index].style.top='-14px';
	}
	value.onmouseout=function(){
        maotou[index].id='hidden';
        maotou[index].style.top=0;
	}

})



// 轮播图
$(function(){
let lunbo=$('.lunbo')[0];
let footBanner=$('.f-banner')[0];
let lunboImg=$('img',lunbo);
let lunbodian=$('.lunbodian')[0];
let dianUl=$('ul',lunbodian)[0];
let lunboLi=$('li',dianUl);
let widths=parseInt(getStyle(lunboImg[0],'width'));
let current=0,next=0;
for(let i=0;i<lunboImg.length;i++){
	if(i==0){
		continue;
	}
    lunboImg[i].style.left=widths+'px';
}
let t=setInterval(move,3000);
//移到轮播图上让轮播停止
footBanner.onmouseenter=function(){
	clearInterval(t);
}
footBanner.onmouseleave=function(){
	t=setInterval(move,3000)
}
//点击轮播点出现对应的图片
Array.from(lunboLi).forEach(function(value,count,obj){
	value.onclick=function(){
		    lunboLi[current].style.background='#9D9D9D';
			lunboLi[count].style.background='#D3D3D3';
			if(count==current){
			return;
		}
			if(count>current){
				lunboImg[count].style.left=widths+'px';
			    animate(lunboImg[count],{left:0});
			    animate(lunboImg[current],{left:-widths});
			}else if(count<current){
				lunboImg[count].style.left=-widths+'px';
			    animate(lunboImg[count],{left:0});
			    animate(lunboImg[current],{left:widths});
			}
			
			current=next=count;
	}
})



function move(){
	next++;
	if(next == lunboImg.length){
		next=0;
	}
	lunboLi[current].style.background='#9D9D9D';
	lunboLi[next].style.background='#D3D3D3';
	lunboImg[next].style.left=widths+'px';
	animate(lunboImg[current],{left:-widths});
	animate(lunboImg[next],{left:0});
	current=next;
}

/*function movedown(){
	next--;
	if(next < 0){
		next=lunboImg.length-1;
	}
	lunboLi[current].style.background='#9D9D9D';
	lunboLi[next].style.background='#D3D3D3';
	lunboImg[next].style.left=-widths+'px';
	animate(lunboImg[current],{left:widths});
	animate(lunboImg[next],{left:0});
	current=next;
}*/



//banner侧拉
let bannerLi=document.querySelectorAll('.shangpingfenlei>ul>li');
let lCela=$('.cela');
bannerLi.forEach(function(value,index){
    value.onmouseenter=function(){
    	lCela[index].style.display='block';
    }
    value.onmouseleave=function(){
    	lCela[index].style.display='none';
    }
})


//品牌商品展示
let brandLi=document.querySelectorAll('.pingpailist>ul>li');
let brandMask=$('.brand-mask');
brandLi.forEach(function(value,index){
	value.onmouseenter=function(){
		brandMask[index].style.display='block';
	}
	value.onmouseleave=function(){
		brandMask[index].style.display='none';
	}
})

})


/*按需加载*/
let contentFloor=document.querySelectorAll('.content-floor');
let arr=[];
let commonLift=document.querySelectorAll('.common-lift');
let hiddenSearch=document.querySelector('.hidden-search');
let flag1=true;
let fpLift=document.querySelector('.fp-lift');

contentFloor.forEach(function(value){
	arr.push(value.offsetTop);
})
for(let i=0;i<commonLift.length;i++){
	commonLift[i].onclick=function(){
		animate(document.body,{scrollTop:arr[i-1]},500)
	}
}

window.onscroll=function(){
	let tops=document.body.scrollTop;
if(tops>1200){
        	if(flag1){
        	  animate(fpLift,{left:0});
        	  animate(hiddenSearch,{top:0});
        	  flag1=false;
        	}
        	
        }else if(tops<1200){
        	if(!flag1){
        		flag1=true;
        		animate(fpLift,{left:-35});
        		animate(hiddenSearch,{top:-200});
        	}
        	 
        	}

 }       	
