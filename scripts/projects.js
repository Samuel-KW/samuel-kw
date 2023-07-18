const projects = [];
const tags = {}

class Project {
    constructor(data) {
        this.name = data.name ?? "Unknown";
        this.tags = data.tags ?? [];
        this.date = data.date ?? "20XX - Present";

        this.description = data.description ?? "No description";
    }
}

class Tag {
    constructor(name, desc, link) {
        this.name = name;
        this.description = desc;
        this.link = link;
    }
}

tags.sendgrid = new Tag(
    'Sendgrid',
    'Sendgrid is an API ultility used for sending emails',
    'https://github.com/sendgrid/')

tags.python = new Tag(
    'Python',
    'Python is a popular programming language known for it\'s versatility and quick development.',
    'https://python.org/')

tags.synology = new Tag(
    'Synology',
    'Synology is a resource storage and managment system, in our case used primarilly for secure system backups.',
    '')


projects.push(new Project({
    title: 'Archive Staleness Moniter',
    tags: [ 'sendgrid', 'python', 'synology' ],
    description: `The archive staleness moniter was develeoped to simplify the process of monitering errors in a production settings.
In order to maintain safety and data integrity, archives containing various log information are automatically taken.
These archives are stored within a central Synology server which manages these large amounts of information.
However, due to the large number of scheduled archives, it can be difficult to ensure that each archive has been correctly taken and stored.
In order to automate and simplify the process of monitering these archive backups, I developed a program for the company which would automate this process.
The program runs on a schedule from within the Synology server and recursively crawls all the data on the machine.
Then, using the user specified configurations, the program will make note of any missing archives in addition to archives which haven't been recently updated.
After compiling the information, the program will then send a scheduled email containing the compiled information about the system.`,
    images: []
}));

projects.push(new Project({
    title: 'Telegraf Modbus Connection',
    tags: [ 'telegraf', 'modbus', 'python' ],
    description: ``,
    images: []
}));

projects.push(new Project({
    title: 'Unofficial iClicker System',
    tags: [ 'iClicker', 'nodejs', 'axios', 'pusher' ],
    description: ``,
    images: []
}));