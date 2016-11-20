"use strict";

import * as express from "express";

var geoip = require('geoip-lite');
var ipware = require('ipware')();

module Route {

    export class Index {

        public index(req: express.Request, res: express.Response, next: express.NextFunction) {

            let ip = req.params.ip ? req.params.ip : null;
            ip = (!ip && ipware.get_ip? ipware.get_ip: ip);

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