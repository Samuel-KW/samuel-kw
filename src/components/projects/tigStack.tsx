/*
 * # TIG Stack Docker Deployment
 * 
 * A robust and scalable Docker-based deployment of the TIG (Telegraf, InfluxDB, Grafana) stack for comprehensive data collection, storage, and visualization. This project streamlines the setup and management of a complete monitoring solution using containerization.
 * 
 * ## Key Features:
 * 
 * - **Containerized Services**: Utilizes Docker containers for each component of the TIG stack, ensuring isolation and easy management.
 * - **Version Control**: Specifies exact versions for each service, facilitating reproducibility and controlled updates.
 * - **Environment Variable Configuration**: Leverages environment variables for flexible and secure configuration management.
 * - **Persistent Storage**: Implements Docker volumes for InfluxDB and Grafana to ensure data persistence across container restarts.
 * - **Inter-Service Communication**: Configures proper linking between services, allowing seamless data flow within the stack.
 * - **Port Mapping**: Exposes necessary ports for external access to InfluxDB and Grafana interfaces.
 * - **Custom Configurations**: Mounts custom configuration files for Telegraf and Grafana, allowing for tailored setups.
 * 
 * ## Stack Components:
 * 
 * 1. **InfluxDB (v2.7.6)**:
 *    - Time-series database for storing metrics
 *    - Automatically initialized with preset configurations
 *    - Secured with custom username, password, and admin token
 * 
 * 2. **Telegraf (v1.30.3)**:
 *    - Data collection agent
 *    - Configured to send data to InfluxDB
 *    - Uses a custom configuration file for specific metric collection setup
 * 
 * 3. **Grafana (v11.0.0)**:
 *    - Data visualization and dashboard platform
 *    - Pre-configured with InfluxDB as a data source
 *    - Custom dashboards and configurations provided via mounted volumes
 * 
 * ## Key Configurations:
 * 
 * - **InfluxDB**:
 *   - Initialization mode, credentials, and initial bucket setup via environment variables
 *   - Data persistence through Docker volumes
 * 
 * - **Telegraf**:
 *   - Custom configuration file mounted from host
 *   - InfluxDB connection details passed via environment variables
 * 
 * - **Grafana**:
 *   - Admin credentials set via environment variables
 *   - Custom dashboards, data sources, and configuration files mounted from host
 *   - Persistent storage for user-created content
 * 
 * ## Technologies Used:
 * - Docker and Docker Compose
 * - InfluxDB (Time-series database)
 * - Telegraf (Metrics collection agent)
 * - Grafana (Data visualization platform)
 * 
 * This project demonstrates proficiency in containerization, infrastructure-as-code principles, and the setup of a comprehensive monitoring solution. It showcases the ability to orchestrate multiple services, manage configurations, and ensure data persistence in a containerized environment.
 */