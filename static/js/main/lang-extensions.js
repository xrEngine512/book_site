String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

var tools = {
    union: function (obj1, obj2) {
        var res = {};
        for (var name in obj1)
            if (obj1.hasOwnProperty(name))
                res[name] = obj1[name];

        for (name in obj2)
            if (obj2.hasOwnProperty(name))
                res[name] = obj2[name];
        return res;
    }
};
