// *** NPM ***
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";

// *** OTHER ***
const packageJson = require("./package.json");

const rollupSetup = [
	{
		input: "src/lib/index.ts",
		output: [
			{
				file: packageJson.module,
				format: "esm",
				name: "react-gantt-chart",
			},
		],
		plugins: [
			external(),
			resolve(),
			commonjs(),
			typescript({ tsconfig: "./tsconfig.lib.json" }),
			terser(),
		],
	},
	{
		input: "library/types/index.d.ts",
		output: [{ file: "library/index.d.ts", format: "esm" }],
		plugins: [dts()],
	},
];

export default rollupSetup;
