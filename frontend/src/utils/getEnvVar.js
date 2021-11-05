const ENV_PREFIX = "REACT_APP_";

export const getEnvVar = envName => {
    const actualEnvName = envName.startsWith(ENV_PREFIX) ? envName : ENV_PREFIX + envName;
    return process.env[actualEnvName];
};
