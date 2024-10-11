import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';

@Controller()
class AppController {
    @Get()
    getHello(): string {
        return `
            <div style="text-align: center;">
                <h1 style="margin-top: 10rem;">🧙‍♂️ The wizard waves his wand and declares:</h1>
                <h2>Welcome to the magical world of NestJS!</h2>
                <p>🔮 Cast a spell by visiting <a href="/fortune">/fortune</a> to receive your fortune!</p>
            </div>
        `;
    }

    @Get('/fortune')
    getFortune(): string {
        const fortunes = [
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
    }

    @Get('*')
    getNotFound(): string {
        return `
            <div style="text-align: center;">
                <h1 style="margin-top: 10rem;">⚠️ Oops! Page not found!</h1>
                <p>🧙‍♂️ The wizard couldn't find what you were looking for. Try casting a spell at <a href="/">/</a></p>
            </div>
        `;
    }
}

@Module({
    controllers: [AppController],
})
class AppModule { }

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(`🧙‍♂️ The magical server is conjured up and listening at http://localhost:${PORT}!`);
}
bootstrap();