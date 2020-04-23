import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({

    en: {

        orderList: {
            description: 'Description',
            price: 'Price',
            status: 'Status',
            user: 'User'
        },

        carForm: {
            carModel: 'Car model',
            carCategory: 'Car category',
            licencePlate: 'Licence plate',
            price: 'Price'
        },

        carList: {
            pageTitle: 'Cars',
            licencePlate: 'Licence plate',
            price: 'Price',
            model: 'Model',
            category: 'Category',
            deleted: 'Deleted',
            image: 'Image'
        },

        partList: {
            pageTitle: 'Parts',
            name: 'Name',
            price: 'Price',
            deleted: 'Deleted'
        },

        editPart: {
            pageTitle: 'Edit part',
            edited: 'Part edited',
            errorEditing: 'Error editing part'
        },

        addPart: {
            pageTitle: 'Add part',
            added: 'Part added',
            errorAdding: 'Error adding part'
        },

        partForm: {
            name: 'Name',
            price: 'Price'
        },

        editCarModel: {
            pageTitle: 'Edit car model',
            edited: 'Car model edited',
            errorEditing: 'Error editing car model'
        },

        editCarCategory: {
            pageTitle: 'Edit car category',
            edited: 'Car category edited',
            errorEditing: 'Error editing car category'
        },

        carCategoryList: {
            name: "Name",
            pageTitle: 'Car categories',
            deleted: 'Car category deleted'
        },
        
        carModelList: {
            name: "Name",
            pageTitle: "Car models"
        },

        carCategoryForm: {
            name: 'Name'
        },

        addCarCategory: {
            pageTitle: 'Add car category',
            added: 'Car category added',
            errorAdding: 'Error adding car category form'
        },

        addCarModel: {
            pageTitle: 'Add car model',
            added: 'Car model added',
            errorAdding: 'Error adding car model form'
        },

        menu: {
            Home: 'Home',
            Products: 'Products',
            Services: 'Services',
            OnlineGoods: 'Online Goods',
            EmeraldDragon: 'Emerald Dragon',
            Features: 'Features'

        },

        table: {
            actions: 'Actions',
            view: 'View',
            edit: 'Edit',
            delete: 'Delete',
            confirmDelete: 'Confirm delete',
            no: 'No',
            yes: 'Yes',
            search: 'Search'
        },

        header: {
            lock: 'Lock',
            logout: 'Logout'
        },

        filter: {
            search: 'Search'
        },

        validation: {
            RequiredErrorMessage: 'required',
            MinLengthErrorMessage: 'Minimal length is ',
            MaxLengthErrorMessage: 'Maximal length is ',
            EmailErrorMessage: 'Please enter valid email',
            PasswordErrorMessage: 'Password must contain at least 6 letters, one upper case, one lower case and one number.',
            UserExistsErrorMessage: 'User with this email address already exists',
            OldPasswordDidNotMatch: 'Old password did not match',
            PasswordsNotEqual: 'Passwords do not match',
            notNumber: 'Not number'
        },

        notFound: {
            notFound: 'Not found!',
            dashboard: 'Dashboard'
        },

        forbidden: {
            forbidden: 'Forbidden!',
            dashboard: 'Dashboard'
        },

        error: {
            error: 'Error!',
            dashboard: 'Dashboard'
        },

        login: {
            email: 'Email',
            password: 'Password',
            login: 'Login',
            wrongCredentials: 'Wrong Credentials',
            register: 'Register'
        },

        lock: {
            password: 'Password',
            login: 'Login',
            wrongCredentials: 'Wrong Credentials',
            unlock: 'Unlock'
        },

        userList: {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            isDeleted: 'Is deleted',
            dateCreated: 'Date Created',
            pageTitle: 'Users',
            enabled: 'Enabled',
            userDelete: 'User deleted',
            userRestored: 'User restored'
        },

        userForm: {
            email: 'Email',
            firstName: 'First name',
            lastName: 'Last name',
            ok: 'Ok',
            cancel: 'Cancel',
            password: 'Password'
        },

        addUser: {
            pageTitle: 'Add user',
            errorAddClub: 'Error adding user',
            clubAdded: 'User added',
            errorAddingUser: 'Error adding user',
            userAdded: 'User added'
        },

        resetPassword: {
            email: 'Email',
            resetPassword: 'Reset password',
            password: 'Password',
            passwordRepeat: 'Password repeat'
        },
    }
});

export default strings;