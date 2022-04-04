import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LibroService from '../services/LibroService';
import ILibro from '../types/Libro';

function Libro(): JSX.Element {

    const { libroTitle } = useParams();
    let navigate = useNavigate();

    const initialLibroState = {
        _id: null,
        ISBN: "",
        title: "",
        description:"",
        author: "",
    };

    const [currentLibro, setCurrentLibro] = useState<ILibro>(initialLibroState);
    const [message, setMessage] = useState<string>("");
    const [libro, setLibro] = useState<String>("");

    const getLibro = (libroTitle: string) => {
        LibroService.get(libroTitle)
            .then((response: any) => {
                setCurrentLibro(response.data);
                console.log(response.data);
                setLibro(libroTitle);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (libroTitle)
            getLibro(libroTitle);
    }, [libroTitle]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentLibro({ ...currentLibro, [name]: value });
    };

    const updateLibro = () => {
        LibroService.update(libro, currentLibro)
            .then((response: any) => {
                console.log(response.data);
                setMessage("The book was updated successfully!");
                setLibro(currentLibro.title);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteLibro = () => {
        LibroService.remove(libro)
            .then((response: any) => {
                console.log(response.data);
                navigate("/");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div className="libro">
            {currentLibro ? (
                <div className="edit-form">
                    <h4>Libro</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentLibro.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ISBN">ISBN</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ISBN"
                                name="ISBN"
                                value={currentLibro.ISBN}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentLibro.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">author</label>
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                name="author"
                                value={currentLibro.author}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                    <button className="badge badge-danger mr-2" onClick={deleteLibro}>
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateLibro}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a book...</p>
                </div>
            )}
        </div>

    );
}

export default Libro;
