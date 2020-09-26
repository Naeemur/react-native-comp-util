const React = require('react'), {
	Component
} = React;
let {
	TouchableWithoutFeedback,
	TouchableNativeFeedback,
	Platform,
} = require('react-native');

class Comp extends Component {
	constructor(...args) {
		super(...args)
		this._ = {}
		this.$ = (id) => (this._[id])
		this.$$ = (id) => (ref => { this._[id] = ref; this['$'+id] = ref; })
		// Dimensions.addEventListener('change', (dim) => this.dimension(dim))
	}
	// componentWillMount() {}
	// componentDidMount() {}
	// componentWillUnmount() {}
	log(...args) {}
	// dimension(dim) {}
	rerender() {
		this.forceUpdate()
	}
}

if(typeof __DEV__ != 'undefined' && __DEV__) {
	Comp = class extends Comp {
		log(...args) {
			let pre = this.constructor.name+' '+('-'.repeat(Math.max(0,17-this.constructor.name.length)))+'►'
			return console.log(pre,...args)+console.groupCollapsed('···')+console.trace(pre)+console.groupEnd()
		}
	}
}

class Compact extends Comp {
	constructor(...args) {
		super(...args)
		this.renderCount = 0
		this.rendered = 0
	}
	shouldComponentUpdate() {
		if(this.rendered > 0) return false
		else return true
	}
	render() {
		this.rendered = 1
		this.renderCount++
	}
}

class TouchableNativeFeedbackMock extends TouchableWithoutFeedback {
	static Ripple(c,f) {
		return c
	}
	static SelectableBackground() {
		return '#000'
	}
	static SelectableBackgroundBorderless() {
		return '#000'
	}
	static canUseNativeForeground() {
		return true
	}
}

TouchableNativeFeedback = Platform.select({
	android: TouchableNativeFeedback,
	default: TouchableNativeFeedbackMock,
})

class TNF extends TouchableNativeFeedback {
	static defaultProps = {
		...TouchableNativeFeedback.defaultProps,
		background: TouchableNativeFeedback.Ripple(`rgba(0,0,0,${0.32})`,false),
	}
}

TouchableNativeFeedback = TNF

module.exports = { Comp, Compact, TouchableNativeFeedback }