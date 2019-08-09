'use strict';
const childProcess = require('child_process');
const {dialog, shell} = require('electron');
const appExists = require('app-exists');

const gifskiBundleId = 'com.sindresorhus.Gifski';

const action = async context => {
	const isGifskiInstalled = await appExists(gifskiBundleId);
	if (!isGifskiInstalled) {
		const {response: buttonIndex} = await dialog.showMessageBox({
			message: 'The kap-gifski plugin requires the Gifski app, but the app was not found.',
			buttons: [
				'Get Gifski',
				'Cancel'
			]
		});

		if (buttonIndex === 0) {
			await shell.openExternal('https://github.com/sindresorhus/Gifski');
		}

		context.cancel();
		return;
	}

	const filePath = await context.filePath({fileType: 'mp4'});

	childProcess.spawn('open', ['-b', gifskiBundleId, filePath]);
};

const gifski = {
	title: 'Export With Gifski',
	formats: [
		'gif'
	],
	action
};

exports.shareServices = [gifski];
