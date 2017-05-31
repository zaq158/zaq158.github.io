/**
 * Created by Administrator on 2017/5/28.
 */
$(function () {
    $('#fullpage').fullpage(
        //导航栏跳转
        {
            anchors:['page1', 'page2', 'page3','page4'],
            menu: '#menu',
            afterRender:function(){
               $('#js_fullpage').find(".active").addClass("focus");
               $('.photo').delay(500).animate({top:0,left:600,opacity:'1'},1000);
               $('.yuandian').delay(500).animate({left:680,opacity:'1'},1000);
                $('.name').delay(500).animate({left:630,opacity:'1'},1000);
                $('.job').delay(500).animate({right:500,opacity:'1'},1000);
                $('.xuanyan').delay(500).animate({right:100,opacity:'1'},1000);
                $('.bottomxuanyan').delay(500).animate({right:370,opacity:'1'},1000);
                $('.mokuai1').delay(300).animate({top:200,left:450,opacity:'1'},1000);
                $('.mokuai2').delay(300).animate({top:300,right:450,opacity:'1'},1000);
                $('.mokuai3').delay(300).animate({top:400,left:450,opacity:'1'},1000);
         },
            afterLoad:function(anchorLink ,index){ // 滚动结束后
                if(index==1){
                    $('#js_fullpage').children().eq(index-1).addClass("focus");
                    $('.photo').delay(500).animate({top:0,left:600,opacity:'1'},1000);
                    $('.yuandian').delay(500).animate({left:680,opacity:'1'},1000);
                    $('.name').delay(500).animate({left:630,opacity:'1'},1000);
                    $('.job').delay(500).animate({right:500,opacity:'1'},1000);
                    $('.xuanyan').delay(500).animate({right:100,opacity:'1'},1000);
                    $('.bottomxuanyan').delay(500).animate({right:370,opacity:'1'},1000);
                }
                if(index==2){
                    let canvas1=$('canvas')[0];
                    roundMove(canvas1,80,50,170,170,'#29BBE3');
                    let canvas2=$('canvas')[1];
                    roundMove(canvas2,85,50,170,170,'#FFC000');
                    let canvas3=$('canvas')[2];
                    roundMove(canvas3,85,50,170,170,'#E74C3C');
                    let canvas4=$('canvas')[3];
                    roundMove(canvas4,70,50,170,170,'#0BC5A2')
                    function roundMove(obj,num,r,w,h,color) {
                        let ctx=obj.getContext('2d');
                        let t,n=0,count=num;
                        ctx.lineWidth=10;
                        ctx.strokeStyle=color;
                        ctx.lineCap='round';
                        ctx.font='bold 30px sans-serif';
                        ctx.textAlign='center';
                        ctx.textBaseline='middle';
                        t=setInterval(move,20);

                        function move() {

                            n++;
                            if(n==count){
                                clearInterval(t)
                            }
                            ctx.clearRect(0,0,w,h);
                            ctx.beginPath();
                            let angle=n*3.6*Math.PI/180;
                            ctx.arc(w/2,h/2,r,0,angle,false);
                            ctx.stroke();
                            ctx.fillText(`${n}%`,w/2,h/2);
                        }
                    }
                }

                if(index==4){
                    $('.mokuai1').delay(500).animate({top:200,left:450,opacity:'1'},1000);
                    $('.mokuai2').delay(500).animate({top:300,right:450,opacity:'1'},1000);
                    $('.mokuai3').delay(500).animate({top:400,left:450,opacity:'1'},1000);
                }


        },
            onLeave:function(index,nextIndex,direction){ // 滚动前
                if(index==1){
                    $('.photo').delay(500).animate({top:-30,left:-600,opacity:'0'},1000);
                    $('.yuandian').delay(500).animate({left:-680,opacity:'0'},1000);
                    $('.name').delay(500).animate({left:-500,opacity:'0'},500);
                    $('.job').delay(500).animate({right:-20,opacity:'0'},500);
                    $('.xuanyan').delay(500).animate({right:-100,opacity:'0'},10);
                    $('.bottomxuanyan').delay(500).animate({right:-370,opacity:'0'},10);
                }
                if(index==4){
                    $('.mokuai1').delay(500).animate({top:200,left:-500,opacity:'0'},1000);
                    $('.mokuai2').delay(500).animate({top:300,right:-500,opacity:'0'},1000);
                    $('.mokuai3').delay(500).animate({top:400,left:-500,opacity:'0'},1000);
                }
                   $('#pageone').css({bottom:'-20%',opacity:'0'});
                   $('#pagetwo').css({bottom:'-20%',opacity:'0'});
                   $('#pagethree').css({bottom:'-20%',opacity:'0'});
                   $('#pagefour').css({bottom:'-20%',opacity:'0'});
                   $('#pageone').stop(true,true).animate({bottom:'0',opacity:'1'},100,function () {
                       $('#pagetwo').stop(true,true).animate({bottom:'0',opacity:'1'},100,function () {
                           $('#pagethree').stop(true,true).animate({bottom:'0',opacity:'1'},100,function () {
                               $('#pagefour').stop(true,true).animate({bottom:'0',opacity:'1'},100)
                           })
                       })
                   })
    }
        }
    )

    let yuandian=$('.yuandian>div');
    console.log(yuandian)
    let index=0;
    function yuandianAnimate() {
        if(index==3){
            index=0
        }
        yuandian.eq(index).delay(100).animate({width:15,height:15},function () {
            $(this).animate({width:10,height:10})

        });
        index++;

    }
       let t=setInterval(yuandianAnimate,500);

    /*第三屏自动轮播*/
    setInterval(function () {
        $('#fullpage').fullpage.moveSlideRight(true)

    },3000)
})