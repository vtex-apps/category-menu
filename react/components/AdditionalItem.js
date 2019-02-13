import  React, { Component } from 'react'

import categoryMenu from '../categoryMenu.css'

import ItemContainer from './ItemContainer'
import ItemTitle from './ItemTitle'
export default class AdditionalItem extends Component {
    
    state = { isHovered : false }

    renderChildren(){
      const { item: { children }, menuDisposition } = this.props

      return (
        <ItemContainer
          menuDisposition={menuDisposition}
          containerRef={this.item}
          showSecondLevel={children.some(child => child.children && child.children.length > 0)}
          items={children}
          isShowing={this.state.isHovered}
          onCloseMenu={() => this.setState({isHovered: false})}
        />
      )
    }

    render(){
      const { item, menuDisposition, isSelected } = this.props
      const { isHovered } = this.state
      
      return (
          <li className={`${categoryMenu.itemContainer} flex items-center db list`}
              ref={e => { this.item = e }}
              onMouseEnter={() => this.setState({ isHovered: true })}
              onMouseLeave={() => this.setState({ isHovered: false })}
          >
              <ItemTitle 
                item={item}
                menuDisposition={menuDisposition} 
                isSelected={isSelected} 
                showBorder={isHovered}
              />
              {this.renderChildren()}
          </li>
      )
    }
}