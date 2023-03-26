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

let colors = ["255,255,255", "222, 93, 38", "0, 255, 0", "255, 0, 0"];

function addFirework(options) {
	objects.push(
		new Firework({
			canvas,
			ctx,
			x: canvas.width / 2,
			...options,
		})
	);
	launchSound();
}

let power = 0;
let color = "0,0,0";
//colors[Utils.randomInt(0, colors.length - 1)]
document.onkeydown = (e) => {
	if (e.key === "1") {
		power = 5;
		color = "255,0,0";
	}
	if (e.key === "2") {
		power = 30;
		color = "255,0,0";
	}
	if (e.key === "3") {
		power = 80;
		color = "255,255,255";
	}
	if (e.key === "4") {
		power = 80;
		color = "0,255,0";
	}
	if (e.key === "5") {
		power = 80;
		color = "0,0,255";
	}
	if (e.key === "6") {
		power = 80;
		color = "255,0,0";
	}
	if (e.key === "7") {
		power = 15;
		color = "255,0,255";
	}
	if (e.key === "8") {
		power = 80;
		color = "255,0,255";
	}

	addFirework({
		power: power,
		shineColor: color,
		gravity: 0.001,
	});
};

function launchSound() {
	let sound = new Audio("sounds/launch.mp3");
	sound.volume = Utils.randomFloat(0.05, 0.2);
	sound.play();
	setTimeout(() => {
		sound = null;
	}, 10);
}

// startRandomFirework();
function startRandomFirework() {
	objects.push(
		new Firework({
			canvas,
			ctx,
			x: canvas.width / 2,
			size: 3,
			color: "255,255,255",
			gravity: 1,
			shineColor: colors[Utils.randomInt(0, colors.length - 1)],
		})
	);
	launchSound();

	for (let i = 0; i < Utils.randomInt(-10, 6); i++) {
		objects.push(
			new Firework({
				canvas,
				ctx,
				x: canvas.width / 2,
				size: 3,
				color: "255,255,255",
				gravity: 1,
				shineColor: colors[Utils.randomInt(0, colors.length - 1)],
			})
		);
		launchSound();
	}

	setTimeout(() => {
		startRandomFirework();
	}, Utils.randomInt(200, 6000));
}

//! ---------------------------------------->>
console.log(Utils.randomFloat(0.02, 4));
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
					multiplier: Utils.randomFloat(0.1, 4),
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
								text: object.text,
								shineColor: object.shineColor,
								spreadPower: object.power,
								spreadPowerRatio: object.powerRatio,
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

	// ! DEBUG
	// // draw text with object count
	// ctx.fillStyle = "#ffffff";
	// ctx.shadowBlur = 0;
	// ctx.font = "60px Arial";
	// ctx.fillText(objects.length, 30, 60);
	// // draw text with highest object count
	// ctx.font = "30px Arial";
	// ctx.fillText("LHOC: " + lastHighestObjectCount, 30, 100);
	requestAnimationFrame(loop);
	// setTimeout(() => {
	// 	loop();
	// }, 1000 / 120);
}

loop();
