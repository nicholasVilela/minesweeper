import React, { Component } from 'react';

class Cell extends Component {
    render() {
        return (
            <>
              <td className='cell'
               onContextMenu={e => {
                   this.props.rightClick()
                   e.preventDefault()
               }}
               onClick={this.props.onClick}>
                {this.props.display}
               </td>
            </>
        );
    }
}

export default Cell