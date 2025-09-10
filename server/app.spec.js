import { strictEqual } from "node:assert";
import { test, describe } from "node:test";
import { config } from "dotenv";
config();


describe("valid function", () => {
    test("createToken", () => {
        const token = createToken({ username: "david", password: "bbb", permission: "user" });
        strictEqual(token.length, 180);
        strictEqual(typeof token, typeof "");
    })
    test("TokenVerification", () => {
        const token = createToken({ username: "david", password: "bbb", permission: "user" });
        strictEqual(TokenVerification(token, process.env.JWT_SECRET), "verified");
    })
})
