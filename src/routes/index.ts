"use strict";

import * as express from "express";

var geoip = require('geoip-lite');

module Route {

    export class Index {

        public index(req: express.Request, res: express.Response, next: express.NextFunction) {

            let ip = req.params.ip ? req.params.ip : (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip || null);
            let data = ip?geoip.lookup(ip):{};

            if(data && ip) {
                data.ip = ip;
            }

            return res.jsonp({
                code: (data?200:400),
                data: data
            });
        }
    }
}

export = Route;