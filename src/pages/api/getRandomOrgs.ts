import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from "node-fetch-commonjs";

export default async (_: NextApiRequest, res: NextApiResponse) => {

    const API_KEY = process.env.NEXT_PUBLIC_GITHUB_TOEKN;

    // APIリクエストを送信
    const response = await fetch("https://api.github.com/organizations",
        {
            headers: {
                "Authorization": "token " + API_KEY,
            }
        }
    );

    // APIレスポンスを取得
    const organizations: any = await response.json();

    // ランダムにOrganizationを選択
    const organization = organizations[Math.floor(Math.random() * organizations.length)];

    res.status(200).json(organization || {});
}