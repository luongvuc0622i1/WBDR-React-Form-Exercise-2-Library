import './Library.css';
import { useState } from 'react';
import { Formik } from 'formik';

export default function Library() {
    const [form, setForm] = useState(0);

    function handleChange() {}

    function handleValidate() {}

    function handleSubmit() {}

    return (
        <div className='container'>
            <h1>Library</h1>
            <Formik initialValues={form}
                    validate={handleValidate}
                    onSubmit={handleSubmit}>
                {({ errors, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='custom-input'>
                            <label>Tiêu đề</label>
                            <input name='title' value={form.title || ""} onChange={handleChange} />
                            {/* <p className='error'>{errors.email}</p> */}
                        </div>
                    </form>
                )}    
            </Formik>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Number</th>
                    <th>Action</th>
                </tr>
            </table>
        </div>
    );
}