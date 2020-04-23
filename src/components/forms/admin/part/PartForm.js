import React from 'react';
import strings from "../../../../localization";
import {getError, hasError} from "../../../../functions/Validation";
import {Button, TextField} from "@material-ui/core";

const PartForm = ({
                      onSubmit,
                      onCancel,
                      onChange,
                      errors,
                      data,
                      onFileChange,
                      uploadFile,
                      preview
                  }) => (

    <form id='user-form'>
        <TextField
            label={ strings.partForm.name }
            error={ hasError(errors, 'name') }
            helperText={ getError(errors, 'name') }
            fullWidth
            autoFocus
            name='name'
            onChange={ onChange }
            margin="normal"
            value={ data.name }
        />
        <TextField
            label={ strings.partForm.price }
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

export default PartForm;