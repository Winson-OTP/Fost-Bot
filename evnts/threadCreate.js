module.exports = {
    name: 'threadCreate',
    async execute(thread, newlyCreated) {
        if (newlyCreated) thread.join()
    }
};