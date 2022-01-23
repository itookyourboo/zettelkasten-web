function stub(login, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                {
                    status: "OK",
                    message: "success",
                    token: "lalala"
                }
            );
        });
    });
}

export default function handleSignInRequest(login, password) {
    return stub(login, password);
}
