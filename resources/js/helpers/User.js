import Token from "./Token";
import AppStorage from "./AppStorage";
class User {
    login(credentials) {
        axios
            .post("auth/login", credentials)
            .then(res => this.responseAfterLogin(res))
            .catch(err => {
                console.log(err);
            });
    }

    responseAfterLogin(res) {
        const { access_token, user: username } = res.data;
        if (Token.isValid(access_token)) {
            AppStorage.storeData(username, access_token);
        }
    }

    hasToken() {
        const storedToken = AppStorage.getToken();
        if (storedToken) {
            return Token.isValid(storedToken);
        }
        return false;
    }

    loggedIn() {
        return this.hasToken();
    }

    logout() {
        AppStorage.clearData();
    }

    name() {
        if (this.loggedIn()) {
            return AppStorage.getUser();
        }
    }

    id() {
        if (this.loggedIn()) {
            const payload = Token.payload(AppStorage.getToken());
            return payload.sub;
        }
    }
}

export default new User();
