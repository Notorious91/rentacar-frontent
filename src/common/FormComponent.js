import React, {Component} from 'react'
import {validate, isFormValid} from '../functions/Validation';
import BaseComponent from "../common/BaseComponent";
import update from 'immutability-helper';

class FormComponent extends BaseComponent {

    validationList = {};

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            errors: {},
            showLoader: false
        };

        this.changeData = this.changeData.bind(this);
        this.changeCheckBox = this.changeCheckBox.bind(this);
        this.validate = this.validate.bind(this);
    }

    changeData(event, data = 'data') {

        this.setState({
            [data]: update(this.state[data], { [event.target.name]: {$set: event.target.value} })
        });
    }

    changeCheckBox(event) {

        const field = event.target.name;
        const data = this.state.data;
        data[field] = !data[field];

        this.setState({
            data
        });
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    isFloat(n) {
        return !isNaN(parseFloat(n));
    }

    isInt(n) {
        return isFinite(n)
    }

    validate () {

        let errors = validate(this.state.data, this.validationList);

        this.setState({errors});

        return isFormValid(errors);
    }

    setError(key, value) {
        this.setState({
            errors: update(this.state.errors, { [key]: {$set: [ { message: value} ]} })
        });
    }

    showDrawerLoader() {
        this.setState({
            showLoader: true
        });
    }

    hideDrawerLoader() {
        this.setState({
            showLoader: false
        });
    }
}

export default FormComponent;