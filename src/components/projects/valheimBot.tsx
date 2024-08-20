/*
 * Discord bot that interfaces with AWS (Amazon Web Services) and Valheim, a popular survival game. The bot provides a seamless way for users to manage a Valheim game server hosted on AWS through Discord commands.
 * 
 * 1. Discord Integration:
 *    - Utilizes the Discord.js library to create a bot that responds to user commands.
 *    - Implements commands like !start, !stop, !status, and !help to control the Valheim server.
 *    - Uses rich embeds to display server information and status updates.
 * 
 * 2. AWS Server Management:
 *    - Interfaces with AWS API to start, stop, and check the status of the server.
 *    - Manages server lifecycle, including starting, stopping, and monitoring its state.
 *    - Implements automatic shutdown of idle servers to save resources.
 * 
 * 3. Valheim Server Monitoring:
 *    - Uses the source-server-query library to fetch real-time information from the Valheim server.
 *    - Provides details such as player count, server name, and uptime.
 * 
 * 4. Automatic Status Updates:
 *    - Periodically polls the server status and updates the bot's presence in Discord.
 *    - Displays different statuses based on whether the server is online, starting, stopping, or offline.
 * 
 * 5. Error Handling and Robustness:
 *    - Implements error handling to manage network issues or server unavailability.
 *    - Provides feedback to users about the current state of operations.
 * 
 * 6. Environment Configuration:
 *    - Uses dotenv for managing environment variables, keeping sensitive information secure.
 * 
 * 7. Modular Design:
 *    - Separates concerns into different modules (AWS, Valheim, main bot logic) for better maintainability.
 * 
 * This project demonstrates proficiency in:
 * - Discord bot development
 * - Cloud service integration (AWS)
 * - Game server management
 * - Asynchronous programming in JavaScript
 * - Error handling and state management
 * - User interface design through Discord embeds
 * 
 * Overall, this Discord bot provides a user-friendly interface for managing a Valheim game server, showcasing the ability to integrate multiple services (Discord, AWS, and Valheim) into a cohesive and functional application.
 */