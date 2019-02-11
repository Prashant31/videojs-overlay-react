import React, {Component} from 'react';
import defaultImg from './default.png'


class DefaultOverlayElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleClick: ()=> {console.log("ClickHandler")}
        }
    }

    render() {
        return (
            <div>
                <img src={defaultImg} onClick={this.state.handleClick}/>
            </div>
        );
    }
}

export default DefaultOverlayElement