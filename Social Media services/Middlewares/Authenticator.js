const jwt= require('jsonwebtoken');
const secretkey="SportsSocialMedia";


exports.jwtAuthentication = (req, res,next)=>{
    const authHeader= req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secretkey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
       return res.sendStatus(401);
    }
} 






