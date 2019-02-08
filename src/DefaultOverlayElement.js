import React, {Component} from 'react';
import defaultImg from './default.png'


class DefaultOverlayElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img src={defaultImg} onClick={this.props.handleClick}/>
            </div>
        );
    }
}

export default DefaultOverlayElement