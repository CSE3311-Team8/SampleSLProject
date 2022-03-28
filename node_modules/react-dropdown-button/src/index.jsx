'use strict';

var React  = require('react')
var assign = require('object-assign')
var Button = require('react-button')

var cloneWithProps = React.cloneElement || require('react-clonewithprops')
var hasTouch       = require('has-touch')

var Menu   = require('react-menus')
var MenuFactory = React.createFactory(Menu)

function emptyFn(){}

var DISPLAY_NAME = 'ReactDropDownButton'

var THEME = assign({}, Button.themes)

THEME.default = assign({}, THEME.default, {
    openedStyle: {
        background: 'linear-gradient(to bottom, rgb(162,210,246) 0%,rgb(151,204,245) 50%,rgb(154,206,246) 100%)',
        color: 'white'
    }
})

var DropDownButton = React.createClass({

    displayName: DISPLAY_NAME,

    getInitialState: function(){
    	return {}
    },

    getDefaultProps: function(){
    	return {
            'data-display-name': DISPLAY_NAME,
            stopClickPropagation: false,
            hideMenuOnClick: true,
            smartArrowPadding: true,

    		defaultStyle: {
    			boxSizing: 'border-box',
    			verticalAlign: 'top',
				padding: 5
    		},

    		defaultArrowStyle: {
				display  : 'inline-block',
				boxSizing: 'border-box',
				fontSize : '0.8em'
    		},

    		defaultMenuStyle: {},

    		alignOffset: { left: 0, top: 1 },
    		enforceNonStatic: true,
    		arrowPosition: 'right'
    	}
    },

    render: function(){

    	var props = this.prepareProps(this.props, this.state)

        var button = <Button themes={this.constructor.themes} ref="button" {...props} />
        var menu   = this.state.menu

        var wrapperProps = this.prepareWrapperProps(props)
        wrapperProps.children = [button, menu]

        var defaultWrapperFactory = React.DOM.div
        var wrapperFactory = props.wrapperFactory || defaultWrapperFactory

        var wrapper = wrapperFactory(wrapperProps)

        if (wrapper === undefined){
            wrapper = defaultWrapperFactory(wrapperProps)
        }

        return wrapper?
                wrapper:
                button
    },

    onClick: function(props, event) {

        if (event && event.nativeEvent && event.nativeEvent.clickInsideMenu){
            //there was a click inside the menu,
            //so don't count that as a click in the button
            return
        }

        props.stopClickPropagation && event.stopPropagation()

        this.ignoreClick(function(){
            //in order to get picked up after the click event has propagated to the window
            this.toggleMenu(props)
        })
    },

    prepareWrapperProps: function(props) {
        var defaultWrapperStyle = {
            verticalAlign: 'top',
            display: props.block? 'block': 'inline-block'
        }

        var wrapperStyle = assign({}, defaultWrapperStyle, props.wrapperStyle)

        //enforce relative position so that menu gets rendered correctly
        wrapperStyle.position = wrapperStyle.position == 'absolute'? wrapperStyle.position: 'relative'
        wrapperStyle.overflow = 'visible'

        var wrapperProps = assign({
            style: wrapperStyle
        }, props.wrapperProps)

        return wrapperProps
    },

    prepareProps: function(thisProps, state) {
    	var props = assign({}, thisProps)

    	props.style = this.prepareStyle(props)
        props.addStateStyle = this.addStateStyle
    	props.renderChildren = this.renderChildren.bind(this, props)

        props.onClick = this.handleClick.bind(this, props)

    	return props
    },

    prepareStyle: function(props){

    	var style = assign({}, props.defaultStyle, props.style)

    	delete props.defaultStyle

    	return style
    },

    handleClick: function(props, event) {
        var args = [].slice.call(arguments, 1)

        ;(this.props.onClick || emptyFn).apply(null, args)

        this.onClick(props, event)
    },

    addStateStyle: function(names) {
        if (this.menu){
            names.push('openedStyle')
        }
    },

    renderChildren: function(props, children) {
    	var arrow = this.renderArrow(props)
    	var leftArrow
    	var rightArrow = arrow

    	if (props.arrowPosition != 'right'){
    		leftArrow = arrow
    		rightArrow = null
    	}

    	var children = [
            // this.state.menu,
    		leftArrow,
    		children,
    		rightArrow
    	]

        if (typeof this.props.renderChildren == 'function'){
            return this.props.renderChildren(children)
        }

        return children
    },

    renderArrow: function(props) {
    	var arrow = props.arrow

    	if (props.renderArrow){
    		arrow = props.renderArrow(props)
    	}

    	if (arrow === false){
    		return
    	}

    	return arrow || this.getDefaultArrow(props)
    },

    getDefaultArrow: function(props) {

    	var otherSide = props.arrowPosition != 'right'? 'Right': 'Left'

    	var defaultArrowStyle = props.defaultArrowStyle

        if (props.smartArrowPadding){
            defaultArrowStyle = assign({}, defaultArrowStyle)
        	defaultArrowStyle['padding' + otherSide] = props.style.padding
        }

    	var arrowStyle = assign({}, defaultArrowStyle, props.arrowStyle)

    	return <span style={arrowStyle}>▼</span>
    },

    toggleMenu: function(props) {
        if (this.menu){
            this.hideMenu()
        } else {
            this.showMenu(props)
        }
    },

    setMenu: function(menu) {

        this.menu = menu

        if (typeof this.props.onMenuChange == 'function'){
            this.props.onMenuChange(menu, this, this._rootNodeID)
        }

        if (this.props.renderMenu === false){
            return
        }

        this.setState({
            menu: menu
        })
    },

    showMenu: function(props) {
        var target = props.getAlignTarget?
                        props.getAlignTarget.call(this):
                        this.refs.button.getDOMNode()

        this.removeClickListener()

        window.addEventListener('click', this.clickEventListener = this.onDocumentClick)

        var menuProps = assign({}, props.menuProps)
        var menuStyle = assign({
			                    position: 'absolute',
			                    zIndex: 1
			                },
			                props.defaultMenuStyle,
			                menuProps.style,
			                props.menuStyle
		               )

        menuProps.style = menuStyle
        menuProps.alignPositions = props.alignPositions || menuProps.alignPositions || [
            'tl-bl',
            'tr-br',
            'bl-tl',
            'br-tr'
        ]

        var prevOnChildClick = menuProps.onChildClick

        assign(menuProps, {
            // onClick    : this.onMenuItemClick.bind(this, props),
			onChildClick    : this.onMenuChildClick.bind(this, props),
			alignOffset: props.alignOffset || menuProps.alignOffset,
			alignTo    : target,
			items      : menuProps.items || props.items
        })

        var menu

        if (props.menu){
            if (props.menu.props){
                prevOnChildClick = props.menu.props.onChildClick || prevOnChildClick
            }

            menu = cloneWithProps(props.menu, menuProps)
        } else {
            menu = typeof props.menuFactory == 'function'? props.menuFactory(menuProps): undefined

            if (menu === undefined && menuProps.items){
                menu = MenuFactory(menuProps)
            }
        }

        this.prevOnChildClick = prevOnChildClick

        this.setMenu(menu)
    },

    isExpanderClick: function(event) {
        if (
            hasTouch &&
            event &&
            ((event.nativeEvent && event.nativeEvent.expanderClick) || event.expanderClick)
        ){
            return true
        }

        return false
    },

    onDocumentClick: function(event) {
        if (
            this.ignoreWindowClick ||
            this.isExpanderClick(event)
        ){
            return
        }

        this.hideMenu()
    },

    componentWillUnmount: function(){
        this.removeClickListener()
        this.setMenu(false)
    },

    removeClickListener: function() {
        if (this.clickEventListener){
            window.removeEventListener('click', this.clickEventListener)
            this.clickEventListener = null
        }
    },

    hideMenu: function() {
        if (this.menu){
            this.removeClickListener()
            this.setMenu(false)
        }
    },

    onMenuChildClick: function(props, event, itemProps) {

        if (itemProps === undefined){
            //default click event propagated, not called by the menu cmp
            return
        }

        if (this.isExpanderClick(event)){
            return
        }

        if (typeof this.prevOnChildClick == 'function'){
        	this.prevOnChildClick(event, itemProps)
        }

        event.nativeEvent.clickInsideMenu = true

        ;(this.props.onMenuClick || emptyFn)(event, itemProps)

        if (!this.props.hideMenuOnClick || event.nativeEvent.hideMenu === false || (itemProps && itemProps.data && itemProps.data.hideMenu === false)){
            this.ignoreClick()
        } else {
            //when menu is hidden, mouseleave from button is not triggered, so we trigger it manually
            this.menu && this.refs.button && this.refs.button.handleMouseLeave(props, event)
            this.hideMenu()
        }
    },

    ignoreClick: function(callback) {
        this.ignoreWindowClick = true

        setTimeout(function(){
            this.ignoreWindowClick = false
            typeof callback == 'function' && callback.call(this)
        }.bind(this), 0)
    }
})

DropDownButton.themes = THEME

module.exports = DropDownButton