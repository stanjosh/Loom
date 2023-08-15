import clear from "../commands/clear.js";
import { parse, type, prompt, input } from "./io.js";
import pause from "./pause.js";
import alert from "./alert.js";
import say from "./speak.js";
import Choice from "inquirer/lib/objects/choice.js";



console.log(branchData)
/** Boot screen */
async function boot() {
	clear();
	await type([

	]);

	await pause();
	return login();
}




/** Login screen */
async function login() {
	// clear();

	await type([


	]);



	role = await prompt("Enter 1 or 2:");

	switch (role) {
		case "1":
			await sayAndAlert("You have chosen to play");
			await pause(1);
			return wizard();
		case "2":
			await alert("You have chosen not to play");
			return outro();
		default:
			await type(["Incorrect choice, try again"]);
			await pause(1);
			clear();
			return login();
	}

	if (user === "admin" && password === "admin") {
		await pause();
		say("AUTHENTICATION SUCCESSFUL");
		await alert("AUTHENTICATION SUCCESSFUL");
		clear();
		return main();
	} else {
		await type(["Incorrect user and/or password.", "Please try again"]);
		await pause(3);
		clear();
		return login();
	}
	async function login() {

		if (role === "2") {
			const userChoice = await prompt("You have chosen not to play. Do you want to type your own ending? (yes/no)");
			
			if (userChoice.toLowerCase() === "yes") {
				const userEnding = await prompt("Type your own ending:");
				await type(["Your Custom Ending:", userEnding]);
				return;
			} else {
				await alert("You have chosen not to play");
				return outro();
			}
		}
	}
	
}

async function sayAndAlert(text) {
	say(text);
	await alert(text);
	await pause(1);
}

async function intro() {
	await type([

	]);
	clear();
	await type([

	]);
	async function chooseDoor() {
		let choice = await prompt(
			"1 to go the left, 2 to go the right"
			);

		if (choice == "1") {
			await sayAndAlert("You have chosen the door with the fountain");
			clear();
			return fountain();
		} else if (choice == "2") {
			await sayAndAlert("You have chosen the door with the dragon");
			clear();
			return dragon();
		} else {
			chooseDoor();
		}
	}
	await chooseDoor();
}

async function fountain() {
	await type([
		"You exit the tunnel and you find yourself in front of a fountain",
		"A large fountain, that shimmers and shines",
		"and shoots water high up in the air",
		"A little bit of the spray comes upon your chin.",
		"You immediately feel lighter and envigorated.",
		"No longer tired, nor coughing",
		"Is this the cure the town has been looking for?",
		"If only you could transport this"
	]);
	await type([
		"The goblet does not seem to be in sight, what do you do?",
		"1) Go back through the door and search the other room.",
		"2) Sit here and eternally stay 33."
	]);
	let choice = await prompt("Choose 1 or 2");

	if (choice == "1") {
		await sayAndAlert(
			"You have chosen to go through the door with the dragon"
		);
		dragon();
	} else {
		await type([

		]);
	}
}

async function dragon() {
	clear();
	await type([

	]);
	let answer = await prompt("What do you answer?");

	if (answer == "1") {
		await type([
			
		]);
		pause(1);
		clear();
		outro();
	} else {
		await type([
			
		]);
		pause(1);
		clear();
		outro();
	}

}

async function outro() {
    await type([

    ]);
    
    const userEnding = await prompt("Type your own ending:");
    
    await type([
        userEnding
    ]);
}

async function wizard() {
	await intro();
}

/** Main input terminal, recursively calls itself */
async function main() {
	let command = await input();
	try {
		await parse(command);
	} catch (e) {
		if (e.message) await type(e.message);
	}

	main();
}

function addClasses(el, ...cls) {
	let list = [...cls].filter(Boolean);
	el.classList.add(...list);
}

function getScreen(...cls) {
	let div = document.createElement("div");
	addClasses(div, "fullscreen", ...cls);
	document.querySelector("#crt").appendChild(div);
	return div;
}

function toggleFullscreen(isFullscreen) {
	document.body.classList.toggle("fullscreen", isFullscreen);
}

/** Attempts to load template HTML from the given path and includes them in the <head>. */
async function loadTemplates(path) {
	let txt = await fetch(path).then((res) => res.text());
	let html = new DOMParser().parseFromString(txt, "text/html");
	let templates = html.querySelectorAll("template");

	templates.forEach((template) => {
		document.head.appendChild(template);
	});
}

/** Clones the template and adds it to the container. */
async function addTemplate(id, container, options = {}) {
	let template = document.querySelector(`template#${id}`);
	if (!template) {
		throw Error("Template not found");
	}
	// Clone is the document fragment of the template
	let clone = document.importNode(template.content, true);

	if (template.dataset.type) {
		await type(clone.textContent, options, container);
	} else {
		container.appendChild(clone);
	}

	// We cannot return clone here
	// https://stackoverflow.com/questions/27945721/how-to-clone-and-modify-from-html5-template-tag
	return container.childNodes;
}

/** Creates a new screen and loads the given template into it. */
async function showTemplateScreen(id) {
	let screen = getScreen(id);
	await addTemplate(id, screen);
	return screen;
}

function el(type, container = document.querySelector(".terminal"), cls = "") {
	let el = document.createElement(type);
	addClasses(el, cls);

	container.appendChild(el);
	return el;
}

function div(...args) {
	return el("div", ...args);
}

export {
	boot,
	login,
	main,
	getScreen,
	toggleFullscreen,
	div,
	el,
	wizard,
	loadTemplates,
	addTemplate,
	showTemplateScreen
};
