import React from 'react';
import strings from "../../../../localization";
import {getError, hasError} from "../../../../functions/Validation";
import {Button, TextField} from "@material-ui/core";
import SelectControl from '../../../controls/SelectControl';

const CarForm = ({
                      onSubmit,
                      onCancel,
                      onChange,
                      errors,
                      data,
                      carModels,
                      carCategories,
                      onFileChange,
                      uploadFile,
                      preview
                  }) => (

    <form id='user-form'>
        <SelectControl
            hasError={ hasError(errors, 'model') }
            error={ getError(errors, 'model') }
            options={ carModels }
            selected={ data.model }
            onChange={ onChange }
            label={ strings.carForm.carModel }
            name={ 'model' }
            nameKey={ 'name' }
            valueKey={ 'id' }
        />
        <SelectControl
            hasError={ hasError(errors, 'category') }
            error={ getError(errors, 'category') }
            options={ carCategories }
            selected={ data.category }
            onChange={ onChange }
            label={ strings.carForm.carCategory }
            name={ 'category' }
            nameKey={ 'name' }
            valueKey={ 'id' }
        />
        <TextField
            label={ strings.carForm.licencePlate }
            error={ hasError(errors, 'licencePlate') }
            helperText={ getError(errors, 'licencePlate') }
            fullWidth
            autoFocus
            name='licencePlate'
            onChange={ onChange }
            margin="normal"
            value={ data.licencePlate }
        />
        <TextField
            label={ strings.carForm.price }
            error={ hasError(errors, 'price') }
            helperText={ getError(errors, 'price') }
            fullWidth
            name='price'
            onChange={ onChange }
            margin="normal"
            value={ data.price }
        />
        <div className='submit-container'>
            <Button variant="contained" color="primary" onClick={ onSubmit }>
                { strings.userForm.ok }
            </Button>
            <Button variant="contained" color="secondary" onClick={ onCancel }>
                { strings.userForm.cancel }
            </Button>
        </div>

        {
            data.id && 
            <div style={{ marginTop: '50px' }}>
                <div>
                    {
                        preview &&
                        <img src={preview} style={{ width: '350px', marginBottom: '20px' }}/>
                    }
                </div>

                <Button
                    variant="contained"
                    component="label"
                    >
                    Select File
                    <input
                        accept="image/*"
                        onChange={onFileChange}
                        type="file"
                        style={{ display: "none" }}
                    />
                </Button>

                <div>
                    <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={uploadFile}>
                        Upload
                    </Button>
                </div>
            </div>
        }
    </form>
);

export default CarForm;