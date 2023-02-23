import * as Utils from "./utils.js";

class Particle {
	constructor(props = {}) {
		// Canvas
		this.canvas = props.canvas;
		this.ctx = props.ctx;
		// Style
		this.color = props.color || "255,255,255";
		this.size = props.size || 2;
		this.opacity = props.opacity || 1;
		this.shineBlur = props.shine || 3;
		this.shineColor = props.shineColor || "255,0,0";
		// Position
		this.x = props.x || 0;
		this.y = props.y || 0;
		// Characteristics
		this.spreadPower = props.spreadPower || 1;
		// Velocity
		this.vx =
			(((Math.random() - 0.5) * this.spreadPower) / 1.2) *
			Utils.randomInt(1, 12);
		this.vy =
			(((Math.random() - 0.5) * this.spreadPower) / 1.2) *
			Utils.randomInt(1, 12);
		// States
		// Environment
		this.gravity = 0.01;
		this.windStrength = 0.3;
	}

	update() {
		// add trail
		this.wind = (Math.random() - 0.5) * this.windStrength;
		this.vy += this.gravity;
		this.y += this.vy;

		this.vx += this.wind;
		this.x += this.vx;

		this.opacity -= Utils.randomInt(0.01, 0.03);
		this.size -= Utils.randomInt(0.05, 0.08);
		this.gravity += 0.0001;

		if (this.size < 0) this.size = 0;

		this.draw();
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.size, Math.random() * 2, Math.PI * 2);
		this.ctx.fillStyle = "rgba(" + this.color + ", " + this.opacity + ")";
		if (this.shineBlur > 0) {
			this.ctx.shadowColor = "rgb(" + this.shineColor + ")";
			this.ctx.shadowBlur = this.shineBlur;
		}
		this.ctx.fill();

		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		this.ctx.lineTo(this.x + this.vx, this.y + this.vy);
		this.ctx.strokeStyle = "rgba(" + this.color + ", " + this.opacity + ")";
		this.ctx.stroke();
	}
}

export default Particle;
