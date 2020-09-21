import Token from "./Token";
import AppStorage from "./AppStorage";
class User {
    async login(credentials) {
        await axios
            .post("auth/login", { ...credentials })
            .then(res => this.responseAfterLogin(res))
            .catch(err => {
                return Promise.reject(err);
            });
    }

    async register(credentials) {
        return await axios
            .post("auth/register", { ...credentials })
            .then(res => this.responseAfterLogin(res))
            .catch(err => {
                return Promise.reject(err);
            });
    }

    responseAfterLogin(res) {
        const { access_token, user: username } = res.data;
        if (Token.isValid(access_token)) {
            AppStorage.storeData(username, access_token);
            window.location = "/forum";
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
        window.location = "/forum ";
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

    ownsQuestion(questionUId) {
        return this.id() === questionUId;
    }
}

export default new User();
