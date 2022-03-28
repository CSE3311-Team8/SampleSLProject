# react-dropdown-button

> A carefully crafted drop-down button for React

[See drop-down demo.](http://zippyui.github.io/react-dropdown-button/)

## Install

```sh
$ npm install react-dropdown-button --save
```

## Description

The drop-down button uses two other React components:

 * [react-button](http://github.com/zippyui/react-button)
 * [react-menus](http://github.com/zippyui/react-menus)

It smartly places the drop-down menu to fit into the document. You can customize how the menu is aligned to the button. With one function, you can respond to a click in the menu at any nesting level.

Worth trying out, [see the demo page](http://zippyui.github.io/react-dropdown-button/).

## Changelog

See [Changelog](./CHANGELOG.md)

## Usage

```jsx

var DDButton = require('react-dropdown-button')

var saveItems = [
	{
		label: 'PDF'
	},
	'-', // a separator
	{
		label: '.DOCX'
	},
	{
		label: 'ODF',
		onClick: function(){
			console.log('save as ODF')
		}
	}
]

function onClick(event, itemProps){
	console.log('You clicked: ' + itemProps.data.label +
	 ' at index ' + itemProps.index)
}

<DDButton items={saveItems} onChildClick={onClick}>
	Save as
</DDButton>
```

Also see [zippyui/react-button](github.com/zippyui/react-button)


## Props

You have the same props as for the [react-button, so see docs](http://github.com/zippyui/react-button).
Besides the button specific props, you can specify the `items` prop as an array of objects to be passed to the menu component.

 * `items`: Array - an array of menu items for the menu of this drop-down button
 * `menuProps`: Object - props to be passed to the menu component
 * `menu`: ReactElement - instead of `menuProps`, you can directly pass in a menu instance
 * `onMenuClick`: Function(event, itemProps) - called when a menu item, at any nesting level has been clicked.

 	Takes the following args:

 	 * event - The click event
 	 * itemProps - an object which represents the props with which the menu item has been rendered. You can check `itemProps.index` to take the index of the item in it's parent menu.
 	 		If the drop-down button has been given a `items` array, the `itemProps` object also has a `data` property, which is the item object.

Besides this, every menu item can have an `onClick: Function` prop that is called when that item is clicked.

 * `alignPositions`: Array<String>/String - you can specify how you want the menu to be aligned to the button. By default, the align position is 'tl-bl', which means: align the top-left corner of the menu to the bottom-left corner of the button. Examples of valid values: `'br-tr'` - align the bottom-right of the menu to the top-right of the button; `'tl-tr'` - align the top-left of the menu to the top-right of the button.
 In case you specify an array of alignPositions, it will try all of those until one is found for which there is enough space in the document element. If, for example, the first position would render the menu outside the document, then the second position is used, and so on
 * `hideMenuOnClick`: Boolean - defaults to `true`, which means that when a menu item is clicked, the drop-down menu is hidden. Specify `false` if you don't want this behavior
 * `arrowPosition`: String - either `'right'` (the default), or `'left'`
 * `alignOffset`: Object({left, top}) - specify a different offset to align the menu to a different distance from the button.
 * `block`: Boolean - defaults to `false` - whether to render the button as block level.
 * `renderMenu: Boolean` - if you will specify false, the button will not render the drop-down menu. This can be useful if you choose to render the menu at a higher level, by using the `onMenuChange` callback prop
 * `onMenuChange: Function(menu, thisButton)` - called whenever the menu should be shown or hidden. NOTE: menu can either be a `ReactElement` or a null reference, depending on whether the menu should be displayed or not

The drop-down button contains two items: the button and the menu. Those items are wrapped inside a `<div>`, called the **wrapper**.

 * `wrapperFactory: Function(props)` - a factory function to return a wrapper around the button and the menu. If undefined is returned, it is assumed you just wanted to modify some wrapper props before rendering, and a `<div>` will be rendered with these props.
 * `wrapperStyle`: Object - a style object for the button wrapper
 * `wrapperProps`: Object - props to be applied to the wrapper

## Contributing

```sh
$ npm install
$ npm run dev # to start webpack-dev-server
$ npm run serve # to start http-server on port 9091
```

now navigate to [localhost:9091](http://localhost:9091)

## License

#### MIT