window.WebApp = {

    queue: {},

    getQueueLength: function() {
        return Object.keys(this.queue).length;
    },

    submit: function(str) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            var recipient = {resolve: resolve, reject: reject};
            if (_this.queue[str]) {
                console.log("Lytter til kø for jobb", str, "som nr", _this.queue[str].length);
                _this.queue[str].push(recipient);
            } else {
                console.log("Ny jobb", str, "legges i kø");
                _this.queue[str] = [recipient];
                window.NativeApp.submit(str);
            }
        });
    },

    receive: function(str, result, errorMsg) {
        console.log("this.queue", this.queue);
        console.log("Mottar resultat av jobb", str, "det er", this.queue[str].length, "lyttere");
        var recipients = this.queue[str].slice();
        delete this.queue[str];
        for (var i = 0; i < recipients.length; i++) {
            var recipient = recipients[i];
            if (errorMsg) {
                recipient.reject(new Error("Søket feilet pga " + errorMsg));
            } else {
                recipient.resolve(result);
            }
        }
    }
};