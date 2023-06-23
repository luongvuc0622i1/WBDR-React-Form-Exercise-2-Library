import './Library.css';
import { useState } from 'react';
import { Formik } from 'formik';

export default function Library() {
    const [form, setForm] = useState({});
    const [bookList, setBookList] = useState([]);
    const [indexSelected, setIndexSelected] = useState(0);
    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    function handleValidate() {
        const errors = {};
        if (!form.title) {
            errors.title = "Required";
        }
        if (!form.amount) {
            errors.amount = "Required";
        }
        return errors;
    }

    function handleSubmit() {
        if (form.checkEdit) {
            let array = bookList;
            let index = indexSelected;
            for (let i=0; i < array.length; i++) {
                if (array[i].id == index) {
                    array[i] = form;
                }
            }
        } else {
            form.checkEdit = true;
            form.id = indexSelected;
            let newValue = indexSelected + 1;
            setIndexSelected(newValue);
            bookList.push(form);
        }
        setBookList(bookList);
        setForm({});
    }

    function handleSelect(book) {
        setForm(book);
        setIndexSelected(book.id);
    }

    function handleNew() {
        setForm({});
    }

    function handleDelete(book) {
        const newList = bookList.filter(item => item !== book);
        setBookList(newList);
    }

    return (
        <div className='container'>
            <h1>Library</h1>
            <div>
                <Formik initialValues={form}
                        validate={handleValidate}
                        onSubmit={handleSubmit}>
                    {({ errors, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div className={`custom-input ${errors.title ? "custom-input-error" : ""}`}>
                                <label>Tiêu đề</label>
                                <input name='title' value={form.title || ""} onChange={handleChange} />
                                <p className='error'>{errors.title}</p>
                            </div>
                            <div className={`custom-input ${errors.amount ? "custom-input-error" : ""}`}>
                                <label>Số lượng</label>
                                <input type='number' name='amount' value={form.amount || ""} onChange={handleChange} />
                                <p className='error'>{errors.amount}</p>
                            </div>
                            <button type='submit'>Submit</button>
                            <button type='button' onClick={handleNew}>New</button>
                        </form>
                    )}    
                </Formik>
            </div>
            <div className='width-auto'>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookList.map(item => (
                            <tr>
                                <td>{item.title}</td>
                                <td>{item.amount}</td>
                                <td>
                                    <button onClick={() => handleSelect(item)}>Edit</button>
                                    <button onClick={() => handleDelete(item)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}