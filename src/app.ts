"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import logger = require("morgan");

import * as indexRoute from "./routes/index";
import * as config from "../config/index";

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //configure routes
        this.routes();
    }

    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    private routes():void {
        //get router
        let router: express.Router;
        router = express.Router();

        //create routes
        var index: indexRoute.Index = new indexRoute.Index();

        //home page
        router.get("/:ip?", index.index.bind(index.index));

        //use router middleware
        this.app.use(router);
    }


    /**
     * Configure app
     *
     * @class Server
     * @method config
     * @return void
     */
    private config():void {
        //configure jade
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "ejs");

        //mount logger
        this.app.use(logger("dev"));

        //Configuration
        this.app.set("config", config);

        //mount json form parser
        this.app.use(bodyParser.json());

        //mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));

        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, "bower_components")));

        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }
}

var server = Server.bootstrap();
export = server.app;