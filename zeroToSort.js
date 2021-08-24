const prompt = require('prompt-sync')({sigint: true});
const io = require('./IO.js');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field){
        this._field = field;
    };
    
    print(){
        for(let i = 0; i < this._field.length; i++){
            let row = '';
            for(let j = 0; j < this._field[0].length; j++)
                row += this._field[i][j];           

            console.log(row);
        };
    };

    generateRandom(num){
        return Math.floor(Math.random()*num);
    };

    changeChar(index, newChar, str){
        str = str.split('');
        str[index] = newChar;
        str = str.join('');
        return str;
    };

    generateField(height, width, percentage){
        let field = [];
        for(let i = 0; i < height; i++){
            let row = [];
            for(let j = 0; j < width; j++)
                row += fieldCharacter; 
            field.push(row);
        };

    let holeAmount = Math.floor((height*width)/100)*percentage;

    let x,y;
    for(let i = 0; i< holeAmount; i++){
        x = this.generateRandom(width);
        y =  this.generateRandom(height);

        field[y] = this.changeChar(x, hole, field[y]);
    };

    x = this.generateRandom(width);
    y =  this.generateRandom (height);

    field[y] = this.changeChar(x, hat, field[y]);
    this._field = field;
    };
};

//======TEST

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

  myField.generateField(10,10,10);
  myField.print();