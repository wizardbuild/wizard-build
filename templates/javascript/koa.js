import Koa from 'koa';
import Router from 'koa-router';

const server = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3000;

// middleware
server.use(async (ctx, next) => {
    if (ctx.request.method === 'POST') {
        ctx.request.body = ctx.request.body || {};
    }
    await next();
});

// routes
router.get('/', (ctx) => {
    ctx.body = `
        <div style="text-align: center;">
            <h1 style="margin-top: 10rem;">🧙‍♂️ The wizard waves his wand and declares:</h1>
            <h2>Welcome to the magical world of Koa!</h2>
            <p>🔮 Cast a spell by visiting <a href="/fortune">/fortune</a> to receive your fortune!</p>
        </div>
    `;
});

router.get('/fortune', (ctx) => {
    const fortunes = [
        "You shall find great treasures in unexpected places!",
        "A mysterious stranger will bring good news!",
        "Beware of dragons lurking in the shadows!",
        "You will soon encounter a magical creature!",
    ];
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    ctx.body = `
        <div style="text-align: center;">
            <h1 style="margin-top: 10rem;">🔮 Your fortune awaits! 🔮</h1>
            <h2>🧙‍♂️ The wizard gazes into his crystal ball and declares:</h2>
            <p>${randomFortune}</p>
        </div>
    `;
});

server.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        ctx.body = `
            <div style="text-align: center;">
                <h1 style="margin-top: 10rem;">⚠️ Oops! Page not found!</h1>
                <p>🧙‍♂️ The wizard couldn't find what you were looking for. Try casting a spell at <a href="/">/</a></p>
            </div>
        `;
    }
});

// router
server.use(router.routes()).use(router.allowedMethods());

// server
server.listen(PORT, () => {
    console.log(`🧙‍♂️ The magical server is conjured up and listening at http://localhost:${PORT}!`);
});
