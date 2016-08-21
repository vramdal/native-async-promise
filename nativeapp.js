window.NativeApp = {

    data: {
        "321000": [{"varenavn": "MELBLANDING", epdnummer: 321000}],
        "444000": [{"varenavn": "SURSILD", epdnummer: 444000}]
    },

    queue: [],

    submit: function(str) {
        this.queue.push(str);
    },

    processJob: function(str) {
        var shouldFail = Math.random() < 0.2;
        if (shouldFail) {
            throw new Error("uflaks");
        }
        if (this.data[str]) {
            return JSON.stringify(this.data[str]);
        } else {
            return str.split("").reverse().join("").toUpperCase();
        }
    },

    getQueueLength: function() {
        return Object.keys(this.queue).length;
    },

    processQueue: function() {
        var job = this.queue.pop();
        if (job) {
            var error;
            try {
                var result = this.processJob(job);
            } catch (e) {
                error = e;
            }
            window.WebApp.receive(job, result, error && error.message);
        }
    }
};

window.setInterval(function() {
    var shouldWork = Math.random() < 0.4;
    window.NativeApp.processQueue();
}, 2000);