

// ========================
// Puerto 
// ========================
process.env.PORT = process.env.PORT || 3000;

// ========================
// Entorno
// ========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ========================
//  Vencimiento del token
// ========================
// 60 seg * 60 min * 24hs * 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ========================
// SEED de autenticación
// ========================
process.env.SEED = process.env.SEED || 'seed-de-desarrollo';

// ========================
// Base de datos
// ========================
let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;