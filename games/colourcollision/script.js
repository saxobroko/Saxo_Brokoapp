console.clear()
function randomFloatFromRange(min, max){
	return (Math.random() * (max - min + 1) + min);
}
function randomFromArray(arr){
	return arr[Math.floor(Math.random() * arr.length)]
}
function getDist(x1, y1, x2, y2){
	return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
}
class Particle{
	constructor(canvas, ctx, x, y, radius, color, velX, velY){
		this.canvas = canvas
		this.ctx = ctx
		this.x = x
		this.y = y
		this.velocity = {
			x: (Math.random() - 0.5) * velX,
			y: (Math.random() - 0.5) * velY,
		}
		this.radius = radius
		this.color = color
		this.timeToLive = 250
		this.opacity = 1
		this.gravity = 0.25
	}
	draw(){ 
		this.ctx.save()
		this.ctx.beginPath()
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		this.ctx.fillStyle = this.color
		this.ctx.shadowColor = this.color
		this.shadowBlur = 25
		this.ctx.globalAlpha = this.opacity
		this.ctx.fill()
		this.ctx.closePath()
		this.ctx.restore()        
	}
	update(){ 
		this.x += this.velocity.x
		this.y += this.velocity.y
		this.velocity.y += this.gravity

		this.timeToLive -= 1
		this.opacity -= 1 / this.timeToLive
		this.draw()
	}
}
class Ball{
	constructor(canvas, ctx, x, y, radius, color, particlesArr, velX, velY, dontCheck){
		this.canvas = canvas
		this.ctx = ctx
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = {
			x: velX || 0,
			y: velY || 0
		}
		this.acc = 0.01
		this.origin = { x: x, y: y }
		this.dontCheck = dontCheck
		this.opacity = 1
		this.particlesArr = particlesArr
		this.collided = false
	}
	draw(){ 
		this.ctx.save()
		this.ctx.beginPath()
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		this.ctx.fillStyle = this.color
		this.ctx.shadowColor = this.color
		this.shadowBlur = 25
		this.ctx.shadowOffsetX = 0;
		this.ctx.shadowOffsetY = 0;
		this.ctx.globalAlpha = this.opacity
		this.ctx.fill()
		this.ctx.closePath()
		this.ctx.restore()
	}
	update(ballsArr, updateVel = false){
		if(this.origin.y <= 0){
			this.y += this.velocity.y
		}
		else if(this.origin.y >= this.canvas.height){
			this.y -= this.velocity.y
		}
		if(updateVel == true){
			this.y += this.velocity.y
			this.x += this.velocity.x
		}

		this.collisionDetect(ballsArr)
		this.draw()
	}
	collisionDetect(ballsArr){
		for(let i = 0; i < ballsArr.length; i++){
			if(this === ballsArr[i] || this.dontCheck) continue
			let distBetweenPoints = getDist(this.x, this.y, ballsArr[i].x, ballsArr[i].y) - this.radius * 2
			if(distBetweenPoints < 0){
				if(this.color == ballsArr[i].color){
					for(let j = 0; j < Math.floor(randomFloatFromRange(20, 25)); j++){
						this.break(this.particlesArr, 0.4, 0.8)
						this.collided = true
					}
					this.opacity = 0
				}
				else if(this.color != ballsArr[i].color){
					for(let j = 0; j < Math.floor(randomFloatFromRange(40, 55)); j++){
						ballsArr.forEach((ball) => {
							ball.opacity = 0
							this.break(this.particlesArr, 2, 5, ball.x, ball.y, ball.color)
						})
						this.particlesArr.forEach((particle) => {
							particle.gravity = 0
						})
					}
				}
			}
		}
	}
	edgeDetect(){
		if (this.y + this.radius + this.velocity.y > this.canvas.height) {
			this.velocity.y *= -1
		}
		else if(this.y - this.radius <= 0){
			this.velocity.y *= -1
		}

		if (this.x + this.radius + this.velocity.x > this.canvas.width) {
			this.velocity.x *= -1
		}
		else if (this.x - this.radius <= 0) {
			this.velocity.x *= -1
		}
	}
	break(arr, minRadius, maxRadius, x, y, c){
		var randRadius = randomFloatFromRange(minRadius, maxRadius)
		var randVel = {
			x: randomFloatFromRange(-20, 20),
			y: randomFloatFromRange(-20, 20),
		}
		if(this.origin.y <= 0){
			let spawnX , spawnY
			let color
			if(x && y){
				spawnX = x
				spawnY = y
				color = c
			}else{
				spawnX = this.x
				spawnY = this.y + this.radius
				color = this.color
			}
			arr.push(
				new Particle(
					this.canvas, this.ctx,
					spawnX, spawnY,
					randRadius, color , randVel.x, randVel.y
				)
			)
		}else{
			let spawnX , spawnY
			let color
			if(x && y){
				spawnX = x
				spawnY = y
				color = c
			}else{
				spawnX = this.x
				spawnY = this.y - this.radius
				color = this.color
			}
			arr.push(
				new Particle(
					this.canvas, this.ctx,
					spawnX, spawnY,
					randRadius, color , randVel.x, randVel.y
				)
			)
		}
	}
	change(colorDefault, colorTochange){
		if(this.color != colorDefault){
			this.color = colorDefault
		}else{
			this.color = colorTochange
		}
	}
}

Splitting()

const canvas = document.querySelector('[data-canvas]')
const ctx = canvas.getContext('2d')

let canvasHeight = innerHeight - 50,
	 canvasWidth = 400
canvas.width = canvasWidth
canvas.height = canvasHeight


var retryBtn = document.querySelector('.retry-btn')
var retryText = document.querySelector('.retry-text')
var playBtn = document.querySelector('.btn.play')
var startScreen = document.querySelector('.start-screen')



let balls = [], 
	 particles = []
var redBall, blueBall 
var separation = 35 
var globalRadius = 18 
let generateBall = false 
let timeInterval
let velocityOfBall
let failed = false 
let timer = 0 
let score = 0 
let fillColor 
var colors = ['#e74c3c', '#3498db']
var randPoints = [
	{
		x: canvas.width / 2,
		y: -50
	},
	{
		x: canvas.width / 2,
		y: canvas.height + 50
	}
]

function init(){
	balls = []
	particles = []
	uselessBalls = []
	generateBall = true
	timeInterval = 2000
	timer = 0
	velocityOfBall = 2.5
	score = 0
	fillColor = '#fff'

	blueBall = new Ball(
		canvas, ctx,
		canvasWidth/2, canvasHeight/2 - separation,
		globalRadius, colors[1], particles, 0, 0, true
	)
	redBall = new Ball(
		canvas, ctx,
		canvasWidth/2, canvasHeight/2 + separation,
		globalRadius, colors[0], particles, 0, 0, true
	)
	balls.push(redBall, blueBall)
}

var uselessBalls = []
function initUseless(){
	for(let i = 0; i < 20; i++){
		let randVelXY = {
			x: randomFloatFromRange(-5, 5),
			y: randomFloatFromRange(-5, 5)
		}
		let r = randomFloatFromRange(5, 10)
		uselessBalls.push(
			new Ball(
				canvas, ctx, canvasWidth / 2, canvasHeight / 2,
				r, colors[Math.floor(Math.random() * colors.length)],
				particles, randVelXY.x, randVelXY.y, true
			)
		)
	}
	balls.push([...uselessBalls])
}
initUseless()


var background = BG_Gradient('#2c3e50', '#34495e')

function loop(){
	requestAnimationFrame(loop)

	ctx.fillStyle = background
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	ctx.fillStyle = fillColor
	ctx.font = '21px sans-serif'
	ctx.fillText(`SCORE : ${score.toString()}`, 20, 35)

	uselessBalls.forEach(ball => {
		ball.update(balls, true)
		ball.edgeDetect()
	})
	if(uselessBalls.length != 0){
		return
	}

	if(balls.length != 0){
		balls.forEach((ball, index) => {
			ball.update(balls)
			if(ball.collided == true){
				score += 10
				fillColor = ball.color
			}
			if(ball.opacity <= 0){
				ball.dontCheck = true
				balls.splice(index, 1)
			}
		})
	}
	if(balls.length == 0 || balls.length == 1){
		failed = true
		generateBall = false
	}
	if(balls.length == 2){
		generateBall = true
	}
	if(timeInterval % timer == 0 && generateBall == true){
		generateBall = false
		pushNewBalls()
	}

	if(particles.length != 0){
		particles.forEach((particle, index) => {
			particle.update()
			if(particle.opacity <= 0.05){
				particles.splice(index, 1)
			}
		})
	}

	if(timer == 600){
		timer = 0
	}

	showHideOptions()
	timer++
}
loop()


function pushNewBalls(){
	var randomPoint = randomFromArray(randPoints),
		 randomColor = randomFromArray(colors)
	balls.push(
		new Ball(
			canvas, ctx,
			randomPoint.x, randomPoint.y,
			globalRadius, randomColor, particles, 0, velocityOfBall, false
		)
	)
}

function showHideOptions(){
	if(failed == true && generateBall == false){
		retryText.classList.remove('hide')
		retryText.classList.add('show')
		retryBtn.classList.remove('hide')
		retryBtn.classList.add('show')
	}else if(failed == false && generateBall == true){
		retryText.classList.add('hide')
		retryText.classList.remove('show')
		retryBtn.classList.add('hide')
		retryBtn.classList.remove('show')
	}
}

function BG_Gradient(color1, color2){
	let bg = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight)
	bg.addColorStop(0, color1)
	bg.addColorStop(1, color2)
	return bg
}

setInterval(() => {
	if(velocityOfBall <= 7){
		velocityOfBall += 0.08
	}else{
		velocityOfBall += 0
	}
}, 1500)

canvas.addEventListener('mousedown', () => {
	redBall.change(colors[0], colors[1])
	blueBall.change(colors[1], colors[0])
})

retryBtn.addEventListener('mousedown', () => {
	failed = false
	init()
})

playBtn.addEventListener('mousedown', () => {
	startScreen.classList.add('hide')
	init()
})

window.addEventListener('resize', () => {
	canvasHeight = innerHeight - 50
	canvas.height = canvasHeight
})