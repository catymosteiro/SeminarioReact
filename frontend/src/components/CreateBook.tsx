import React, { useState, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LibroService from '../services/LibroService';
import ILibro from '../types/Libro';

function CreateLibro(): JSX.Element {

    const initialLibroState = {
        id: null,
        ISBN: "",
        title: "",
        description: "",
        author: ""
    };
    const [libro, setLibro] = useState<ILibro>(initialLibroState);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLibro({ ...libro, [name]: value });
    };

    const saveLibro = () => {
        var data = {
            ISBN: libro.ISBN,
            title: libro.title,
            description: libro.description,
            author: libro.author
        };
        console.log(data);
        LibroService.create(data)
            .then((response: any) => {
                setLibro({
                    _id: response.data._id,
                    ISBN: response.data.ISBN,
                    title: response.data.title,
                    description: response.data.description,
                    author: response.data.author
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const newLibro = () => {
        setLibro(initialLibroState);
        setSubmitted(false);
    };

    return (
        <div className="libro">
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={newLibro}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="ISBN">ISBN</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ISBN"
                                required
                                value={libro.ISBN}
                                onChange={handleInputChange}
                                name="ISBN"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={libro.title}
                                onChange={handleInputChange}
                                name="title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={libro.description}
                                onChange={handleInputChange}
                                name="description"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">author</label>
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                required
                                value={libro.author}
                                onChange={handleInputChange}
                                name="author"
                            />
                        </div>
                        <button onClick={saveLibro} className="btn btn-success">
                            Submit
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateLibro;
