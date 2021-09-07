/** TO DO
 *  
 * 1) moving back -> error
 * 2) check the cursor before it's been overwrote
 * 3) rework toLowerCase for the direction commands
 * 
 */


const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const stepsVar = ['l','r','u','d'];

const fieldHeight = 10;
const fieldWidth = 10;
const holePercent = 10;

class runTheGame{

    constructor(){
        this.field = [];
        this.x = 0;
        this.y = 0;
        this.percent=0;
        this.out = false;
    };    

    correctCommand(step){
        return stepsVar.includes(step);
    } 

    print(){
        for(let i = 0; i < this.field.length; i++){
            let row = '';
            for(let j = 0; j < this.field[0].length; j++)
                row += this.field[i][j];           

            console.log(row);
        };
    };

    outOfField(x,y){
        if(this.field.length - 1 < x || this.field[0].length -1 < y || x < 0 || y < 0){
            return true;
        }
        return false;    
    };

    changeCoords(x,y){

        if(this.outOfField(this.x + x, this.y + y)){
            this.out = true;
            return;
        };
        this.x += x;
        this.y += y;
        this.field[this.x][this.y] = pathCharacter;
    }

    makeAStep(step){

            switch(step.toLowerCase()){   
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

    isHole() {
        if(this.field[this.x,this.y] === hole) 
            return true;
        return false;
    };

    isHat(){
        if(this.field[this.x,this.y] === hat) 
            return true;
        return false;
    };

    generateRandom(num){
        return Math.floor(Math.random()*num);
    };

    initGame(height, width, percentage){

        //Init

        this.x = 0;
        this.y = 0;
        this.percent = 0;
        this.field = [];
        this.out = false;
        

        //Generate empty field
        for(let i = 0; i < height; i++){
            let row = [];
            for(let j = 0; j < width; j++)
                row.push(fieldCharacter); 
            this.field.push(row);
        };

        //Generate holes
        let holeAmount = Math.floor((height*width)/100)*percentage;
        let x,y;
        for(let i = 0; i< holeAmount; i++){
            x = this.generateRandom(height);
            y =  this.generateRandom(width);

            this.field[x][y] = hole;
        };

        //Generate hat
        x = this.generateRandom(width);
        y =  this.generateRandom (height);
        this.field[x][y] = hat;   

        //Set initial path 
        this.field[0][0] = pathCharacter;  
    }
};

/* 
================= MAIN PROCESS=============================     
*/

let game = new runTheGame();
game.initGame(fieldHeight, fieldWidth, holePercent);
game.print();


while(!game.isHat()){
    const step = prompt('What is your next step? ');
    //const step = 'd'

    if(!game.correctCommand(step)) {
        console.log('Choose the direction: Up, Left, Down or Right. ');
        continue;
    };

    game.makeAStep(step); 
    if(game.out) {
        console.log('Oh no, you fell out of the field! ');
        tryAgain = prompt('Wanna try again? y/n: ');  

        if(tryAgain === 'y') {
            game.initGame(fieldHeight, fieldWidth, holePercent)
        }else break; 
    };
    game.print();


    if(game.isHole()){
        console.log(`oh,no! you fell in the hole! `);
        tryAgain = prompt('Wanna try again? y/n : ');

        if(tryAgain === 'y') {
            game.initGame(fieldHeight, fieldWidth, holePercent)
        }else break;  
    }; 

    if(game.isHat()){
        console.log(`I bet you've found the hat! We have a winner! `);
        tryAgain = prompt('Wanna try again? y/n : ');  
        if(tryAgain === 'y') {
            game.initGame(fieldHeight, fieldWidth, holePercent)
        }else break; 
    }
};

console.log(`See ya! `);
