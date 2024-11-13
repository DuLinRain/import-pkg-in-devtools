async function npm(name, targetName = 'lucky') {
    const urls = [`https://cdn.jsdelivr.net/npm/${name}/+esm`, `https://esm.sh/${name}`];
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i]
        try {
            const res = await import(/* webpackIgnore: true */url);
            const gRes = res.default ? res.default : res;
            window.Lucky = window.lucky = window.LUCKY = window[targetName] = gRes;
            console.log(`load pkg ${name} success as window.${targetName}, you can use it`);
            return res;
        } catch (error) {
            // 如果是最后一次尝试
            if (i === url.length - 1) {
                console.error(`load pkg ${name} error, please check and retry~`, error)
            }
        }      
    }
}
window.$npm = npm;
