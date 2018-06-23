/**
 * Created by Akshar on 1/16/2017.
 */

var canvas ;
var canvasContext;
var ballWhitex = 50;
var ballWhitey = 50;
var ballspeedx = 10;
var ballspeedy = 4;
var paddle1y = 250;
var paddle2y = 250;
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

/* finding the mouse position relative to canvas */
function calculateMousePos (evt) {
    // The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX= evt.clientX-rect.left-root.scrollLeft;
    var mouseY= evt.clientY-rect.top-root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}
function handleMouseClick (evt){
    if (showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}

window.onload=function() {
    // function init() {
    //window.onload = init(); // yo pani garna sakincha .


    document.body.style.backgroundImage = "url('b1.jpg')";
    canvas=document.getElementById('gameClassic');
    canvasContext=canvas.getContext("2d");
    var frames =30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    },1000/frames)
    canvas.addEventListener('mousedown', handleMouseClick);

    //set paddles position value whenever mouse moves
    canvas.addEventListener('mousemove' ,
        function(evt){
            var mousepos = calculateMousePos(evt);
            paddle1y = mousepos.y-(PADDLE_HEIGHT/2);
        });

}
//function to reset a ball
function ballReset() {
    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
        player1Score=0;
        player2Score=0;
        showingWinScreen = true;
    }
    ballspeedx = -ballspeedx;
    ballWhitex = canvas.width/2;
    ballWhitey = canvas.height/2;
}
function computerMovement() {
    var paddle2YCenter = paddle2y + (PADDLE_HEIGHT/2);
    if (paddle2YCenter < ballWhitey - 35) {
        paddle2y += 6;
    }
    else if (paddle2YCenter > ballWhitey + 35) {
        paddle2y -= 6;
    }
}


function moveEverything () {
    if (showingWinScreen) {
        return;
    }
    computerMovement();
    ballWhitex +=   ballspeedx;
    ballWhitey +=  ballspeedy;
    if (ballWhitex > canvas.width ) {
        if (ballWhitey > paddle2y &&
            ballWhitey < paddle2y + PADDLE_HEIGHT) {
            ballspeedx = - ballspeedx;
            var deltaY = ballWhitey - (paddle2y + PADDLE_HEIGHT/2);
            ballspeedy = deltaY*0.35;
        }
        else {
            player1Score++; // must be before ballReset() ;
            ballReset();

        }
    }
    /* bouncing back code */
    if (ballWhitex < 0) {
        // ballspeedx = -ballspeedx;
        if (ballWhitey > paddle1y &&
            ballWhitey < paddle1y + PADDLE_HEIGHT) {
            ballspeedx = - ballspeedx;
            var deltaY = ballWhitey - (paddle1y + PADDLE_HEIGHT/2);
            ballspeedy = deltaY*0.35;
        }
        else {
            player2Score++; //must be before ballReset();
            ballReset();

        }
    }
    if (ballWhitey > canvas.height ) {
        ballspeedy = -ballspeedy;
    }
    /* bouncing back code */
    if (ballWhitey < 0) {
        ballspeedy = -ballspeedy;
    }

}
function drawEverything() {
    // The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context
    // identifier is not supported.
    //Syntax
    // canvas.getContext(contextType, contextAttributes);

    // draws the black

    colorRect(0,0,canvas.width, canvas.height,'black');
    if (showingWinScreen) {
        canvasContext.fillStyle ="white";
        if (player1Score >= WINNING_SCORE ) {
            canvasContext.fillText("Left player won ", 350 ,200 );
        }

        else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText("Right player won ", 350 ,200 );

        }

        canvasContext.fillText("Click To Continue", 350 ,500 );


        return;
    }
    //this is left player paddle
    colorRect(0,paddle1y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
    //this is right player paddle
    //800-10 = 790 . that means ... 800 px width - 10 px of the width of paddle ...this will take our paddle to far left .
    // colorRect(790,paddle2y,10,PADDLE_HEIGHT,'white');
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
    // draws the ball white
    colorCircle(ballWhitex,ballWhitey,10,"white");

    // centering using width and height propertie of canvas : canvasContext.fillStyle="white";
    // canvasContext.fillRect(((canvas.width/2)-2), ((canvas.height/2)-2),4,4) ;

    // manually centering garna chai just : ........................
    // canvasContext.fillRect(398,298,4,4) ;
    canvasContext.fillText(player1Score, 100 ,100 );
    canvasContext.fillText(player2Score, canvas.width-100 ,100 );
}
//this function is template for drawing circle . cool style
function colorCircle(centerX,centerY,radius,drawColor) {
    canvasContext.fillStyle=drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
    canvasContext.fill();

}
// this function helps to make templates . so we can use it in top
function colorRect(leftx, topy, width, height , drawcolor ) {
    canvasContext.fillStyle = drawcolor;
    canvasContext.fillRect(leftx,topy,width,height);

}

