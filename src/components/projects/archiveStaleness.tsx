/*
 * # Archive Staleness Monitor
 * 
 * An intelligent Python-based utility designed to monitor the "staleness" of archive directories, providing automated notifications about the recency of archived files. This tool is particularly useful for system administrators and data managers who need to ensure regular updates to archive directories.
 * 
 * ## Key Features:
 * 
 * 1. **Recursive Directory Scanning**: Automatically traverses specified directories to locate and analyze archive folders.
 * 2. **Configurable Staleness Thresholds**: Uses `eval.txt` files to set custom staleness thresholds for each monitored directory.
 * 3. **Smart File Analysis**: Identifies the most recently modified file in each archive to determine staleness.
 * 4. **Status Classification**: Categorizes archives into three states: Success, No Files, or Error (stale).
 * 5. **Email Reporting**: Generates and sends detailed email reports about the state of all monitored archives.
 * 6. **Environment Variable Configuration**: Utilizes `.env` files for easy setup and customization.
 * 7. **Performance Metrics**: Tracks and reports the number of files checked and total execution time.
 * 
 * ## Core Functionality:
 * 
 * 1. **Archive Structure Analysis**:
 *    - Recursively scans directories specified in the `DIRECTORY` environment variable.
 *    - Identifies archive folders by the presence of an `eval.txt` file.
 *    - Parses `eval.txt` to determine the expected update interval for each archive.
 * 
 * 2. **Staleness Evaluation**:
 *    - Compares the age of the newest file in each archive against its specified interval.
 *    - Assigns a status code (0: Success, 1: No Files, 2: Error) based on the evaluation.
 * 
 * 3. **Reporting**:
 *    - Generates an HTML email containing a summary of all scanned archives.
 *    - Includes status, directory path, newest file age, and expected update interval for each archive.
 *    - Sends the report using SendGrid's email API.
 * 
 * ## Technologies Used:
 * - Python
 * - Environment variable configuration (dotenv)
 * - SendGrid API for email notifications
 * - HTML for email formatting
 * 
 * ## Configuration Options:
 * - `DIRECTORY`: Root directory to start the recursive search
 * - `EMAIL_SENDER`: Verified sender email address for SendGrid
 * - `EMAIL_DEST`: Comma-separated list of recipient email addresses
 * - `SENDGRID_API_KEY`: API key for SendGrid integration
 * 
 * ## Unique Aspects:
 * - **Flexible Staleness Definition**: Allows different staleness thresholds for different archives through `eval.txt` files.
 * - **Non-Intrusive Monitoring**: Uses a separate `eval.txt` file for configuration, avoiding modifications to the archived files themselves.
 * - **Scalable Design**: Capable of monitoring numerous archives across complex directory structures.
 * 
 * This project demonstrates proficiency in Python development, file system operations, email integration, and creating practical tools for system administration. It showcases the ability to design a flexible, configurable solution for monitoring data archival processes, which is crucial in many enterprise and research environments.
 */