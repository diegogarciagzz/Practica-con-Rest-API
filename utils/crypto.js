import crypto from "crypto";

// Función para crear hash y sal
export function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
        .toString(`hex`);
    return { salt, hash };
}

// Función para verificar si un password corresponde a un hash
export function verifyPassword(password, salt, hash) {
    const hashVerify = crypto
        .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
        .toString(`hex`);
    return hash === hashVerify;
}
