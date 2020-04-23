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
import { getCarModels } from '../../../services/admin/CarModelAdminService';
import { getCars, deleteCars } from '../../../services/admin/UserCarService';
import AddCar from './AddCar';
import EditCar from './EditCar';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { addOrder } from '../../../services/admin/OrderAdminService';


class CarList extends TablePage {

    tableDescription = [
        { key: 'licencePlate', label: strings.carList.licencePlate },
        { key: 'price', label: strings.carList.price },
        { key: 'model', label: strings.carList.model , transform: 'columnCarModelRender' },
        { key: 'category', label: strings.carList.category, transform: 'columnCarCategoryRender' },
        { key: 'image', label: strings.carList.image, transform: 'columnImageRender' },
    ];

    constructor(props) {
        super(props);

        this.state.showView = false;
    }

    columnImageRender(item) {
        return <img src={'data:image/png;base64,' + item} style={{ width: '200px' }}/>
    }

    columnCarModelRender(item) {
        return item ? item.name : '';
    }

    columnCarCategoryRender(item) {
        return item ? item.name : '';
    }

    componentDidMount() {

        this.state.showAdd = this.props.auth.user.admin;
        this.state.showEdit = this.props.auth.user.admin;
        this.state.showDelete = this.props.auth.user.admin;
        this.fetchData();
    }

    componentWillReceiveProps(props) {
        this.state.showAdd = this.props.auth.user.admin;
        this.state.showEdit = this.props.auth.user.admin;
        this.state.showDelete = this.props.auth.user.admin;
    }

    fetchData() {

        this.setState({
            lockTable: true
        });

        getCars({
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
        return <h1>{ strings.carList.pageTitle }</h1>;
    }

    renderAddContent() {
        return <AddCar onCancel={ this.onCancel } onFinish={ this.onFinish }/>
    }

    renderEditContent(item) {
        return <EditCar onCancel={ this.onCancel } onFinish={ this.onFinish } data={ item }/>
    }

    delete(item) {

        this.setState({
            lockTable: true
        });

        deleteCars(item.id).then(response => {

            if(response && !response.ok) {
                this.onFinish(null);
                return;
            }

            this.props.enqueueSnackbar(strings.carList.deleted, { variant: 'success' });

            this.onFinish(item);
            this.cancelDelete();

            this.setState({
                lockTable: false
            });
        });
    }

    order(item) {

        let order = {
            description: 'Car: ' + item.licencePlate,
            status: 1,
            price: parseFloat(item.price)
        }

        addOrder(order).then(response => {

            this.props.history.push('/orders')
        });
    }

    renderRowMenu(index, item) {

        let ariaOwns = 'action-menu-' + index;

        return(
            <TableCell>
                <IconButton
                    aria-owns={ this.state.anchorEl ? ariaOwns : undefined }
                    aria-haspopup="true"
                    onClick={ (event) => this.handleMenuClick(event, ariaOwns) }
                >
                    <MoreVert/>
                </IconButton>
                {
                    ariaOwns === this.state.ariaOwns &&
                    <Menu
                        id={ ariaOwns }
                        anchorEl={ this.state.anchorEl }
                        open={ Boolean(this.state.anchorEl) }
                        onClose={ () => this.handleMenuClose() }
                    >
                        {
                            !this.props.auth.user.admin &&
                            <MenuItem onClick={ () => this.order(item) }>
                                <ListItemIcon>
                                    <VisibilityIcon/>
                                </ListItemIcon>
                                <ListItemText inset primary={ "Order" }/>
                            </MenuItem>
                        }
                            
                        {
                            this.state.showView &&
                            <MenuItem onClick={ () => this.handleMenuView(item) }>
                                <ListItemIcon>
                                    <VisibilityIcon/>
                                </ListItemIcon>
                                <ListItemText inset primary={ strings.table.view }/>
                            </MenuItem>
                        }
                        
                        {
                            this.state.showEdit &&
                            <MenuItem onClick={ () => this.handleMenuEdit(item) }>
                                <ListItemIcon>
                                    <EditIcon/>
                                </ListItemIcon>
                                <ListItemText inset primary={ strings.table.edit }/>
                            </MenuItem>
                        }
                        {
                            !item[this.deletedField] && this.state.showDelete &&
                            <MenuItem onClick={ () => this.handleMenuDelete(item) }>
                                <ListItemIcon>
                                    <DeleteIcon/>
                                </ListItemIcon>
                                <ListItemText inset primary={ strings.table.delete }/>
                            </MenuItem>
                        }
                        {
                            item[this.deletedField] && this.state.showDelete &&
                            <MenuItem onClick={ () => this.handleRestore(item) }>
                                <ListItemIcon>
                                    <UndoIcon/>
                                </ListItemIcon>
                                <ListItemText inset primary={ strings.table.undo }/>
                            </MenuItem>
                        }

                    </Menu>
                }

            </TableCell>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        changeFullScreen: Actions.changeFullScreen
    }, dispatch);
}

function mapStateToProps({ menuReducers, authReducers })
{
    return { menu: menuReducers, auth: authReducers };
}

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(CarList)));