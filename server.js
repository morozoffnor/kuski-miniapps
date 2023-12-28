import { handler } from './build/handler.js';
import express from 'express';

const PORT = process.env.SERVER_PORT || 4000;
const app = express();


// let SvelteKit handle everything, including serving prerendered pages and static assets
app.use(handler);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});