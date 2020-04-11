import React from 'react'
import TablePage from "../../../common/TablePage";
import {deleteUser, getUsers, restoreUser} from "../../../services/admin/UserAdminService";
import {bindActionCreators} from "redux";
import * as Actions from "../../../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../../../localization";
import {withSnackbar} from "notistack";
import {ListItemIcon, ListItemText, Menu, MenuItem, TableCell} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVert from '@material-ui/icons/MoreVert';
import UndoIcon from '@material-ui/icons/Undo';
import DeleteIcon from '@material-ui/icons/Delete';
import { getOrders, deleteOrder } from '../../../services/admin/OrderAdminService';


class CarModelList extends TablePage {

    tableDescription = [
        { key: 'description', label: strings.orderList.description },
        { key: 'price', label: strings.orderList.price },
        // { key: 'status', label: strings.orderList.status },
        { key: 'user', label: strings.orderList.user, transform: 'columnUserRender' }
    ];

    constructor(props) {
        super(props);

        this.state.showView = false;
        this.state.showAdd = false;
        this.state.showEdit = false;
    }

    columnUserRender(item) {

        if(!item) {
            return '';
        }

        return item.firstName + ' ' + item.lastName;
    }

    fetchData() {

        this.setState({
            lockTable: true
        });

        getOrders({
            page: this.state.searchData.page,
            perPage: this.state.searchData.perPage,
            search: this.state.searchData.search.toLowerCase()
        }).then(response => {

            if(!response.ok) {
                return;
            }

            this.setState({
                tableData: response.data.entities,
                total: response.data.total,
                lockTable: false
            });
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    getPageHeader() {
        return <h1>{ strings.carModelList.pageTitle }</h1>;
    }

    renderAddContent() {
        //return <AddCarModel onCancel={ this.onCancel } onFinish={ this.onFinish }/>
    }

    renderEditContent(item) {
        //return <EditCarModel onCancel={ this.onCancel } onFinish={ this.onFinish } data={ item }/>
    }

    delete(item) {

        this.setState({
            lockTable: true
        });

        deleteOrder(item.id).then(response => {

            if(response && !response.ok) {
                this.onFinish(null);
                return;
            }

            this.props.enqueueSnackbar(strings.userList.userDelete, { variant: 'success' });

            this.onFinish(item);
            this.cancelDelete();

            this.setState({
                lockTable: false
            });
        });
    }

    restore(item) {

        this.setState({
            lockTable: true
        });

        restoreUser(item.id).then(response => {

            if(response && !response.ok) {
                this.onFinish(null);
                return;
            }

            this.props.enqueueSnackbar(strings.userList.userRestored, { variant: 'success' });

            this.onFinish(item);

            this.setState({
                lockTable: false
            });
        });
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        changeFullScreen: Actions.changeFullScreen
    }, dispatch);
}

function mapStateToProps({ menuReducers })
{
    return { menu: menuReducers };
}

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(CarModelList)));