function command (cmd) {
    return [{
        command: cmd,
        capability: 'switch',
        component: 'main',
        arguments: []
    }];
}

module.exports = {
    on: function() {
        return command("on");
    },
    off: function() {
        return command("off");
    },
    command: function(cmd) {
        return command(cmd);
    }
};