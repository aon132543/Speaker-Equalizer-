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
            this.height = mic*1000;
 
        }
        draw(context){
            context.fillStyle = this.color;
            context.fillRect(this.x,this.y,this.width,this.height)
    
        }
    
    
    }
    const microphone = new Microphone();
    console.log(microphone);

    let bars =[] ;
    let barWidth = canvas.width/256
    function createBar(){
        for(let i = 0 ; i<256 ; i++){
            let color ='hsl('+i*2+',100%,50%)'
            bars.push(new Bar(i*barWidth,canvas.height/2,1,20,color,i));

        }

    }
    createBar();
 

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
