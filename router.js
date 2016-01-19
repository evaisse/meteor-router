


const _namedParam = /:(\w)+/g;
const _splatParam = /\*(\w)+/g;


/**
 * [Router description]
 * @param {[type]} base [description]
 */
Router = class BaseRouter {


    constructor(base = "/") {
        this._routes = {};
        this.base = base;
        this.getHash = () => {
            return window.location.hash ? window.location.hash.substr(1) : "/";
        };
    }


    add(route, constrains, callback) {

        let handler;

        if (!callback) {
            callback = constrains;
            constrains = {};
        }

        if (!route || !callback) {
            throw new Error('[Router] A route needs to be defined');
        }

        if (!this._routes[route]) {
            this._routes[route] = RouteParser.parse(route, constrains);
            this._routes[route].handlers = [];
        }

        this._routes[route].handlers.push(callback);
    }

    dispatch(path) {

        var founds = [];

        window.console && console.log("[Router] dispatch", path);

        Object.keys(this._routes).forEach(k => {

            var route = this._routes[k],
                callbacks,
                req,
                params = {};

            window.console && console.log("[Router]", "test", route.regex, path);

            params = route.exec(path);

            if (!params) {
                return;
            }

            founds.push(k);

            Session.set('route', {
                    params: params,
            });

            for (let callback of route.handlers) {
                callback(Session.get('route'));
            }
            
        });

        if (!founds.length) {
            window.console && console.error('[Router]', 'Not Found, looking for', `"${path}"`, 'against', this._routes);
            throw new Error("404", this._routes);
        }


    }


    setup() {

        if (this.isSetup) {
            return false;
        }
        this.isSetup = true;
        window.addEventListener('hashchange', () => {
            this.dispatch(this.getHash());
        });
        this.dispatch(this.getHash());
    };

};



