import {Request, response, Response, Router} from 'express';
import Libro from '../models/Libro';

class LibrosRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes(); //This has to be written here so that the method can actually be configured when called externally.
    }

    public async getLibros(req: Request, res: Response) : Promise<void> { //It returns a void, but internally it's a promise.
        const allLibros = await Libro.find();
        if (allLibros.length == 0){
            res.status(404).send("There are no libros yet!")
        }
        else{
            res.status(200).send(allLibros);
        }
    }

    public async getLibrosByTitle(req: Request, res: Response) : Promise<void> {
        const LibroFound = await Libro.findOne({title: req.params.title});
        if(LibroFound == null){
            res.status(404).send("The user doesn't exist!");
        }
        else{
            res.status(200).send(LibroFound);
        }
    }

    public async addLibro(req: Request, res: Response) : Promise<void> {
        console.log(req.body);
        const {ISBN, title, description,author} = req.body;
        const newLibro = new Libro({ISBN, title, description,author});
        await newLibro.save();
        res.status(200).send('Libro added!');
    }

    public async deleteLibro(req: Request, res: Response) : Promise<void> {
        const LibroToDelete = await Libro.findOneAndDelete ({name:req.params.title}, req.body);
        if (LibroToDelete == null){
            res.status(404).send("The libro doesn't exist!")
        }
        else{
            res.status(200).send('Deleted!');
        }
    } 
    routes() {
        this.router.get('/', this.getLibros);
        this.router.get('/:title', this.getLibrosByTitle);
        this.router.post('/', this.addLibro);
        this.router.delete('/:title', this.deleteLibro);
    }
}
const librosRoutes = new LibrosRoutes();

export default librosRoutes.router;