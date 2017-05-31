window.onload=function () {

let canvas=document.querySelector('canvas');
let ctx=canvas.getContext('2d');
let mask=document.querySelector('.mask')
let line=document.querySelector('.icon-zhixian');
let pencil=document.querySelector('.icon-qianbi');
let rect=document.querySelector('.icon-juxing');
let circle=document.querySelector('.icon-yuan');
let poly=document.querySelector('.icon-polygon');
let roundedRectangle=document.querySelector('.icon-yuanjiaojuxing');
let eraser=document.querySelector('.icon-xiangpica');
let star=document.querySelector('.icon-wujiaoxingkong');
let label=document.querySelectorAll('label');
let save=document.querySelector('.icon-73');
let fillColor=document.querySelector('.fillColor');
let strokeColor=document.querySelector('.strokeColor');
let tianchong=document.querySelector('.icon-tianchong');
let miaobian=document.querySelector('.icon-miaobian');
let newCanvas=document.querySelector('.icon-xinjian');
let screens=document.querySelector('.screen');
let eraserBtn=document.querySelector('.eraserBtn');
let write=document.querySelector('.icon-wenzi');
let selctContent=document.querySelector('.icon-caijian');
let img=document.querySelector('img');
let selectAreaDiv=document.querySelector('.selectArea');
let xuxian=document.querySelector('.icon-xiaoxuxian');


let palette = new Palette(canvas,ctx,mask);
line.onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    palette.draw('line')
    this.id='hot';
}

xuxian.onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    palette.draw('xuxian');
    this.id='hot';
}
pencil.onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    palette.pencil();
    this.id='hot';

}

rect.onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    palette.draw('rect');
    this.id='hot';

}

circle.onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    palette.draw('circle');
    this.id='hot';

}

poly.onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    palette.bian=prompt('请输入变数','5');
    palette.draw('poly');
    this.id='hot';

}

roundedRectangle.onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    palette.draw('roundedRectangle');
    this.id='hot';

}

eraser.onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    let w=prompt('请输入橡皮尺寸','20');
    palette.eraser(w,w,eraserBtn);
    this.id='hot';

}

star.onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    palette.jiaoshu=prompt('请输入角数','5');

    palette.draw('star');
    this.id='hot';

}

//撤销
label[label.length-1].onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    palette.cancel();
    this.id='hot';
}
//ctrl+z撤销
document.body.onkeydown=function (e) {
    if(e.ctrlKey && e.keyCode==90){
        palette.cancel();
    }
}

fillColor.onchange=function () {
        palette.fillStyle=fillColor.value;
    }
strokeColor.onchange=function () {
        palette.strokeStyle=strokeColor.value;

}

tianchong.onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    this.id='hot';
    palette.paintType='fill';
}
miaobian.onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    this.id='hot';
    palette.paintType='stroke';
}

newCanvas.onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    this.id='hot';
    if(confirm('是否需要保存?')){
        let data=canvas.toDataURL('image/png');
        img.src=data;
    }else {
        return;
    }
    palette.creatCanvas();
}


    //文字
write.onclick=function () {
    for(let i=0;i<label.length;i++){
        label[i].id='';
    }
    this.id='hot';
    palette.writeFont();
}

//裁切
    selctContent.onclick=function () {
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
        palette.selectContent(selectAreaDiv);
    }
    
    //保存
    save.onclick=function () {
        let data=canvas.toDataURL('image/png');
        img.src=data;
    }
}