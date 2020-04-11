import React from 'react'
import {bindActionCreators} from "redux";
import * as Actions from "../../../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Grid from '@material-ui/core/Grid';
import {Paper} from "@material-ui/core";
import strings from "../../../localization";
import Validators from "../../../constants/ValidatorTypes";
import FormComponent from "../../../common/FormComponent";
import UserForm from "../../../components/forms/admin/user/UserForm";
import {addUser} from "../../../services/admin/UserAdminService";
import {withSnackbar} from "notistack";
import CarCategoryForm from '../../../components/forms/admin/carCategory/CarCategoryForm';
import { editCarCategory } from '../../../services/admin/CarCategoryAdminService';

class AddCarCategory extends FormComponent {

    validationList = {
        name: [ {type: Validators.REQUIRED } ],
    };

    constructor(props) {
        super(props);

        this.state = {
            data: props.data ? props.data : {},
            errors: {}
        };

        this.props.changeFullScreen(false);

        this.submit = this.submit.bind(this);
    }

    submit() {

        if(!this.validate()) {
            return;
        }

        this.showDrawerLoader();

        editCarCategory(this.state.data).then(response => {

            if(!response.ok) {
                this.props.onFinish(null);
                this.props.enqueueSnackbar(strings.editCarCategegory.errorEditing, { variant: 'error' });
                return;
            }

            this.props.enqueueSnackbar(strings.editCarCategegory.edited, { variant: 'success' });
            this.props.onFinish(null);

            this.hideDrawerLoader();
        });
    }

    render() {

        return (
            <Grid id='page' item md={ 12 }>

                <div className='header'>
                    <h1>{ strings.editCarCategegory.pageTitle }</h1>
                </div>

                <Paper className='paper'>
                    <CarCategoryForm onChange={ this.changeData } onSubmit={ this.submit }
                                data={ this.state.data } errors={ this.state.errors } onCancel={ this.props.onCancel }/>
                </Paper>

            </Grid>

        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        changeFullScreen: Actions.changeFullScreen
    }, dispatch);
}

function mapStateToProps({ menuReducers, siteDataReducers })
{
    return { menu: menuReducers, siteData: siteDataReducers };
}

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(AddCarCategory)));