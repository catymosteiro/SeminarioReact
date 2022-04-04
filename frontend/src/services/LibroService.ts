import http from "../http-common";
import ILibro from "../types/Libro";

const getAll = () => {
    return http.get<Array<ILibro>>("/libros/");
};

const get = (title: any) => {
    return http.get<ILibro>(`/libros/${title}`);
};

const create = (data: ILibro) => {
    return http.post<ILibro>("/libros/", data);
};

const update = (title: any, data: ILibro) => {
    return http.put<any>(`/libros/${title}`, data);
};

const remove = (title: any) => {
    return http.delete<any>(`/libros/${title}`);
};

const LibroService = {
    getAll,
    get,
    create,
    update,
    remove,
};
export default LibroService;
