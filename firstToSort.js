const prompt = require('prompt-sync')({sigint: true});

class runTheGame{

    constructor(){
        this.field = [];
        this.x = 0;
        this.y = 0
        this.out = false;
    };

    stepsVar = ['l','r','u','d'];

    correctCommand = step => {
        return stepsVar.includes(step);
    } 

    outOfField = (x,y) => {
        if(this.field.length - 1 > x || this.field[0].length -1 > y || x < 0 || y < 0){
            return true;
        }
        return false;
    
    };

    changeCoords = (x,y) => {

        if(outOfField(this.x + x, this.y + y)){
            console.log(`you are trying to move out of the field! No way!`);
            this.out = true;
            return;
        };
        this.x += x;
        this.y += y;
        this.field[x][y] = '*';
    }

    makeAStep = step => {

            switch(step.toLowerCase()){         //!!!define: what's x and what's y!!!
                case 'u':
                    this.changeCoords(-1,0);
                    break;
                case 'd':
                    this.changeCoords(1,0);
                    break;
                case 'r':
                    this.changeCoords(0,1);
                    break;
                case 'l':
                    this.changeCoords(0,-1);
                    break;
                default:
                    break;
                    
            };    
    };

    isHole = () => {
        if(this.field[this.x,this.y] === hole) 
            return true;
        return false;
    };

    isHat = () => {
        if(this.field[this.x,this.y] === hat) 
            return true;
        return false;
    };


    initGame = (height, width, percentage) => {

        //Generate empty field
        for(let i = 0; i < height; i++){
            let row = [];
            for(let j = 0; j < width; j++)
                row.push[fieldCharacter]; 
            field.push(row);
        };

        //Generate holes
        let holeAmount = Math.floor((height*width)/100)*percentage;

        let x,y;
        for(let i = 0; i< holeAmount; i++){
            x = this.generateRandom(width);
            y =  this.generateRandom(height);

            field[y] = this.changeChar(x, hole, field[y]);
        };

        //Generate hat
        x = this.generateRandom(width);
        y =  this.generateRandom (height);

        field[y] = this.changeChar(x, hat, field[y]);
        this._field = field;    
    }
};

// main process

let game = new runTheGame();
game.initGame(x,y, percent);

while(!isHat()){
    const step = prompt('What is your next step?');

    if(!correctCommand(step)) {
        console.log('Choose the direction: Up, Left, Down or Right');
        continue;
    };

    makeAStep(step); 
    if( this.out ) continue;

    if(isHole()){
        console.log(`oh,no! you fell in the hole!`);
        initGame();
    };

    if(isHat()) {
        console.log(`I bet you've found the hat! We have a winner!`);
    };

}