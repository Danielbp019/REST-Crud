import express, { json } from 'express';
import { articuloRouter } from './routes/ArticuloRouter.js'; // Se importa la clase del archivo routes, para usar las rutas.
import { PORT } from './config.js'; // Se importa el puerto del servidor
// Seguridad
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { doubleCsrf } from 'csrf-csrf';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './middlewares/cors.js';
// Favicon
import favicon from 'serve-favicon';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Configura el middleware para servir el favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Use Helmet!
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});
// Apply the rate limiting middleware to all requests.
app.use(limiter);

// Configuración de CSRF y cookieParser.
const {
    invalidCsrfTokenError,
    generateToken,
    validateRequest,
    doubleCsrfProtection,
} = doubleCsrf({
    getSecret: (req) => req.secret,
    cookieName: "csrfToken",
    cookieOptions: { httpOnly: true, secure: true, sameSite: "strict" },
    size: 64,
    ignoredMethods: ["GET", "HEAD", "OPTIONS"],
});
app.use(cookieParser());
app.use(doubleCsrfProtection);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

// Usar las rutas importadas, '/api' prefijo para que la ruta se vea mejor
app.use('/api', articuloRouter);

// Ruta para manejo del error 404 de la direccion sin ruta.
app.use((req, res, next) => {
    res.status(404).send('Ruta no válida');
});

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo no responde error 500!');
});

// Servidor. Valores de configuración, en el archivo .env
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}/api`);
});
