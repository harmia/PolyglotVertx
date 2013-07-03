/**
 * Created with IntelliJ IDEA.
 * User: harmia
 * Date: 27.6.2013
 * Time: 12:50
 * Copyright (C) 2013 Juhana "harmia" Harmanen
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
package webapp

// Configuration for the web server
def webServerConf = [
        // Normal web server stuff
        port: 80,
        host: 'localhost',
        ssl: false,
        // Configuration for the event bus client side bridge
        // This bridges messages from the client side to the server side event bus
        bridge: true,
        // This defines which messages from the client we will let through to the server side
        inbound_permitted: [
                //[:]
                [
                        address: 'vertx.mongopersistor',
                        match: [
                                action: 'find',
                                collection: 'departments'
                        ]
                ],
                [
                        address: 'vertx.mongopersistor',
                        match: [
                                action: 'save',
                                collection: 'departments'
                        ]
                ],
                [
                        address: 'vertx.mongopersistor',
                        match: [
                                action: 'update',
                                collection: 'departments'
                        ]
                ],
                [
                        address: 'vertx.mongopersistor',
                        match: [
                                action: 'delete',
                                collection: 'departments'
                        ]
                ],
                [
                        address: 'vertx.mongopersistor',
                        match: [
                                action: 'find',
                                collection: 'municipalities'
                        ]
                ]
        ],
        // This defines which messages from the server we will let through to the client
        outbound_permitted: [
                [:]
        ]
]

// Now we deploy the modules that we need
container.with {
    // Deploy a MongoDB persistor module
    deployModule('vertx.mongo-persistor-v1.2.1') {
        deployVerticle('StaticData.groovy')
    }

    // Start the web server, with the config we defined above
    deployModule('vertx.web-server-v1.0', webServerConf)
}