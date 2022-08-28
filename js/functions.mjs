export function setUserAndUsers(users, user) {
    localStorage.setItem('usersJuanita', JSON.stringify(users));
    localStorage.setItem('userJuanita', JSON.stringify(user));
}

