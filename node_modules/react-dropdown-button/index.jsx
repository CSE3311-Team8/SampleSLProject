'use strict';

var React    = require('react')
var DDButton = require('./src')
var Button   = require('react-button')
var Menu     = require('react-menus/src')

var saveItems = [
    {
        label: 'Text'
    },
    {
        label: 'PDF'
    },
    {
        label: 'Office',
        items: [
            {
                label: 'MS Office'
            },
            {
                label: 'Open Office'
            }
        ]
    }
]

function saveAsClick(event, itemProps){
    console.log('Clicked: ', itemProps.data.label, ' at index ', itemProps.index)
}

var exportItems = [
    {
        label: 'As PDF',
        onClick: function(){
            console.log('Export as PDF!')
        }
    },
    '-',
    {
        label: 'As Proprietary',
        items: [
            {
                label: 'Office',
                items: [
                    {
                        label: 'MS Office'
                    },
                    {
                        label: 'Open Office'
                    }
                ]
            }
        ]
    }
]

var importItems = [
    {
        label: 'From CSV'
    },
    {
        label: 'From Excel',
        disabled: true
    },
    {
        label: 'From text'
    }
]

var openMenu = <Menu >
        <Menu.Item>
            <Menu.Item.Cell>Open later</Menu.Item.Cell>
        </Menu.Item>

        <Menu.Item>
            <Menu.Item.Cell>Open image</Menu.Item.Cell>
        </Menu.Item>
    </Menu>


var App = React.createClass({
    render: function() {

        function onClick(){
            console.log('clicked', arguments);
        }
        return (
            <div className="App" style={{padding: 10, marginTop: 300}}>
                <DDButton arrowPosition="left" items={saveItems} onMenuClick={saveAsClick} onClick={onClick}>
                    Save as
                </DDButton>

                <DDButton items={exportItems} alignPositions={'br-tr'}>
                    Export
                </DDButton>

                <DDButton disabled>Download - disabled</DDButton>
                <DDButton items={importItems}>Import</DDButton>
                <DDButton menu={openMenu}>Open</DDButton>
            </div>
        )
    }
})

React.render(<App />, document.getElementById('content'))