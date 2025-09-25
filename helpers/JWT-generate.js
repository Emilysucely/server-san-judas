import jwt from 'jsonwebtoken'

export const generarJWT = (vid = '', email = '') =>{
    return new Promise((resolve, reject) => {
        const playload = { vid, email };
        jwt.sign(
            playload,
            process.env.TOKEN_KEY,
            {
                expiresIn: '8h',
            },
            (err,token) => {
                if (err) {
                    console.error(err);
                    reject('Error al generar el token: ' + err.message);
                } else { 
                    resolve(token);
                }

            }
        );
    });
};