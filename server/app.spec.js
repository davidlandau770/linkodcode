import { strictEqual } from "node:assert";
import { test, describe } from "node:test";
import { config } from "dotenv";
import { createToken, tokenVerification } from "./controller/accountCtrl.js";
config();


describe("valid function", () => {
    test("createToken", () => {
        const token = createToken({ username: "david", password: "bbb", permission: "user" });
        strictEqual(token.length, 180);
        strictEqual(typeof token, typeof "");
    })
    test("tokenVerification", () => {
        const token = createToken({ username: "david", password: "bbb", permission: "user" });
        const token2 = token.slice(0, -2) + "ab"        
        strictEqual(typeof tokenVerification(token), typeof {});
        strictEqual(tokenVerification(token2), undefined);
    })
})
