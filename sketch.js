let increment = 0;

function setup() {
    createCanvas(700, 700);
}

function draw() {
    background(0);

    //GET DIAGONAL DISTANCE OF THE SCREEN
    let w = width * sqrt(2);
    let h = height * sqrt(2);


    for (let layer = 1; layer < 11; layer++) {
        //1 --> DRAW THE OUTER LAYER
        //10 --> DRAW THE INNER LAYER

        //DRAW ONE OF THE LAYER
        //NOISE IS A FUNCTION THAT 
        //RETURNS A NUMBER (FROM 0 TO 1) BASED ON THE PARAMETER 
        //IT SEEMS A RANDOM BUT ALWAYS YOU CALL noise(x);
        //WILL RETURN THE SAME SINCE THE x VALUE DON'T CHANGE
        drawEllipseQuadrants(w, h, noise(layer * 0.1 + increment));

        //EACH ITERATION DECREMENT 100 PX OF THE DIMENSIONS 
        w -= 100;
        h -= 100;
    }

    //INCREMENT THE NOISE PARAMETER VALUE
    increment += 0.05;
}

function drawEllipseQuadrants(w, h, index) {
    
    //ALL THE TRANSLATIONS AND ROTATIONS
    //BETWEEN PUSH() AND POP() WILL BE UNDONE 
    //AFTER THE BLOCK RESPECTIVE POP()
    push();
    //(0,0) IS NOW AT THE SCREEN CENTER 
    translate(width / 2, height / 2);

    //THE SECTION IS 1/4 OF THE CIRCUNFERENCE
    let section = (TWO_PI / 4);

    //ROTATE BASED ON THE NOISE RETURN
    let rotateAngle = map(index, 0, 1, 0, PI);
    rotate(- PI / 2 + rotateAngle);

    //RUNS AT EACH SECTION (1, 2, 3, 4)
    for (let i = 0; i < 4; i++) {

        //SHAPES WILL HAVE NO EDGE
        noStroke();

        colorMode(RGB);
        //ALTERNATE THE COLORS
        if (i % 2 == 0) {
            fill(0);
        }
        else {
            fill(255);
        }

        //BEGIN A SHAPE
        beginShape();
        //RUNS OUTSIDE THE SECTION
        for (let angle = i * section; angle <= (i + 1) * section; angle += 0.001) {
            vertex((w / 2) * cos(angle + section), (h / 2) * sin(angle + section));
        }
        //RUNS INSIDE THE SECTION
        for (let angle = (i + 1) * section; angle >= i * section; angle -= 0.001) {
            vertex((w / 2 - 51) * cos(angle + section), (h / 2 - 51) * sin(angle + section));
        }
        //END THE SHAPE
        endShape();

    }

    pop();
}