const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let score = 0
const brickRows = 9
const brickCols = 5
const bricks = []
const fillColor = '#0095dd'

//ball prop
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4, //distance from x axis
    dy: -4, //distance from y axis (negtive value for move up)
    visible: true
}

//paddle prop
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0, //no need dy because we moving on x axis
    visible: true
}

//brick prop
const brick = {
    w: 70,
    h: 20,
    padding: 10, 
    offsetX: 45,
    offsetY: 60,
    visible: true
}

const createBricks = () => {
    for (let i = 0; i < brickRows; ++i){
        bricks[i] = []
        for (let j = 0; j < brickCols; ++j){
            const x = i * (brick.w + brick.padding) + brick.offsetX
            const y = j * (brick.h + brick.padding) + brick.offsetY
            bricks[i][j] = {x, y, ...brick}
        }
    }
}

const drawBricks = () => {
    bricks.forEach(colArr => {
        colArr.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? fillColor : 'transparent'
            ctx.fill()
            ctx.closePath()
        })
    })
}

const drawBall = () => {
    ctx.beginPath() //create a new path for ball
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2) //outer circle of ball
    ctx.fillStyle = ball.visible ? fillColor : 'transparent' //fill ball style
    ctx.fill()
    ctx.closePath()
}

const drawPaddle = () => {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = paddle.visible ? fillColor : 'transparent' 
    ctx.fill()
    ctx.closePath()
}

const drawScore = () => {
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

const movePaddle = () => {
    
    paddle.x += paddle.dx //in begin of the game the paddle won't be moved

    wallsPaddleDetect()
}

const wallsPaddleDetect = () => {
    //2 walls detection
    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w
    }

    if (paddle.x < 0) {
        paddle.x = 0
    }
}

const moveBall = () => {
    
    ball.x += ball.dx
    ball.y += ball.dy

    wallsBallDetect()

    ballPaddleCollisionDetect()

    ballBrickCollisionDetect()
    
}

const wallsBallDetect = () => {
    //4 walls detection

    //right - left
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
        //ball direction turn oppsite, ball touch in right wall - direction left, 
        //touch the right wall direction right
        ball.dx *= -1
    }

    //top - bottom
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0){
        ball.dy *= -1 //same as above with top and bottom
    }
}

const ballPaddleCollisionDetect = () => {
    //change direction after paddle collision
    if(ball.x - ball.size > paddle.x //left side
        && ball.x + ball.size < paddle.x + paddle.w //on paddle itself 
            && ball.y + ball.size > paddle.y //right side
            ) {
                ball.dy = -ball.speed
            }
}

const ballBrickCollisionDetect = () => {
    bricks.forEach(colArr => {
        colArr.forEach(brick => {
            if (brick.visible) {
                if (
                  ball.x - ball.size > brick.x && // left side 
                  ball.x + ball.size < brick.x + brick.w && // right side
                  ball.y + ball.size > brick.y && // top side
                  ball.y - ball.size < brick.y + brick.h // bottom side 
                ) {
                  ball.dy *= -1; //change direction
                  brick.visible = false;
        
                  increaseScore();
                }
              }
        })
    })

    checkIfMissAndGameLost()
}

const increaseScore = () => {
    ++score

    checkIfGameWon()
}

const checkIfGameWon = () => {
    if (score % (brickRows * brickCols) === 0){

        ball.visible = false
        paddle.visible = false  

        restartGame()
    }
}

const restartGame = () => {
    //restart game after 0.5s
    setTimeout(() => {

        showAllBricks()
        otherInitalizations()
    }, 5000)
}

const showAllBricks = () => {
    bricks.forEach(colArr => {
        colArr.forEach(brick => brick.visible = true)
    })
}

const otherInitalizations = () => {
    
    score = 0;
    paddle.x = canvas.width / 2 - 40;
    paddle.y = canvas.height - 20;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.visible = true;
    paddle.visible = true;
}

const checkIfMissAndGameLost = () => {
    
    if(ball.y + ball.size > canvas.height){
        showAllBricks()
        score = 0
    }
}

const drawBoard = () => {
    //clear canvas in each update and draw it from new
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawBall()
    drawPaddle()
    drawScore()
    drawBricks()
}

function update() {
    
    movePaddle()
    moveBall()

    drawBoard()

    requestAnimationFrame(update)
}

createBricks()
update()

const keyDown = (e) => {
    
    if(e.key === 'ArrowLeft' || e.key === 'Left'){
        paddle.dx = -paddle.speed
    }
    
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        paddle.dx = paddle.speed
    }
}

const keyUp = (e) => {
    if(e.key === 'ArrowLeft' || e.key === 'Left'
        || e.key === 'Right' || e.key === 'ArrowRight'){
            paddle.dx = 0    
        }
}

rulesBtn.addEventListener('click', () => rules.classList.add('show'))
closeBtn.addEventListener('click', () => rules.classList.remove('show'))
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)