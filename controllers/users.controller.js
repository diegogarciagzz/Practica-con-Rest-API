import { pool } from "../db/db.js";
import CryptoJS from "crypto-js";

// OBTENER TODOS LOS USUARIOS
export const getUsers = (req, res) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) {
            res.status(500).json({ msg: error, users: [] });
            return;
        }
        res.status(200).json({ msg: "ok", users: results });
    });
};

// OBTENER UN USUARIO
export const getUser = (req, res) => {
    const id = req.params.id;
    pool.execute("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error, user: [] });
            return;
        }
        res.status(200).json({ msg: "ok", user: results });
    });
};

// CREAR UN NUEVO USUARIO
export const postUser = (req, res) => {
    const { username, password } = req.body;
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret').toString();

    pool.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, encryptedPassword], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error });
            return;
        }
        res.status(201).json({ msg: "Usuario creado", id: results.insertId });
    });
};

// ACTUALIZAR UN USUARIO
export const putUser = (req, res) => {
    const { username, password } = req.body;
    const { id } = req.params;
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret').toString();

    pool.execute("UPDATE users SET username = ?, password = ? WHERE id = ?", [username, encryptedPassword, id], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error });
            return;
        }
        res.status(200).json({ msg: "Usuario actualizado" });
    });
};

// ELIMINAR UN USUARIO
export const deleteUser = (req, res) => {
    const { id } = req.params;
    pool.execute("DELETE FROM users WHERE id = ?", [id], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error });
            return;
        }
        res.status(200).json({ msg: "Usuario eliminado" });
    });
};

// LOGIN DE USUARIO
export const login = (req, res) => {
    const { username, password } = req.body;

    pool.execute("SELECT * FROM users WHERE username = ?", [username], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ msg: "Usuario no encontrado" });
            return;
        }

        const decryptedPassword = CryptoJS.AES.decrypt(results[0].password, 'secret').toString(CryptoJS.enc.Utf8);
        if (decryptedPassword !== password) {
            res.status(401).json({ msg: "Contraseña incorrecta" });
            return;
        }

        res.status(200).json({ msg: "Login exitoso" });
    });
};
