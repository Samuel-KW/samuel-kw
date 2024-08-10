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

tags.sendgrid = new Tag('Sendgrid',
    'Sendgrid is an API ultility used for sending emails',
    'https://github.com/sendgrid/');

tags.python = new Tag('Python',
    'Python is a popular programming language known for it\'s versatility and quick development.',
    'https://python.org/');

tags.synology = new Tag('Synology',
    'Synology is a resource storage and managment system, in our case used primarilly for secure system backups.',
    'https://www.synology.com/');

tags.influxdb = new Tag('InfluxDB',
    'InfluxDB is a time series database used for storing and managing large amounts of data.',
    'https://www.influxdata.com/');

tags.telegraf = new Tag('Telegraf',
    'Telegraf is a plugin-driven server agent for collecting and reporting metrics.',
    'https://www.influxdata.com/time-series-platform/telegraf/');

tags.grafana = new Tag('Grafana',
    'Grafana is a multi-platform open source analytics and interactive visualization web application.',
    'https://grafana.com/');

tags.modbus = new Tag('Modbus',
    'Modbus is a serial communication protocol used for transmitting information over serial lines.',
    'https://www.modbus.org/');

tags.nodejs = new Tag('Node.js',
    'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
    'https://nodejs.org/');

tags.axios = new Tag('Axios',
    'Axios is a promise based HTTP client for the browser and node.js.',
    'https://axios-http.com/docs/intro');

tags.pusher = new Tag('Pusher',
    'Pusher is a hosted service that makes it super-easy to add real-time data and functionality to web and mobile applications.',
    'https://pusher.com/');



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

projects.push(new Project({
    title: 'Grafana Telegraph Influx Stack',
    tags: [ 'telegraf', 'grafana', 'influxdb' ],
    description: ``,
    images: []
}));