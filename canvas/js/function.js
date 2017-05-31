function Palette(obj,ctx,mask) {
    this.obj=obj;
    this.ctx=ctx;
    this.mask=mask;
    this.obj.width=obj.width;
    console.log(obj.width);
    // this.width=obj.width;
    // this.height=obj.height;
    this.obj.height=obj.height;
    this.ctx.lineWidth=10;
    this.fillStyle='orange';
    this.strokeStyle='orange';
    this.history=[];
    this.r=10;
    this.bian=5;
    this.jiaoshu=5;
    this.paintType='stroke';
    this.canvasWidth='1000';
    this.canvasHeight='500';
}
Palette.prototype={
    init:function () {
       this.ctx.fillStyle=this.fillStyle;
       this.ctx.strokeStyle=this.strokeStyle;
       this.ctx.setLineDash([]);
    },

    //直线
    line:function (ox,oy,mx,my) {
                this.ctx.beginPath();
                this.ctx.moveTo(ox,oy);
                this.ctx.lineTo(mx,my);
                this.ctx.closePath();
                this.ctx.stroke();



    },
    //铅笔
    pencil:function () {
        let self=this;
        self.mask.onmousedown=function (e) {
            let ox=e.offsetX,oy=e.offsetY;

            self.ctx.beginPath();
            self.ctx.moveTo(ox,oy);
            self.mask.onmousemove=function (e) {
                self.init();
                let mx=e.offsetX,my=e.offsetY;

                self.ctx.lineTo(mx,my);

                self.ctx.stroke();

            }
            self.mask.onmouseup=function () {
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }
    },

    //矩形
    rect:function (ox,oy,mx,my) {
                this.ctx.beginPath();
                this.ctx.moveTo(ox,oy);
                this.ctx.rect(ox,oy,mx-ox,my-oy);
                this.ctx[this.paintType]();

    },
    //虚线
    xuxian:function (ox,oy,mx,my) {
      this.ctx.beginPath();
      this.ctx.setLineDash([20,40]);
      this.ctx.moveTo(ox,oy);
      this.ctx.lineTo(mx,my);

      this.ctx.closePath();
      this.ctx.stroke();
    },

    //圆
    circle:function (ox,oy,mx,my) {


                this.ctx.beginPath();
                this.ctx.arc(ox,oy,mx-ox,0,Math.PI*2);
                this.ctx.closePath();
                this.ctx[this.paintType]();



    },

    //多边形
    poly:function (ox,oy,mx,my) {
                let r=Math.sqrt((mx-ox)*(mx-ox)+(my-oy)*(my-oy));
            let angle = (360 / this.bian )/ 180 * Math.PI;
            this.ctx.beginPath();
            this.ctx.moveTo(ox + r, oy);
            for (let i = 0; i < this.bian; i++) {
                this.ctx.lineTo(ox + r * Math.cos(angle * i), oy + r * Math.sin(angle * i));
            }
            this.ctx.closePath();
            this.ctx[this.paintType]();

    },

    //圆角矩形
    roundedRectangle:function (ox,oy,mx,my) {
                this.ctx.beginPath();
                this.ctx.moveTo(ox + this.r, oy);
                this.ctx.lineTo(mx - this.r, oy);
                this.ctx.quadraticCurveTo(mx, oy, mx, oy + this.r);
                this.ctx.lineTo(mx, my - this.r);
                this.ctx.quadraticCurveTo(mx, my, mx - this.r, my);
                this.ctx.lineTo(ox + this.r, my);
                this.ctx.quadraticCurveTo(ox, my, ox, my - this.r);
                this.ctx.lineTo(ox, oy + this.r);
                this.ctx.quadraticCurveTo(ox, oy, ox + this.r, oy);
                this.ctx.closePath();
                this.ctx[this.paintType]();

            },


    //橡皮
        eraser:function (w,h,eraserBtn) {
            let self=this;
            self.mask.onmousedown=function () {
                eraserBtn.style.display='block';
                self.mask.onmousemove=function (e) {
                    let mx=e.offsetX-w/2,my=e.offsetY-w/2;
                    eraserBtn.style.width=w+'px';
                    eraserBtn.style.height=w+'px';
                    if(mx>self.obj.width){
                        mx=self.obj.width-w;
                    }
                    if(mx<0){
                        mx=0;
                    }
                    if(my>self.obj.height){
                        my=self.obj.height-w
                    }
                    if(my<0){
                        my=0
                    }
                    eraserBtn.style.left=mx+'px';
                    eraserBtn.style.top=my+'px';
                    self.ctx.clearRect(mx,my,w,w);

                }
                self.mask.onmouseup=function () {
                    eraserBtn.style.display='none';
                    self.mask.onmouseup=null;
                    self.mask.onmousemove=null;
                }
            }
        },


    //多角形
        star:function (ox,oy,mx,my) {
                    this.ctx.beginPath();
                    let angle=(360/this.jiaoshu)/180/2*Math.PI;
                    let radius=Math.sqrt((mx-ox)*(mx-ox)+(my-oy)*(my-oy));
                    let radius1=radius/3;
                    for (let i = 0; i <this.jiaoshu*2;i++) {
                        if (i % 2) {
                            this.ctx.lineTo(ox + radius * Math.cos(angle * i), oy + radius * Math.sin(angle * i));
                        }else {
                            this.ctx.lineTo(ox + radius1 * Math.cos(angle * i), oy + radius1 * Math.sin(angle * i));

                        }
                    }
                    this.ctx.closePath();
                    this.ctx[this.paintType]();

                },

    //撤销方法
        cancel:function () {
          let self=this;
            if(self.history.length<0){
                return;
            }else if(self.history.length==0){
                self.ctx.clearRect(0,0,self.obj.width, self.obj.height);

            }
            let last=self.history.pop();
            self.ctx.putImageData(last,0,0);
        },

    //文字
    writeFont:function () {
        let self=this;
        let ox,oy,div;
        self.mask.onmousedown=function (e) {
            ox = e.offsetX
            oy = e.offsetY
            div = document.createElement('div');
            div.style.cssText = `
            min-width:50px;height:auto;background:#ffffff;position:absolute;
            top:${oy}px;left:${ox}px;border:1px solid #000000;
            `
            div.contentEditable = true;
            self.mask.appendChild(div);
            self.mask.onmousedown = null;
            self.area = div;


            self.area.onmousedown = function (e) {
                let ox = e.clientX - this.offsetLeft, oy = e.clientY - this.offsetTop;
                self.mask.onmousemove = function (e) {
                    if (self.history.length > 0) {
                        self.ctx.putImageData(self.history[self.history.length - 1], 0, 0)
                    }
                    let mx = e.clientX, my = e.clientY;
                    let lefts = mx - ox, tops = my - oy;
                    self.area.style.left = lefts + 'px';
                    self.area.style.top = tops + 'px';

                }
                self.area.onmouseup = function () {
                    self.area.onmouseup = null;
                    self.mask.onmousemove = null;
                }
            }

            self.area.onblur = function () {
                self.ctx.fillText(this.innerText, this.offsetLeft, this.offsetTop)
                self.history.push(self.ctx.getImageData(0, 0, self.obj.width, self.obj.height))
                self.mask.removeChild(div);
                self.area = null;
            }
        }
    },


    //截取
    selectContent:function (selectArea) {
        let self=this;
        self.selectArea=selectArea;
        let minx,miny,w,h;
        self.mask.onmousedown=function (e) {
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function (e) {
                let mx=e.offsetX,my=e.offsetY;
                minx=mx>ox?ox:mx;
                miny=my>oy?oy:my;
                w = Math.abs(mx-ox);
                h = Math.abs(my-oy);
                self.selectArea.style.cssText=`
                width:${w}px;height:${h}px;border:1px dashed #000;
                position:absolute;left:${minx}px;top:${miny}px;
                `

            }
            self.mask.onmouseup=function () {
                self.mask.onmouseup=null;
                self.mask.onmousemove=null;
                self.temp=self.ctx.getImageData(minx,miny,w,h);
                self.ctx.clearRect(minx,miny,w,h);
                self.history.push(self.ctx.getImageData(0,0,self.obj.width,self.obj.height));
                self.ctx.putImageData(self.temp,minx,miny);
                self.drag(minx,miny,w,h,selectArea);
            }
        }
    },
   //拖拽函数
    drag:function (x,y,w,h,selectArea) {
        let self=this;
        self.mask.onmousemove=function (e) {
            let ox=e.offsetX,oy=e.offsetY;
            if(ox>x &&　ox < w+x && oy>y && oy<h+y){
                self.mask.style.cursor='move';

            }else {
                self.mask.style.cursor='default';
            }
        }
        self.mask.onmousedown=function (e) {
            let ox=e.offsetX,oy=e.offsetY;
            let mx=ox-x,my=oy-y;
            if(ox>x &&　ox < w+x && oy>y && oy<h+y){
                self.mask.style.cursor='move';

            }else {
                self.mask.style.cursor='default';
                return;
            }
            self.mask.onmousemove=function (e) {
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length != 0){
                    self.ctx.putImageData(self.history[self.history.length - 1], 0, 0)
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                var left = endx - mx;
                var top = endy - my;
                if(left<0){
                    left=0;
                }
                if(left>self.width-w){
                    left=self.width-w
                }

                if(top<0){
                    top=0;
                }
                if(top>self.height-h){
                    top=self.height-h
                }
                selectArea.style.left= left+'px';
                selectArea.style.top=top+'px';
                x=left;
                y=top;
                self.ctx.putImageData(self.temp, left, top);
            }
            self.mask.onmouseup = function () {
                self.mask.onmouseup = null;
                self.mask.onmousemove = null;
                self.drag(x, y, w, h, selectArea);
            }

        }
    },

    //新建画布
     creatCanvas:function () {
       let self=this;
       self.ctx.clearRect(0,0,self.obj.width,self.obj.height);
       self.history.push(self.ctx.getImageData(0, 0, self.obj.width, self.obj.height));
       self.ctx.putImageData(self.history[self.history.length - 1], 0, 0);
     },
    //去除函数冗余，将结构相同的函数封装在一个函数中。
        draw:function (type) {
            let self=this;
            self.mask.onmousedown =function (e) {
                let ox=e.offsetX,oy=e.offsetY;
                self.mask.onmousemove=function (e) {
                    self.init();
                    self.ctx.clearRect(0, 0, self.obj.width, self.obj.height);
                    if (self.history.length > 0) {
                        self.ctx.putImageData(self.history[self.history.length - 1], 0, 0)
                    }
                    let mx=e.offsetX,my=e.offsetY;

                    //根据需求调用不同的方法
                    self[type](ox,oy,mx,my);
                }
                self.mask.onmouseup=function(){
                    self.history.push(self.ctx.getImageData(0, 0, self.obj.width, self.obj.height))
                    self.mask.onmousemove=null;
                    self.mask.onmouseup=null;
                }
            }
        }


}
