import type { Request, Response } from "express";
import { justifyText } from "../utils/justifyText.js";
import dbsqlite from "../utils/db.js";
import crypto from "crypto";

 /**
  * Justifie un texte.
  *
  * @remarks
  * Cette route vérifie aussi si un utilisateur a le droit de justifier un texte.
  *
  * @param req - Requête Express
  * @param res - Réponse Express
  *
  * @returns 200 - string (text/plain)
  *
  * @returns 400 - Token invalide
  *
  * @returns 402 - Limite de 80 000 mots atteinte
  */
export const justify = (req : Request,res : Response) : void => {
    try {
    const token = req.cookies.token;

        if (!token)
        {
            res.status(400).send("Token is not good");
        }
        else {
            const len_words = req.body.split(" ").length;

                let stmt = dbsqlite.prepare("SELECT timestamp, nb_words FROM users WHERE token = ?");
                let result = stmt.get(token) as {timestamp: number, nb_words : number } | undefined;
                if (result)
                {
                    if (result.timestamp + (60 * 60 * 24) < Math.floor(Date.now() / 1000))
                    {
                        const stmt = dbsqlite.prepare("UPDATE users SET timestamp = ? WHERE token = ?");
                        stmt.run(Math.floor(Date.now() / 1000), token);
                    }
                    if (result.timestamp + (60 * 60 * 24) >= Math.floor(Date.now() / 1000))
                    {  
                        if (result.nb_words + len_words >= 80000) {
                            // IMPOSSIBLE
                            res.status(402).send("Payment Required");
                        }
                        else {
                            // POSSIBLE
                            const stmt = dbsqlite.prepare(
                            "UPDATE users SET nb_words = nb_words + ? WHERE token = ?"
                            );
                            stmt.run(len_words, token);
                            res.type("text/plain");
                            res.send(justifyText(req.body));
                        }
                    }
                }
                else {
                    res.status(400).send("Token is not good");
                }
        }
    } catch(err) {
        console.log(err);
        res.status(400).send("Token is not good");
    }  
}

/**
 * Retourne un token à partir d'un email.
 *
 * @remarks
 * Cette route retourne un token en cas de succès
 *
 * @param req - Requête Express
 * @param res - Réponse Express
 *
 * @returns 200 - objet contenant le token
 * @example
 * {
 *   "success": true,
 *   "token": "bd2ddc47fb38e7426bae21cb7aeeaae9f7b5538041cfb100c1a64f1d416f4647"
 * }
 * @returns 400 - si le token n'est pas correct
 */
export const getToken = (req : Request,res : Response): void => {
    try {
        const JSONContent = req.body;
        let token;

        if(!JSONContent.email)
        {
            res.status(400).send({success:false});
        }

        type CountResult = {
            count: number;
        };
        let stmt = dbsqlite.prepare("SELECT COUNT(*) AS count FROM users WHERE email = ?");
        let result = stmt.get(JSONContent.email) as CountResult;

        // Si l'utilisateur est déja dans la base de données
        if (result.count >= 1) {

            let stmt = dbsqlite.prepare("SELECT token FROM users WHERE email = ?");
            let result = stmt.get(JSONContent.email) as {token : string} | undefined;
            if (!result)
            {
                throw new Error("Error with mail : cannot find token.");
            }
            token = result.token;

        }
        else {

            token  = crypto.randomBytes(32).toString("hex");
            let stmt = dbsqlite.prepare("INSERT INTO users (email, token, nb_words, timestamp) VALUES (?, ?, ?, ?)");
            stmt.run(JSONContent.email, token, 0, Math.floor(Date.now() / 1000));
        }
        res.cookie("token", token);
        res.send({success:true, token: token});
    } catch (err) {
        console.log(err);
        // erreur 
        res.status(400).send({success:false});
    }
}
