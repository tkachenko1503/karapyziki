import Router from 'koa-router';

import * as products from './products/index.js';
import productsConf from './products/config.json';
import * as files from './files/index.js';
import filesConf from './files/config.json';

let router = new Router();

setRoute(products, productsConf, router);
setRoute(files, filesConf, router);

export default router.routes();

function setRoute(mod, conf, router) {
    for (let key in conf.routes) {
        let prop = conf.routes[key];
        let method = key.split(' ')[0];
        let path = key.split(' ')[1];

        let fn = mod[prop];
        if (!fn) throw new Error(conf.name + ': exports.' + prop + ' is not defined');

        router[method.toLowerCase()](path, fn);
    }
}
