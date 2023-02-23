import Firework from "./firework.class.js";
import Trail from "./trail.class.js";
import Particle from "./particle.class.js";
import * as Utils from "./utils.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.style.margin = "0";
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.display = "block";

let objects = [];

let colors = [
	"255,255,255",
	"255,255,0",
	"255,0,255",
	"0,255,255",
	"255,0,0",
	"0,255,0",
	"0,0,255",
];

document.onkeydown = (e) => {
	if (e.key === " ") {
		objects.push(
			new Firework({
				canvas,
				ctx,
				x: Utils.randomInt(canvas.width / 2 - 100, canvas.width / 2 + 100),
				size: 3,
				color: "255,255,255",
				shineColor: colors[Utils.randomInt(0, colors.length - 1)],
			})
		);
	}
};

startRandomFirework();
function startRandomFirework() {
	objects.push(
		new Firework({
			canvas,
			ctx,
			x: Utils.randomInt(canvas.width / 2 - 100, canvas.width / 2 + 100),
			size: 3,
			color: "255,255,255",

			shineColor: colors[Utils.randomInt(0, colors.length - 1)],
		})
	);

	setTimeout(() => {
		startRandomFirework();
	}, Utils.randomInt(10, 6000));
}

function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	objects.forEach((object) => {
		if (Utils.checkDeath(object, canvas)) {
			objects.splice(objects.indexOf(object), 1);
		}

		if (object instanceof Particle) {
			objects.push(
				new Trail({
					canvas,
					ctx,
					x: object.x,
					y: object.y,
					color: object.color,
					shineColor: object.shineColor,
					multiplier: Utils.randomFloat(0.05, 20),
				})
			);
		}

		object?.update(() => {
			objects.push(
				new Trail({
					canvas,
					ctx,
					x: object.x,
					y: object.y,
					color: object.color,
					shineColor: object.shineColor,
				})
			);

			if (object instanceof Firework) {
				if (object.isExploding && !object.exploded) {
					object.exploded = true;
					for (let i = 0; i < object.particles; i++) {
						objects.push(
							new Particle({
								canvas,
								ctx,
								x: object.x,
								y: object.y,
								shineColor: "255,25,25",
								shineColor: object.shineColor,
								explosionPower: object.explosionPower,
							})
						);
					}
				}
			}
			// object = firework
		});
	});

	if (objects.length > 5000) {
		objects = [];
	}

	requestAnimationFrame(loop);
}

loop();

// const canvas = document.createElement("canvas");
// const ctx = canvas.getContext("2d");

// const Core = function () {
// 	this.config = {
// 		debug: true,
// 		background: "transparent",
// 		prefix: "[cENV]",
// 	};

// 	this.init = function () {
// 		this.canvas = null;
// 		this.ctx = null;

// 		this.setStatus(0);
// 		this.debug();
// 		this.buildCanvas();
// 		this.clearCanvas();
// 	};

// 	this.debug = function () {
// 		if (!this.config.debug) return;
// 		this.config.background = "red";
// 	};

// 	this.buildCanvas = function () {
// 		this.canvas = document.createElement("canvas");
// 		this.ctx = canvas.getContext("2d");
// 		// Append to body
// 		document.body.appendChild(canvas);
// 		// Configure canvas
// 		canvas.width = document.body.clientWidth;
// 		canvas.height = document.body.clientHeight;
// 		canvas.style.display = "block";
// 		this.setStatus(1);
// 	};

// 	this.clearCanvas = function () {
// 		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
// 		this.ctx.fillStyle = this.config.background;
// 		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
// 		this.setStatus(2);
// 	};

// 	this.setStatus = function (id) {
// 		let statusList = {
// 			0: "Debug mode: ON",
// 			1: "Canvas build!",
// 			2: "Canvas cleared.",
// 			3: "Loop started!",
// 			4: "Callback ´create´ executed!",
// 			5: "Callback `update` started!",
// 		};

// 		if (!this.config.debug) return;

// 		console.log(
// 			"%c" + this.config.prefix + " " + Object.values(statusList)[id],
// 			"color: #4287f5;"
// 		);
// 	};
// };

// const core = new Core();
// core.init();
