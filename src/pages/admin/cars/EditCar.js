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
import { addCarCategory } from '../../../services/admin/CarCategoryAdminService';
import { addCarModel } from '../../../services/admin/CarModelAdminService';
import { addCars, editCars, uploadImage } from '../../../services/admin/UserCarService';
import CarForm from '../../../components/forms/admin/part/CarForm';

class EditCar extends FormComponent {

    validationList = {
        licencePlate: [ {type: Validators.REQUIRED } ],
        price: [ {type: Validators.REQUIRED } ],
        model: [ {type: Validators.REQUIRED } ],
        category: [ {type: Validators.REQUIRED } ],
    };

    constructor(props) {
        super(props);

        this.state = {
            data: props.data ? props.data : {},
            errors: {}
        };

        this.props.changeFullScreen(false);

        this.submit = this.submit.bind(this);

        this.onFileChange = this.onFileChange.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    componentDidMount() {
        if(!this.props.data.image) {
            return;
        }

        this.setState({
            preview: 'data:image/png;base64,' + this.props.data.image,
            image: this.props.data.image
        })
    }

    componentWillMount(props) {
        if(!props || !props.data.image) {
            return;
        }

        this.setState({
            preview: 'data:image/png;base64,' + props.data.image,
            image: props.data.image
        })
    }

    submit() {

        if(!this.validate()) {
            return;
        }

        this.showDrawerLoader();

        editCars(this.state.data).then(response => {

            if(!response.ok) {
                this.props.onFinish(null);
                this.props.enqueueSnackbar(strings.addCarModel.errorAdding, { variant: 'error' });
                return;
            }

            this.props.enqueueSnackbar(strings.addCarModel.added, { variant: 'success' });
            this.props.onFinish(null);

            this.hideDrawerLoader();
        });
    }

    onFileChange(event) {

        this.setState({
            image: event.target.files[0],
            preview: URL.createObjectURL(event.target.files[0])
        })

    }

    uploadFile() {

        uploadImage(this.state.data.id, this.state.image).then(response => {

            this.props.onFinish(null);
        })

    }

    render() {

        return (
            <Grid id='page' item md={ 12 }>

                <div className='header'>
                    <h1>{ strings.addCarModel.pageTitle }</h1>
                </div>

                <Paper className='paper'>
                    <CarForm onChange={ this.changeData } onSubmit={ this.submit }
                        carCategories={ this.props.siteData.carCategories }
                        carModels={ this.props.siteData.carModels }
                        onFileChange={this.onFileChange}
                        uploadFile={this.uploadFile}
                        preview={this.state.preview}
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

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCar)));