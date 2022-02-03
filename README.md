# react-calculatxr

![Size](https://img.shields.io/bundlephobia/minzip/react-calculatxr)
![Version](https://img.shields.io/npm/v/react-calculatxr)
![NPM License](https://img.shields.io/npm/l/react-calculatxr)

<p>A calculator similar to the windows calculator</p>

[Demo](https://user-images.githubusercontent.com/78156549/151799030-6313a56c-c50a-446e-9a7c-a6ef939db4ef.mp4)

## Install

```bash
npm install react-calculatxr --save
yarn add react-calculatxr
```

## Usage

```tsx
import { Calculator } from "react-calculatxr";
import "react-calculatxr/dist/react-calculatxr.css";

const Example = () => {
	return <Calculator />;
};
```

## Props

| Props     |  Type  | Required | Default |                                                                          Description |
| :-------- | :----: | :------: | :-----: | -----------------------------------------------------------------------------------: |
| className | String | Optional |  null   | You can provide a class you'd like to add to the calculator to add some styles to it |
