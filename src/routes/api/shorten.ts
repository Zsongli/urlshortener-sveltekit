import { urls } from "$lib/urls";
import crypto from "crypto";

export async function get(req) {

    const { code } = req.body ?? {};

    if (!code)
        return {
            status: 200,
            body: {
                urls: Array.from(urls, ([code, url]) => ({ code, url }))
            }
        }

    if (!urls.has(code)) {
        return {
            status: 404,
            body: {
                error: "URL not found"
            }
        }
    };

    return {
        status: 200,
        body: {
            url: urls.get(code)
        }
    };
}

export async function post(req) {
    var { code, url } = req.body;
    if (!code) code = crypto.randomBytes(4).toString("hex");

    if (!url) {
        return {
            status: 400,
            body: {
                error: "url is required"
            }
        };
    }

    if (urls.has(code)) {
        return {
            status: 400,
            body: {
                error: "code already exists"
            }
        };
    }

    urls.set(code, url);

    return {
        status: 200,
        body: {
            shortUrl: `http://localhost:3000/${code}`
        }
    };
}

export async function del(req) {

    var { code } = req.body;

    if (!code) {
        return {
            status: 400,
            body: {
                error: "code is required"
            }
        };
    }

    if (!urls.has(code)) {
        return {
            status: 400,
            body: {
                error: "code does not exist"
            }
        };
    }

    urls.delete(code);

    return {
        status: 200
    };
}