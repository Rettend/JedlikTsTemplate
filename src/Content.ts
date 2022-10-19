﻿import fs from "fs"; //  https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; //  https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; //  https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldás, { IKeres } from "./megoldás";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<meta charset='utf-8'>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

        // Kezd a kódolást innen -->

        const m: Megoldás = new Megoldás("utasadat.txt");
        res.write(`2. feladat:\nA buszra ${m.felszállókSzáma} utas akart felszállni.\n`);

        res.write(`3. feladat:\nA buszra ${m.érvénytelenFelszállásokSzáma} utas nem szállhatott fel.\n`);

        const max: IKeres = m.MaxKeresArray;
        res.write(`4. feladat:\nA legtöbb utas (${max.maxFelszálló} fő) a ${max.maxElsőMegálló}. megállóban próbált felszállni.\n`);

        const max2: IKeres = m.MaxKeresMap;
        res.write(`4. feladat:\nA legtöbb utas (${max2.maxFelszálló} fő) a ${max2.maxElsőMegálló}. megállóban próbált felszállni.\n`);

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
