/**
 * Created with IntelliJ IDEA.
 * User: harmia
 * Date: 22.7.2013
 * Time: 14:36
 * Copyright (C) 2013 Juhana "harmia" Harmanen
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
vertxApp.filter('i18n',function () {
        return function (key, params) {
            if (params) {
                params.unshift(key)
                return jQuery.i18n.prop.apply(this, params)
            }
            return jQuery.i18n.prop(key)
        }
    }
).filter('parseDate', function () {
        return function (param) {
            if (param.indexOf('.') != -1) {
                var parts = param.split('.')
                return new Date(parts[2], parts[1] - 1, parts[0]) // months are 0-based
            }
            return new Date(param)
        }
    }
)