function main() {
    const canvas = document.getElementById('Canvas');
    const c = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(c)

    class Bar {
        constructor(x,y,width,height,color,index) {
            this.x  = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.index =index;
    
        }

        update(mic) {
            const sound = mic*1000;
            if (sound > this.height) {
                this.height = sound;
            }else{
                this.height -= this.height*0.05;

            }
 
        }
        draw(context){
            context.strokeStyle = this.color;
            context.save();
            context.translate(canvas.width/2,canvas.height/2);

            context.rotate(this.index * 0.5)
            context.beginPath();
            context.moveTo(this.x,this.y);
            context.lineTo(this.y,this.height);
            context.arc(this.x, this.y, this.width, 0, 2 * Math.PI* this.height*100);
            context.stroke();
            
            
            context.restore();
    
        }
    
    
    }
    const bar_1 = new Bar(10,10,100,200,'blue');
    const microphone = new Microphone();
    console.log(microphone);

    let bars =[] ;
    let barWidth = canvas.width/256
    function createBar(){
        for(let i = 0 ; i<256 ; i++){
            let color ='hsl('+i*2+',100%,50%)'
            bars.push(new Bar(0,i*1.5,5,50,color,i));

        }

    }
    createBar();
    console.log(bars);
 

    function animate(){
        if(microphone.initialized){
            c.clearRect(0,0,canvas.width,canvas.height);
            const samples = microphone.getSamples();
   
            bars.forEach(function(bar,i){
                bar.update(samples[i]);
                bar.draw(c);
            });
        }
        requestAnimationFrame(animate);
    
    }
    animate()

}
