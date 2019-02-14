import  React, { Component } from 'react'

import categoryMenu from '../categoryMenu.css'

export default class ItemContainer extends Component {  
  state = { isHovered : false }

  setIsHovered = isHovered => this.setState({ isHovered })

  render(){
    const { children, key } = this.props
    const { isHovered } = this.state
    
    return (
      <li className={`${categoryMenu.itemContainer} flex items-center db list`} key={key}
          ref={e => { this.containerRef = e }}
          onMouseEnter={() => this.setState({ isHovered: true })}
          onMouseLeave={() => this.setState({ isHovered: false })}
      >
        {
          children({ 
            isHovered, 
            containerRef: this.containerRef, 
            setIsHovered: this.setIsHovered,
          })
        }
      </li>
    )
  }
}
