import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import LibroService from '../services/LibroService';
import ILibro from '../types/Libro';

function LibroList(): JSX.Element {
  const [libros, setLibros] = useState<Array<ILibro>>([]);
  const [currentLibro, setCurrentLibro] = useState<ILibro | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    retrieveLibros();
  }, []);

  const retrieveLibros = () => {
    LibroService.getAll()
      .then((response: any) => {
        setLibros(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const setActiveLibro = (libro: ILibro, index: number) => {
    setCurrentLibro(libro);
    setCurrentIndex(index);
  };

  return (
    <div className="libro">
      <div className="list row">
        <div className="col-md-6">
          <h4>Libro List</h4>
          <ul className="list-group">
            {libros &&
              libros.map((libro, index) => (
                <li
                  className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveLibro (libro, index)}
                  key={index}
                >
                  {libro.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentLibro ? (
            <div>
              <h4>Libro</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentLibro.title}
              </div>
              <div>
                <label>
                  <strong>ISBN:</strong>
                </label>{" "}
                {currentLibro.ISBN}
              </div>
              <div>
                <label>
                  <strong>description:</strong>
                </label>{" "}
                {currentLibro.description}
              </div>
              <div>
                <label>
                  <strong>author:</strong>
                </label>{" "}
                {currentLibro.author}
              </div>
              <Link
                to={"/editlibro/" + currentLibro.title}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Book...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LibroList;
