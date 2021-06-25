function checkAuth() {
    let token = sessionStorage.getItem('jwtToken');
    return (token != null && token !== '');
}

export {checkAuth}
