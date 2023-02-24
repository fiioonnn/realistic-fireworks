//! TODO » More sounds
//! TODO » Randomize sounds

import * as Utils from "./utils.js";

class Firework {
	constructor(props = {}) {
		// Canvas
		this.canvas = props.canvas;
		this.ctx = props.ctx;
		// Style
		this.color = props.color || "0,0,0";
		this.size = props.size || 3;
		this.opacity = props.opacity || 1;
		this.shineBlur = props.shineBlur || 50;
		this.shineColor = props.shineColor || "#ffffff";
		// Position
		this.x = props.x || this.canvas.width / 2 - this.size;
		this.y = props.y || this.canvas.height - this.size;
		// Power
		this.minPower = props.minPower || 3;
		this.maxPower = props.maxPower || 70;
		this.power = props.power || Utils.randomInt(this.minPower, this.maxPower);
		this.powerRatio = Math.floor((this.power * 100) / this.maxPower) / 100;
		// Sound
		this.soundVolume = props.soundVolume || 0.5;
		this.soundVolume = this.powerRatio;
		// Characteristics
		this.particles = props.particles || Utils.randomInt(10, 100);
		this.force = props.force || 8.5;
		this.text = props.text || "";
		// Velocity
		this.vx = 0;
		this.vy = -(Math.random() * 3) - this.force;
		// States
		this.exploded = false;
		this.isExploding = false;
		this.trails = [];
		this.soundPlayed = false;
		// Environment
		this.gravity = 0.1;
		this.wind = Utils.randomFloat(0.1, 0.5);
		// Sounds
		this.sounds = {
			"explosion-1": "sounds/explosion-1.mp3",
			"explosion-2": "sounds/explosion-2.mp3",
		};
		console.log(this.power, this.powerRatio);
	}

	explosion() {
		let oldShineColor = this.shineColor;
		this.shineColor = "255,255,255";
		this.size = this.power / 2.5;
		this.shineColor = oldShineColor;
		this.isExploding = true;
		this.color = "255,255,255";

		setTimeout(() => {
			this.size = 0;
		}, 10);
		//! put this in extra function
		if (this.soundPlayed) return;
		this.soundPlayed = true;
		this.playSound("explosion-1");
	}

	update(callback) {
		this.vy += this.gravity;
		this.y += this.vy;

		this.vx += (Math.random() - 0.5) * this.wind;
		this.x += this.vx;

		this.windStrength *= this.windStrength + 0.05;

		if (this.vy >= Utils.randomInt(-1, 10)) {
			this.explosion();
		}

		this.draw();

		if (typeof callback === "function") callback.bind(this)();
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		this.ctx.fillStyle = "rgba(" + this.color + ", " + this.opacity + ")";
		if (this.shineBlur > 0) {
			this.ctx.shadowColor = "rgb(" + this.shineColor + ")";
			this.ctx.shadowBlur = this.shineBlur;
		}
		this.ctx.fill();
	}

	playSound(soundName) {
		let sound = new Audio(this.sounds[soundName]);
		sound.volume = this.soundVolume;
		sound.play();
		setTimeout(() => {
			sound = null;
		}, 10);
	}
}

export default Firework;
