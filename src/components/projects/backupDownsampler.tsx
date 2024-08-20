/*
 * # Archive Downsampler
 * 
 * An efficient Python-based utility designed to manage and downsample old archive files in specified directories. This tool helps maintain storage space by renaming or deleting outdated archives based on configurable criteria.
 * 
 * ## Key Features:
 * 
 * - **Selective Renaming**: Renames old archives to `~filename.tmp` based on customizable age thresholds.
 * - **Blacklist Support**: Excludes specified directories and files from the downsampling process.
 * - **Flexible Configuration**: Utilizes environment variables for easy setup and customization.
 * - **Reversion Capability**: Includes a script (`revertDelete.py`) to revert renamed files back to their original names.
 * - **Permanent Deletion**: Offers a separate script (`permanentDelete.py`) for permanently removing renamed archives.
 * - **Email Notifications**: Sends email reports about the downsampling process, including execution time and affected files.
 * 
 * ## Core Functionality:
 * 
 * 1. **Directory Scanning**: Recursively scans specified directories while respecting blacklist rules.
 * 2. **Age-based Filtering**: Identifies files for downsampling based on configurable age thresholds.
 * 3. **Safe Renaming**: Renames eligible files to a temporary format (`~filename.tmp`) instead of immediate deletion.
 * 4. **Process Reporting**: Generates and emails a detailed report of the downsampling operation.
 * 
 * ## Technologies Used:
 * - Python
 * - SendGrid email integration
 * - Environment variable configuration (dotenv)
 * 
 * ## Configuration Options:
 * - `DIRECTORY`: Target directories for downsampling
 * - `BLACKLIST`: Directories to exclude from the process
 * - `BLACKLIST_FILES`: Specific files to exclude
 * - `KEEP_ALL_FILES_AGE`: Age threshold for keeping all files (in days)
 * - `KEEP_OLD_FILES_AGE`: Age threshold for keeping old files (in days)
 * 
 * This tool provides a safe and customizable approach to managing archive storage, making it valuable for system administrators and DevOps professionals dealing with large-scale file management tasks.
 */

