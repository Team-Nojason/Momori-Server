const GrassScheduler = require('../tasks/grasses.scheduler')
const schedule = require("node-schedule");

class TasksLoaders {
    static async init() {
        await GrassScheduler.updateAllGrasses();
        schedule.scheduleJob('*/10 * * * *', async () => {
            await GrassScheduler.updateAllGrasses();
            console.log('10분마다 실행되는 작업 실행');
        });
    }
}

module.exports = { TasksLoader: TasksLoaders };