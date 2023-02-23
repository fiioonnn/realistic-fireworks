import * as Utils from "./utils.js";

class Trail {
	constructor(props = {}) {
		// Canvas
		this.canvas = props.canvas;
		this.ctx = props.ctx;
		// Style
		this.color = props.color || "222,123,18";
		this.size = props.size || 3;
		this.opacity = props.opacity || Math.random() * 3;
		this.shineBlur = props.shine || 5;
		this.shineColor = props.shineColor || "222,123,18";
		// Position
		this.x = props.x || 0;
		this.y = props.y || 0;
		// Characteristics
		this.multiplier = props.multiplier || 1;
		// Velocity
		this.vx = 0;
		this.vy = 0;
		// States
		// Environment
		this.gravity = props.multiplier * 0.01 || 0.01;
		this.windStrength = 0.3;
	}

	update() {
		this.wind = (Math.random() - 0.5) * this.windStrength;

		this.vy += this.gravity;
		this.y += this.vy;

		this.vx += this.wind;
		this.x += this.vx;

		this.opacity -= 0.02 * this.multiplier;
		this.size -= 0.4 * this.multiplier;
		this.windStrength *= this.windStrength + 0.5;

		if (this.size < 0) this.size = 0;

		this.draw();
	}

	draw() {
		// draw circle with opacity
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.size, Math.random() * 2, Math.PI * 2);
		this.ctx.fillStyle = "rgba(" + this.color + ", " + this.opacity + ")";
		if (this.shineBlur > 0) {
			this.ctx.shadowColor = "rgb(" + this.shineColor + ")";
			this.ctx.shadowBlur = this.shineBlur;
		}
		this.ctx.fill();
	}
}

export default Trail;
