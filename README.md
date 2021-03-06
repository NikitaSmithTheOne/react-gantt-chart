![Logo](./media/logos/logo-1.png)

# react-gantt-chart

![npm](https://img.shields.io/npm/dm/react-gantt-chart)
![NPM](https://img.shields.io/npm/l/react-gantt-chart)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/NikitaSmithTheOne/react-gantt-chart/general_test/master?label=general%20testing)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/NikitaSmithTheOne/react-gantt-chart/node_versions_test/master?label=node%20testing)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/NikitaSmithTheOne/react-gantt-chart/storybook_deploy/master?label=storybook%20deploy)

React-Gantt-Chart allows you to create custom gantt charts with ease. No more nonsense!

## Installation

```
npm install --save react-gantt-chart
yarn add react-gantt-chart
pnpm add react-gantt-chart
```

## Features

- Easy to set up for real
- Super easy to customize 🔥
- RTL support
- Easy to create your own templates
- Small bundle size
- Support ESM and CJS
- Zero dependencies
- And much more!

## The gist

```ts
import React from "react";
import { GanttOriginal, Task, ViewMode } from "react-gantt-chart";

const App = () => {
	const [tasks] = React.useState<Task[]>([
		{
			type: "project",
			id: "ProjectSample",
			name: "1.Project",
			start: new Date(2021, 6, 1),
			end: new Date(2021, 9, 30),
			progress: 25,
			hideChildren: false,
		},
		{
			type: "task",
			id: "Task 0",
			name: "1.1 Task",
			start: new Date(2021, 6, 1),
			end: new Date(2021, 6, 30),
			progress: 45,
			project: "ProjectSample",
		},
		{
			type: "task",
			id: "Task 1",
			name: "1.2 Task",
			start: new Date(2021, 7, 1),
			end: new Date(2021, 7, 30),
			progress: 25,
			dependencies: ["Task 0"],
			project: "ProjectSample",
		},
		{
			type: "task",
			id: "Task 2",
			name: "1.3 Task",
			start: new Date(2021, 6, 1),
			end: new Date(2021, 7, 30),
			progress: 10,
			dependencies: ["Task 1"],
			project: "ProjectSample",
		},
		{
			type: "milestone",
			id: "Task 6",
			name: "1.3.1 MileStone (KT)",
			start: new Date(2021, 6, 1),
			end: new Date(2021, 6, 30),
			progress: 100,
			dependencies: ["Task 2"],
			project: "ProjectSample",
		},
	]);

	return (
		<GanttOriginal
			tasks={tasks}
			viewMode={ViewMode.Month}
			columnWidth={200}
			ganttHeight={200}
		/>
	);
};

export default App;
```

So easy! Is not it? ✨

`❗❗❗ Important Note: The package is not production ready yet! I believe within close future it'll be ready so now you can try this out and share your feedback. Thanks!`

## Demo

[A demo is worth a thousand words](https://react-gantt-chart.vercel.app/)

## Storybook

Check the [storybook](https://623c0a4c2ac802003a3dc7f6-hzojeuzxnz.chromatic.com/) to see all components!

## Contributing

Contributions are always welcome! Show your ❤️ and support by giving a ⭐.

Take a look at the contributing guide:

- [Fork](https://www.dataschool.io/how-to-contribute-on-github) the repository
- Run scripts

```
npm i
npm run lib:build -- -w
npm run lib:link
npm run start # check examples
npm run storybook # check storybook
```

So now you are ready to make the world better place!

## Roadmap

- Make more built-in gantt chart templates
- Simplify some components props and make the ones memoized

## Release Notes

You can browse them all [here](https://github.com/NikitaSmithTheOne/react-gantt-chart/releases)

## License

Licensed under [MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [@NikitaSmithTheOne](https://github.com/NikitaSmithTheOne)

## Alternative Logo

![Logo](./media/logos/logo-2.png)
