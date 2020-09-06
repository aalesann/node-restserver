const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/Usuario');
const { verificaToken, verificaAdminRole } = require('../middlewares/authentication')
const app = express();

app.get('/usuarios', verificaToken ,(req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({}, 'nombre email rol estado google img')
            .skip(desde)
            .limit(limite)
            .exec( (err, usuarios) => {
                if( err ){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.countDocuments({}, (err, conteo)=> {

                    res.json({
                        ok: true,
                        usuarios,
                        cuantos: conteo
                    });
                });
            })
});

app.post('/usuarios', [verificaToken, verificaAdminRole], (req, res) => {
    let body = req.body;
    const usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
    });



    usuario.save( (err, usuarioDB) => {
        if( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

});

app.put('/usuarios/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;
    // Validación de parámetros que se permiten actualizar
    let body = _.pick(req.body,['nombre', 'email', 'img', 'role']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB)=> {
        
        if( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

});

app.delete('/usuarios/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;
    const estado = false;    
    
    // Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB)=> {
    Usuario.findByIdAndUpdate(id,  {estado}, { new: true }, (err, usuarioBorrado) => {
        if( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if( !usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;