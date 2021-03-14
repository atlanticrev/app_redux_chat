// Dummy id generation
export const generateId = (() => {
    let currId = 0;
    return () => {
        return (++currId).toString();
    };
})();
