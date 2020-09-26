# React Native Comp Util

Utility components for better react native development exerience.

## Features
- Pure JS, lightweight, works on Android, iOS and Web
- Helpful development logging method for CLI in ```__DEV__``` environment only
- Easy jQuery like ```ref``` helper method
- Wrapper around ```TouchableNativeFeedback``` for iOS and Web

## Installation

```
npm install react-native-comp-util
```

## Usage

```js
import { Component } from 'react'
import { View, Text } from 'react-native'

import { Comp, Compact, TouchableNativeFeedback } from 'react-native-comp-util'

class FirstComp extends Compact {
	someMethod() {
		// console.log() but with some helpful formatting for development CLI
		this.log('FirstComp.someMethod() was called')
	}
	render() {
		// super.render() call will prevent this component from updating later on
		super.render()
		return (
			<Text>Hello First Comp</Text>
		)
	}
}

class SecondComp extends Comp {
	onPress = () => {
		this.$firstComp.someMethod()
		// or use this way
		// this.$('firstComp').someMethod()
	}
	render() {
		return (
			// TouchableWithoutFeedback will be used on iOS and Web
			<TouchableNativeFeedback
				onPress={this.onPress}
				background={TouchableNativeFeedback.Ripple(`rgba(0,0,0,0.32)`, false)}
			>
				<View>
					<Text>Hello Second Comp</Text>
					<FirstComp ref={this.$$('firstComp')} />
				</View>
			</TouchableNativeFeedback>
		)
	}
}

export default SecondComp
```

## API

### ***Comp***
This class extends React's ```Component``` class with some useful methods.

```ts
log(...messages:any)
```
It is a formatted development logging method which is only prints logs in development builds (when ```__DEV__``` is true) and it is just an empty function otherwise. format includes the name of the component class, equal gap before messages and a collapsed stack trace on the web devTools.

```ts
rerender()
```
It is a method that calls ```forceUpdate()``` on the component

```ts
$$(refName:String):function
```
It creates a reference of a component instance when used like ```<View ref={this.$$('compName')}></View>``` on the component

```ts
$(refName:String):ComponentInstance
```
It returns a reference of a component instance created by ```$$('compName')``` which can be used like ```this.$compname.someMethod()``` or like ```this.$('compname').someMethod()```

```ts
_:Object
```
It contains the references created by ```$$('compName')```

### ***Compact***
This class extends ```Comp``` class with 2 additional methods.

```ts
render()
```
It sets property ```rendered = 1``` and increments property ```renderCount``` by 1 and this method is to be used like ```super.render()``` in the implemented render method.

```ts
shouldComponentUpdate():Boolean
```
It checkes ```rendered``` property and returns false if it is not equal to zero, which will prevent the component from updating.

### ***TouchableNativeFeedback***
On iOS and Web, it extends React Native's ```TouchableWithoutFeedback``` with static methods like ```Ripple()```, ```SelectableBackground()```, ```SelectableBackgroundBorderless()```, ```canUseNativeForeground()``` for compatibility with TouchableNativeFeedback usage.

