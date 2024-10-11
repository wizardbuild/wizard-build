import fastify from 'fastify';

const server = fastify({ logger: true });
const PORT = process.env.PORT || 3000;

// routes
server.get('/', async (request, reply) => {
    return `
        <div style="text-align: center;">
            <h1 style="margin-top: 10rem;">🧙‍♂️ The wizard waves his wand and declares:</h1>
            <h2>Welcome to the magical world of Fastify!</h2>
            <p>🔮 Cast a spell by visiting <a href="/fortune">/fortune</a> to receive your fortune!</p>
        </div>
    `;
});

server.get('/fortune', async (request, reply) => {
    const fortunes: string[] = [
        "You shall find great treasures in unexpected places!",
        "A mysterious stranger will bring good news!",
        "Beware of dragons lurking in the shadows!",
        "You will soon encounter a magical creature!",
    ];
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    return `
        <div style="text-align: center;">
            <h1 style="margin-top: 10rem;">🔮 Your fortune awaits! 🔮</h1>
            <h2>🧙‍♂️ The wizard gazes into his crystal ball and declares:</h2>
            <p>${randomFortune}</p>
        </div>
    `;
});

server.setNotFoundHandler((request, reply) => {
    reply.code(404).send(`
        <div style="text-align: center;">
            <h1 style="margin-top: 10rem;">⚠️ Oops! Page not found!</h1>
            <p>🧙‍♂️ The wizard couldn't find what you were looking for. Try casting a spell at <a href="/">/</a></p>
        </div>
    `);
});

// server
server.listen(PORT, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    server.log.info(`🧙‍♂️ The magical server is conjured up and listening at ${address}!`);
});
