/*
 * # Directory Size Monitor
 * 
 * A Python-based utility designed to efficiently monitor and report on directory sizes across multiple parent directories. This tool provides valuable insights into disk usage, helping system administrators and DevOps professionals manage storage resources effectively.
 * 
 * ## Key Features:
 * 
 * - **Multi-Directory Scanning**: Recursively scans specified parent directories and their immediate subdirectories.
 * - **Disk Usage Reporting**: Calculates and displays the size of each monitored directory.
 * - **Configurable Thresholds**: Utilizes customizable thresholds for yellow and red alerts based on directory sizes.
 * - **Email Notifications**: Sends detailed email reports containing disk usage information and potential alerts.
 * - **Environment Variable Configuration**: Uses `.env` files for easy setup and customization of directories and thresholds.
 * - **Execution Time Tracking**: Measures and reports the total execution time of the monitoring process.
 * 
 * ## Core Functionality:
 * 
 * 1. **Directory Discovery**: Automatically identifies subdirectories within specified parent directories.
 * 2. **Size Calculation**: Computes the total size of each monitored directory.
 * 3. **Human-Readable Formatting**: Converts raw byte sizes into easily interpretable formats.
 * 4. **Threshold-Based Alerting**: Categorizes directory sizes based on predefined yellow and red thresholds.
 * 5. **Email Reporting**: Generates and sends comprehensive email reports with color-coded size information.
 * 
 * ## Technologies Used:
 * - Python
 * - SendGrid email integration
 * - Environment variable configuration (dotenv)
 * 
 * ## Configuration Options:
 * - `DIRECTORIES`: Comma-separated list of parent directories to monitor
 * - `RED_SIZE`: Threshold (in GB) for red alerts
 * - `YELLOW_SIZE`: Threshold (in GB) for yellow alerts
 * 
 * This tool streamlines the process of monitoring disk usage across multiple directories, providing system administrators with timely and actionable information about storage utilization. Its automated reporting feature makes it an invaluable asset for proactive storage management and capacity planning.
 */