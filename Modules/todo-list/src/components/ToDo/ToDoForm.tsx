import React, { ReactElement, useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Alert } from "reactstrap";
import { useSelector } from "react-redux";
//component
import ToDoReconfirm from "./ToDoReconfirm";

interface TaskItem {
  task: String,
  priority: String,
  star: number
}
interface Props { taskItem?: TaskItem; isAddMode: boolean; actionCompleted: boolean; handleSubmit: (fields: any) => void; }
const validationSchema = Yup.object().shape({
  task: Yup.string().required('Task is Required'),
  priority: Yup.string()
    .required('Priority is Required'),
  star: Yup.number().required('Star is Required').oneOf([1, 2, 3, 4, 5])
});
const ToDoForm = ({ taskItem, isAddMode, actionCompleted, handleSubmit }: Props): ReactElement => {
  type taskProps = {
    id: number,
    task: string,
    completed: Boolean
  }


  const { duplicateItem, duplicateEditItem } = useSelector(state => state.todos);
  const [alertVisible, setAlertVisible] = useState(false);
  const [formData, setFormData] = useState(taskItem);
  function onSubmit(fields: any, { setStatus, setSubmitting, resetForm }: any) {
    const response = handleSubmit(fields);
    console.log('back', response);
    setSubmitting(false);
    setFormData(fields);
    // console.log(initialValues);
    if (isAddMode) {
      resetForm(initialValues);
    }
  }

  const showAlert = () => {
    setAlertVisible(true);

  }

  const initialValues = {
    task: taskItem?.task || '', priority: taskItem?.priority || '', star: taskItem?.star || 0
  };
  const formik = useFormik({
    initialValues: { task: taskItem?.task || '', priority: taskItem?.priority || '', star: taskItem?.star || 0 },
    onSubmit,
    // validate,
    validationSchema
  })
  // console.log('formik.touched', submitedValues)
  return (
    <>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='task'>Task</label>
          <input
            className={'form-control'}
            type='text'
            id='task'
            name='task'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.task.toString()}
          // disabled={!!duplicateItem}
          />
          {formik.touched.task && formik.errors.task ? (
            <div className='error'>{formik.errors.task}</div>
          ) : null}
        </div>

        <div className='form-group'>
          <label htmlFor='priority'>Priority</label>

          <select name="priority"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.priority.toString()}
            className={'form-control'}>
            <option value="">Select</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {formik.touched.priority && formik.errors.priority ? (
            <div className='error'>{formik.errors.priority}</div>
          ) : null}
        </div>

        <div className='form-group'>
          <label htmlFor='star'>Star</label>
          <div className="acidjs-rating-stars form-control">

            <input type="radio" name="star" checked={formik.values.star == 5 ? (!!formik.values.star) : false} onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-0" value="5" /><label htmlFor="group-1-0"></label>
            <input type="radio" name="star" checked={formik.values.star == 4 ? (!!formik.values.star) : false} onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-1" value="4" /><label htmlFor="group-1-1"></label>
            <input type="radio" name="star" checked={formik.values.star == 3 ? (!!formik.values.star) : false} onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-2" value="3" /><label htmlFor="group-1-2"></label>
            <input type="radio" name="star" checked={formik.values.star == 2 ? (!!formik.values.star) : false} onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-3" value="2" /><label htmlFor="group-1-3"></label>
            <input type="radio" name="star" checked={formik.values.star == 1 ? (!!formik.values.star) : false} onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-4" value="1" /><label htmlFor="group-1-4"></label>

          </div>
          {formik.touched.star && formik.errors.star ? (
            <div className='error'>{formik.errors.star}</div>
          ) : null}
        </div>

        <button className='btn btn-primary' type='submit'>{isAddMode ? 'Submit' : 'Update'}</button>
      </form>

      <Alert isOpen={actionCompleted || alertVisible} fade={false} color="success" className="mt-3">
        Todo  details saved successfully
      </Alert>


      {/** load component if duplicate task is entered */}
      {!!duplicateItem && (
        <ToDoReconfirm
          taskItem={formData}
          showAlert={showAlert}
        />
      )}

    </>
  );
};

export default ToDoForm;
