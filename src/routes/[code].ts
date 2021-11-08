import { urls } from "$lib/urls";

export async function get(req) {
    const { code } = req.params;

    if (!code || !urls.has(code)) {
        return {
            status: 404
        };
    }

    const url = urls.get(code);

    return {
        status: 301,
        headers: {
            location: url.startsWith("http") ? url : `http://${url}`
        }
    };
}