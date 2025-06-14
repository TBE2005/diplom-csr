import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { FRONT_URL } from '../urls.ts'

const clientId = "E69B1725E46F1E7855155A622D7952CF616D37C90D134955B4604150B175DF69"
const clientSecret = "7F7A47CFF9FECBDC770AECC5D97B0E7C05A598302978E21A252D2C3A57CDABFCD61DDB46312B33FA54CDEF870AF216FD1CA614B98766D46036C94AE2559B4751"

export const callbackAuth = httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    try {
        const responseToken = await fetch(
            `https://yoomoney.ru/oauth/token?grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${clientSecret}`
        );
        const data = await responseToken.json();

        const user = await ctx.runQuery(api.user.getUserByAccessToken, {
            access_token: data.access_token,
        });

        if (!user.access_token) {
            await ctx.runMutation(api.user.create, {
                access_token: data.access_token,
            });
        }

        const params = new URLSearchParams({
            access_token: data.access_token,
        });
        return new Response(null, {
            status: 302,
            headers: new Headers({
                "Location": FRONT_URL + "?" + params.toString(),
            }),
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: String(error) }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
});


export const payment = httpAction(async (_ctx, request) => {
    const data = await request.json();
    const { targetAccount, amount, comment, access_token } = data;
    const requestParams = new URLSearchParams({
        pattern_id: "p2p",
        to: targetAccount,
        amount: amount.toFixed(2),
        comment: comment || "",
        message: comment || "",
    });

    try {
        const responsePayment = await fetch(`https://yoomoney.ru/api/request-payment`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: requestParams.toString(),
        });

        const requestData = await responsePayment.json();
        if (requestData.status === "refused") {
            throw new Error(requestData.error);
        }
        const requestParamsProcess = new URLSearchParams({
            request_id: requestData.request_id,
        });
        const responseProcess = await fetch(`https://yoomoney.ru/api/process-payment`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: requestParamsProcess.toString(),
        });
        const processData = await responseProcess.json();
        if (processData.status === "refused") {
            throw new Error(processData.error);
        }

        return new Response(JSON.stringify(processData), {
            status: 200,
            headers: new Headers({
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Vary": "Origin",
            }),
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: String(error) }), {
            status: 500,
            headers: new Headers({
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Vary": "Origin",
            }),
        });
    }
});