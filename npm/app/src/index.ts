#!/usr/bin/env node

import {spawnSync} from "node:child_process";

/**
 * Retrieves the executable path based on the current platform and architecture.
 * @returns The path to the executable file.
 * @throws {Error} If the platform or architecture is not supported.
 */
function getExePath() {
	const arch = process.arch;
	let os = process.platform as string;
	let extension = "";
	if ([ "win32", "cygwin" ].includes(os)) {
		os = "windows";
		extension = ".exe";
	}

	try {
		return require.resolve(`app-${os}-${arch}/bin/app${extension}`);
	} catch (e) {
		throw new Error(`Unsupported platform: ${os}-${arch}`);
	}
}

/**
 * Runs the application.
 */
function run() {
	const args = process.argv.slice(2);
	const processResult = spawnSync(getExePath(), args, { stdio: "inherit" });
	process.exit(processResult.status ?? 0);
}

run();
