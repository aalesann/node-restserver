const jwt = require('jsonwebtoken');
const { isRegExp } = require('underscore');

// ===================
//  Varificar token
// ===================
let verificaToken = ( req, res, next ) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded)=> {

        if( err ) {
            return res.status(401).json({
                ok:false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};


// ========================
//  Varificar rol de Admin
// ========================
let verificaAdminRole = ( req, res, next ) => {

    let usuario = req.usuario



    if( usuario.rol === 'ADMIN_ROLE' ) {
        next();
        return;
    }

    return res.json({
            ok: false,
            err: {
                message: 'No eres administrador'
            }
    })
}

module.exports = {
    verificaToken,
    verificaAdminRole
}