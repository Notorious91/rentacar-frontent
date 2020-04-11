import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import MenuState from "../constants/MenuState";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {Drawer} from "@material-ui/core";

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {

            submenu: {
                example: false
            }
        };
    }

    componentWillReceiveProps(props) {
        console.log(this.props.auth);
    }

    getNavigationClass() {

        if(this.props.menu.state === MenuState.SHORT) {
            return 'navigation-content-container short';
        }
        else {
            return 'navigation-content-container'
        }
    }

    isCurrentPath(path) {

        return this.props.history.location.pathname == path;
    }

    toggleSubmenu(key) {

        let submenu = this.state.submenu;

        submenu[key] = !submenu[key];

        this.setState({
            submenu: submenu
        });
    }

    isAdmin() {
        return this.props.auth.user && this.props.auth.user.admin;
    }

    render() {
        
        return (
            <Drawer variant="permanent" id='navigation'>

                <div className={ this.getNavigationClass() }>
                    <div className='logo-container'>

                        <div className='logo'>
                            <SendIcon/>
                        </div>
                        <div className='title'>
                            <h2>Some Title</h2>
                        </div>
                    </div>
                    <List component="nav">
                        {
                            this.isAdmin() &&
                            <React.Fragment>
                                <Link to={'/users'} className={ this.isCurrentPath('/users') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>

                                        <ListItemIcon className='navigation-icon'>
                                            <SendIcon/>
                                        </ListItemIcon>

                                        <ListItemText inset primary='Users' className='navigation-text'/>

                                    </ListItem>
                                </Link>
                                <Link to={'/carCategories'} className={ this.isCurrentPath('/carCategories') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>

                                        <ListItemIcon className='navigation-icon'>
                                            <SendIcon/>
                                        </ListItemIcon>

                                        <ListItemText inset primary='Car categories' className='navigation-text'/>

                                    </ListItem>
                                </Link>
                                <Link to={'/carModels'} className={ this.isCurrentPath('/carModels') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>

                                        <ListItemIcon className='navigation-icon'>
                                            <SendIcon/>
                                        </ListItemIcon>

                                        <ListItemText inset primary='Car models' className='navigation-text'/>

                                    </ListItem>
                                </Link>
                                
                            </React.Fragment>
                        }

                        <Link to={'/cars'} className={ this.isCurrentPath('/cars') ? 'navigation-link active' : 'navigation-link'} >
                            <ListItem className='navigation-item'>

                                <ListItemIcon className='navigation-icon'>
                                    <SendIcon/>
                                </ListItemIcon>

                                <ListItemText inset primary='Cars' className='navigation-text'/>

                            </ListItem>
                        </Link>

                        <Link to={'/parts'} className={ this.isCurrentPath('/parts') ? 'navigation-link active' : 'navigation-link'} >
                            <ListItem className='navigation-item'>

                                <ListItemIcon className='navigation-icon'>
                                    <SendIcon/>
                                </ListItemIcon>

                                <ListItemText inset primary='Parts' className='navigation-text'/>

                            </ListItem>
                        </Link>

                        <Link to={'/orders'} className={ this.isCurrentPath('/orders') ? 'navigation-link active' : 'navigation-link'} >
                            <ListItem className='navigation-item'>

                                <ListItemIcon className='navigation-icon'>
                                    <SendIcon/>
                                </ListItemIcon>

                                <ListItemText inset primary='Orders' className='navigation-text'/>

                            </ListItem>
                        </Link>
                        
                    </List>
                </div>



            </Drawer>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ menuReducers, authReducers })
{
    return { menu: menuReducers, auth: authReducers };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));