

/**
 * [Router description]
 * @param {[type]} base [description]
 */
Router = function (base) {

    var _namedParam = /:(\w)+/g,
        _splatParam = /\*(\w)+/g,
        self = this,
        getHash;

    self._routes = {};
    self.base = base ? base : '/';

    getHash = function () {
        return window.location.hash ? window.location.hash.substr(1) : "/";
    };

    self.add = function (route, constrains, callback) {

        var handler;

        if (!callback) {
            callback = constrains;
            constrains = {};
        }

        if (!route || !callback) {
            throw new Error('[Router] A route needs to be defined');
        }

        if (!self._routes[route]) {
            self._routes[route] = RouteParser.parse(route, constrains);
            self._routes[route].handlers = [];
        }

        self._routes[route].handlers.push(callback);
    };

    self.dispatch = function (path) {

        console.log("[Router] dispatch", path);

        var founds = [];

        Object.keys(self._routes).forEach(function (k) {
            var route = self._routes[k],
                callbacks,
                req,
                params = {};

            console.log("[Router]", "test", route.regex, path);


            params = route.exec(path);

            if (!params) {
                return;
            }

            founds.push(k);

            Session.set('route', {
                    params: params,
            });

            route.handlers.forEach(function (callback) {
                callback(Session.get('route'));
            });
            
        });

        if (!founds.length) {
            throw new Error("404");
        }


    };

    self.setup = function () {
        window.addEventListener('hashchange', function () {
            self.dispatch(getHash());
        });
        self.dispatch(getHash());
    };

};
