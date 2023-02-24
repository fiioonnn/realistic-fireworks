import * as Utils from "./utils.js";

class Particle {
	constructor(props = {}) {
		// Canvas
		this.canvas = props.canvas;
		this.ctx = props.ctx;
		// Style
		this.color = props.color || "255,255,255";
		this.size = props.size || Utils.randomInt(1, 3);
		this.opacity = props.opacity || 1;
		this.shineBlur = props.shine || 3;
		this.shineColor = props.shineColor || "255,0,0";
		// Text
		this.text = props.text || "";
		// Position
		this.x = props.x || 0;
		this.y = props.y || 0;
		// Characteristics
		this.spreadPower = props.spreadPower || 1;
		this.spreadPowerRatio = props.spreadPowerRatio || 1;
		// Velocity
		this.vx =
			((Math.random() - 0.5) * Utils.randomInt(1, this.spreadPower)) /
			Utils.randomInt(6, 10);
		// (((Math.random() - 0.5) * this.spreadPower) / 1.2) *
		// Utils.randomInt(1, this.spreadPower);
		this.vy =
			((Math.random() - 0.5) * Utils.randomInt(1, this.spreadPower)) /
			Utils.randomInt(6, 10);
		// (((Math.random() - 0.5) * this.spreadPower) / 1.2) *
		// Utils.randomInt(1, this.spreadPower);
		// States
		// Environment
		this.gravity = Utils.randomFloat(0.008, 0.03);
		this.windStrength = 0.2;
		this.blink = Utils.randomInt(0, 3) > 1 ? Math.random() * 2 : 0;
	}

	update() {
		// add trail
		this.wind = (Math.random() - 0.5) * this.windStrength;
		this.vy += this.gravity;
		this.y += this.vy;

		this.vx += this.wind;
		this.x += this.vx;

		// this.opacity -= Utils.randomFloat(0.01, 0.02);
		// this.size -= Utils.randomInt(0.02, 0.1);
		// this.gravity += 0.0001;
		this.size -= Utils.randomInt(0.02, 0.06);
		if (Utils.randomInt(0, 2) > 1) {
		}
		if (this.size < 0) this.size = 0;

		this.draw();
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.size, this.blink, Math.PI * 2);
		this.ctx.fillStyle = "rgba(" + this.color + ", " + this.opacity + ")";
		if (this.shineBlur > 0) {
			this.ctx.shadowColor = "rgb(" + this.shineColor + ")";
			this.ctx.shadowBlur = this.shineBlur;
		}
		this.ctx.fill();

		//draw text "fionn"
		if (this.text !== "") {
			this.ctx.font = "bold 30px Arial";
			this.ctx.fillStyle = "rgba(" + this.color + ", " + this.opacity + ")";
			this.ctx.fillText(this.text, this.x, this.y);
		}
	}
}

export default Particle;
