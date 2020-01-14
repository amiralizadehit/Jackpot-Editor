class Jackpot_Canvas{
    constructor(options){
        this.options = options;
        this.element = document.createElement("canvas");
        this.width = options.width;
        this.height = options.height;
        this.element.height = this.height;
        this.element.width = this.width;
    }
    getElement(){
        return this.element;
    }

    redraw(){
        if(this.element.parentNode){
            let rect = this.element.parentNode.getClientRects()[0];
            if (rect) {
                this.element.width = rect.width;
                this.element.height = rect.height;
                let ctx = this.element.getContext("2d");
                ctx.clearRect(0, 0, this.element.width, this.element.height);
                ctx.lineWidth = 1;
                ctx.strokeStyle = this.options.strokeColor;
                ctx.strokeRect(10.5, 10.5, this.element.width - 20, this.element.height - 20);
                ctx.strokeText(this.options.strokeText, 20.5, 30.5);
            }
        }
    }
}