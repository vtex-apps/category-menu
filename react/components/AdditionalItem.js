import  React, { Component } from 'react'
import { Link } from 'vtex.render-runtime'
import classNames from 'classnames'

import categoryMenu from '../categoryMenu.css'
import categoryMenuDisposition from '../utils/categoryMenuDisposition'

import ItemContainer from './ItemContainer'

export default class AdditionalItem extends Component {
    
    state = { isHovered : false }

    renderTitle(){        
        const { item: { name, slug }, menuDisposition, isSelected } = this.props
        const { isHovered } = this.state

        const categoryClasses = classNames(
          'w-100 pv5 no-underline t-small outline-0 db tc ttu link truncate bb bw1 c-muted-1', {
            'b--transparent': !isHovered && !isSelected,
            'b--action-primary pointer': isHovered || isSelected,
            'mr8': menuDisposition === categoryMenuDisposition.DISPLAY_LEFT.value,
            'ml8': menuDisposition === categoryMenuDisposition.DISPLAY_RIGHT.value,
            'mh6': menuDisposition === categoryMenuDisposition.DISPLAY_CENTER.value,
          }
        )

        return slug ? (
          <Link
            onClick={this.handleCloseMenu}
            to={slug}
            className={categoryClasses}
          >
            {name.toUpperCase()}
          </Link> 
        ) : (
          <span className={categoryClasses}>
            {name.toUpperCase()}
          </span>
        )
    }

    renderChildren(){
      const { item: { children }, menuDisposition } = this.props
      const { isHovered } = this.state
    
      const containerStyle = {
        top: this.item && this.item.offsetTop + this.item.clientHeight,
        display: isHovered ? 'flex' : 'none',
      }

      return children && children.length > 0 && (
        <ItemContainer
          menuDisposition={menuDisposition}
          containerStyle={containerStyle}
          items={children}
          onCloseMenu={() => this.setState({isHovered: false})}
        />
      )
    }

    render(){
        return (
            <li className={`${categoryMenu.itemContainer} flex items-center db list`}
                ref={e => { this.item = e }}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                {this.renderTitle()}
                {this.renderChildren()}
            </li>
        )
    }
}