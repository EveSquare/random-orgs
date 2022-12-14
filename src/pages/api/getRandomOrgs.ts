import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from "node-fetch-commonjs";

export default async (_: NextApiRequest, res: NextApiResponse) => {

    const API_KEY = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    // APIリクエストを送信
    const response = await fetch("https://api.github.com/organizations",
        {
            headers: {
                "Authorization": "token " + API_KEY,
            }
        }
    );

    if (response.status !== 200) {
        res.status(500).json({ error: "API Error" });
        return;
    }

    // APIレスポンスを取得
    const organizations: any = await response.json();

    // ランダムにOrganizationを選択
    const organization = organizations[Math.floor(Math.random() * organizations.length)];

    res.status(200).json(organization || {});
}