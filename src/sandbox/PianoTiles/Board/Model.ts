import Board from '.';
import Game from '../../../game';

export const render = (canvas: Game['canvas'], instance: Board) => {
	canvas.stroke(0, 150, 255);
	canvas.rectMode('center');

	/**
	 * Lines of the fretboard
	 */
	[
		[0, 50],
		[50, 80],
		[100, 110],
		[150, 140],
		[200, 170],
		[250, 200]
	].forEach((pos) => {
		canvas.line(pos[0], 250, pos[1], 0);
	});

	/**
	 * Hitwindow
	 */
	instance.hitPos.forEach((pos) => {
		canvas.ellipse(pos, instance.hitWindowHeight, 32, 35);
	});

	/**
	 * Hitwindow detail
	 */
	canvas.fill(0);
	instance.hitPos.forEach((pos) => {
		canvas.ellipse(pos, instance.hitWindowHeight, 27, 29);
	});

	instance.startingPos.forEach((pos) => {
		canvas.rect(-5, pos, 10, 10);
	});
};
