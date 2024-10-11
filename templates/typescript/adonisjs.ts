import { Application } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

const server = new Application(__dirname, {});
const PORT = process.env.PORT || 3333;

// middleware
server.use(async (ctx, next) => {
    ctx.request.body = {};
    if (ctx.request.method === 'POST') {
        ctx.request.body = JSON.parse(await ctx.request.text());
    }
    await next();
});

// routes
server.get('/', (ctx: HttpContextContract) => {
    ctx.response.send(`
        <div style="text-align: center;">
            <h1 style="margin-top: 10rem;">🧙‍♂️ The wizard waves his wand and declares:</h1>
            <h2>Welcome to the magical world of AdonisJS!</h2>
            <p>🔮 Cast a spell by visiting <a href="/fortune">/fortune</a> to receive your fortune!</p>
        </div>
    `);
});

server.get('/fortune', (ctx: HttpContextContract) => {
    const fortunes = [
        "You shall find great treasures in unexpected places!",
        "A mysterious stranger will bring good news!",
        "Beware of dragons lurking in the shadows!",
        "You will soon encounter a magical creature!",
    ];
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    ctx.response.send(`
        <div style="text-align: center;">
            <h1 style="margin-top: 10rem;">🔮 Your fortune awaits! 🔮</h1>
            <h2>🧙‍♂️ The wizard gazes into his crystal ball and declares:</h2>
            <p>${randomFortune}</p>
        </div>
    `);
});

server.use((ctx: HttpContextContract) => {
    ctx.response.status(404).send(`
        <div style="text-align: center;">
            <h1 style="margin-top: 10rem;">⚠️ Oops! Page not found!</h1>
            <p>🧙‍♂️ The wizard couldn't find what you were looking for. Try casting a spell at <a href="/">/</a></p>
        </div>
    `);
});

// server
server.listen(PORT, () => {
    console.log(`🧙‍♂️ The magical server is conjured up and listening at http://localhost:${PORT}!`);
});
