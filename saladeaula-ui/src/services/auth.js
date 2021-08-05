export const parseJwt = () => {
    let base64 = localStorage.getItem('jwt').split('.')[1]
    let tokenDecod = JSON.parse(window.atob(base64))

    console.log(tokenDecod)
    return tokenDecod
}

export const usuarioAutenticado = () => localStorage.getItem('jwt') !== null