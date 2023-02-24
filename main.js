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
		launchSound();
		objects.push(
			new Firework({
				canvas,
				ctx,
				x: Utils.randomInt(canvas.width / 2 - 100, canvas.width / 2 + 100),
				size: 3,
				color: "255,255,255",
				shineColor: "255,255,255",
			})
		);
	}
};

let lastHighestObjectCount = 0;

function launchSound() {
	let sound = new Audio("sounds/launch.mp3");
	sound.volume = Utils.randomFloat(0.05, 0.2);
	sound.play();
	setTimeout(() => {
		sound = null;
	}, 10);
}
//! ---------------------------------------->>
// setInterval(() => {
// 	for (let index = 0; index < Utils.randomFloat(0, 6); index++) {
// 		objects.push(
// 			new Firework({
// 				canvas,
// 				ctx,
// 				color: "255,255,255",

// 				power: 70,
// 				x: Utils.randomInt(canvas.width / 2 - 100, canvas.width / 2 + 100),
// 				size: 3,
// 				shineColor: "255,255,255",
// 			})
// 		);
// 		launchSound();
// 	}
// }, 5000);
//
//! ---------------------------------------->>
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
	launchSound();

	setTimeout(() => {
		startRandomFirework();
	}, Utils.randomInt(400, 2000));
}

//! ---------------------------------------->>

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
					multiplier: Utils.randomFloat(0.3, 20),
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

	if (objects.length > lastHighestObjectCount) {
		lastHighestObjectCount = objects.length;
	}
	// // draw text with object count
	// ctx.fillStyle = "#ffffff";
	// ctx.shadowBlur = 0;
	// ctx.font = "60px Arial";
	// ctx.fillText(objects.length, 30, 60);
	// // draw text with highest object count
	// ctx.font = "30px Arial";
	// ctx.fillText("LHOC: " + lastHighestObjectCount, 30, 100);

	setTimeout(() => {
		loop();
	}, 1000 / 120);
}

loop();
