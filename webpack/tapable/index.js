const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require("tapable");
const syncHook = new SyncHook(["name"]);
syncHook.tap('A', (name) => console.log('A', name));
syncHook.tap({
    name: 'B',
    before: 'A'
}, name => console.log('B', name));
syncHook.call('tapable');
