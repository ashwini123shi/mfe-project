import { ReactElement } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../../services/userService';
import { useMutation } from 'react-query';

type Data = {
    id: number;
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
};
interface Props { user?: Data; isAddMode: boolean; actionCompleted: boolean; handleSubmit: (fields: any) => void; }
// Validation rules for password fields
const UserEditSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required')

});

const UserEditForm = ({ user, isAddMode, actionCompleted, handleSubmit }: Props): ReactElement => {


    const initialValues = {
        first_name: user?.first_name || '', last_name: user?.last_name || ''
    };
    const { mutateAsync, isLoading: isAddingUser, error: addError } = useMutation(
        updateUser
    );
    const handlerUpdateRequest = async (values: {
        first_name: string;
        last_name: string;
    }) => {
        const updatedUser = await mutateAsync(values);
        console.log('This was an async mutation!', updatedUser);
    }

    return (
        <>
            {isAddingUser ? <p>Updating user...</p> : null}

            <Formik
                initialValues={initialValues}
                validationSchema={UserEditSchema}
                onSubmit={(values, actions) => {
                    handlerUpdateRequest(values);
                }}
            >
                {formik => (
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>

                        <div className='form-group'>
                            <label htmlFor='first_name'>First Name</label>
                            <input
                                className={'form-control'}
                                type='text'
                                id='first_name'
                                name='first_name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.first_name.toString()}
                            />
                            {formik.touched.first_name && formik.errors.first_name ? (
                                <div className='error'>{formik.errors.first_name}</div>
                            ) : null}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='last_name'>Last Name</label>
                            <input
                                className={'form-control'}
                                type='text'
                                id='last_name'
                                name='last_name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.last_name.toString()}
                            />
                            {formik.touched.last_name && formik.errors.last_name ? (
                                <div className='error'>{formik.errors.last_name}</div>
                            ) : null}
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                )}
            </Formik>


        </>
    );
};

export default UserEditForm;
